import React from 'react';
import { Dimensions, View, ViewProps } from 'react-native';
import { getNames } from '../../utils';

const DEFAULT_OFFSET = 800;

type OnScrollHandle = number;
type OnScrollFn = () => void;

interface ScrollHandles {
  [handle: number]: OnScrollFn;
}

const onScrollCbs: ScrollHandles = {};
let num = 0;
function addOnScroll(f: OnScrollFn): OnScrollHandle {
  const handle = num++;
  onScrollCbs[handle] = f;

  return handle;
}

function removeOnScroll(handle: OnScrollHandle) {
  delete onScrollCbs[handle];
}

function onScroll() {
  Object.values(onScrollCbs).forEach(cb => cb());
}

interface Props extends ViewProps {
  lazyLoader?: () => void;
  lazyOffset?: number;
}

interface State {
  lazyViewable: boolean;
}

export default class LazyView extends React.PureComponent<Props, State> {
  public static onScroll = onScroll;

  public state = {
    lazyViewable: false
  };

  public theView: React.RefObject<View>;
  public handle: OnScrollHandle;
  public loaderCalled: boolean;

  constructor(props: Props) {
    super(props);

    this.theView = React.createRef();
    this.handle = addOnScroll(this.shouldTrigger);
    this.loaderCalled = false;
  }

  public getNames = () => this.props && getNames(this.props.children);

  public componentDidMount() {
    this.shouldTrigger();
  }

  public measure = () =>
    new Promise(
      resolve =>
        this.theView.current != null &&
        this.theView.current.measure((x, y, width, height, pageX, pageY) =>
          resolve({ x, y, width, height, pageX, pageY })
        )
    );

  public defaultLazyLoader = () => this.setState({ lazyViewable: true });

  public shouldTrigger = async () => {
    if (!this.theView.current) {
      setTimeout(this.shouldTrigger);
      return;
    }

    const { lazyLoader = this.defaultLazyLoader, lazyOffset = DEFAULT_OFFSET } = this.props;
    const { pageY } = (await this.measure()) as any;
    const { height } = Dimensions.get('window');

    if ((pageY - lazyOffset < height && !this.loaderCalled) || window.disableLazyLoad) {
      lazyLoader();
      removeOnScroll(this.handle);
      this.loaderCalled = true;
    }
  };

  public render() {
    const { lazyLoader } = this.props;
    const { lazyViewable } = this.state;

    // default lazy loader hides children until lazy loaded
    const isDefaultLazyLoader = !lazyLoader;

    const viewable = !isDefaultLazyLoader || lazyViewable;
    if (!viewable) {
      // can't call setState in render, so setTimeout
      setTimeout(this.shouldTrigger);
    }

    return (
      <View ref={this.theView} {...this.props}>
        {viewable ? this.props.children : null}
      </View>
    );
  }
}
