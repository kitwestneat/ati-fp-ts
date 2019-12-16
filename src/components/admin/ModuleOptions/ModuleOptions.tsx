import * as React from 'react';

import AdminInput from '../AdminInput';
import AdminTextInput from '../AdminTextInput';

import SectionOptions from './SectionOptions';
import SplitTagBoxOptions from './SplitTagBoxOptions';
import TagTileBoxOptions from './TagTileBoxOptions';
import InstagramOptions from './InstagramOptions';

interface Props {
  moduleOpts: any;
  updateOptions: any;
  updateQuery: any;
  queryStr: string;
}

export default class ModuleOptions extends React.PureComponent<Props> {
  public render() {
    const { moduleOpts, updateOptions, queryStr, updateQuery } = this.props;

    let optionComp: JSX.Element | null = null;

    const optionProps = { data: moduleOpts, updateOptions };

    switch (moduleOpts.type) {
      default:
        console.error('Unknown module type:', moduleOpts.type);
        break;
      case 'instagram':
        optionComp = <InstagramOptions {...optionProps} />;
        break;
      case 'newsletter':
      case 'ati-newsletter':
      case 'history-newsletter':
        return null;
      case 'recent':
      case 'tag':
        break;
      case 'trending':
        optionComp = <SectionOptions {...optionProps} />;
        break;
      case 'tagTileBox':
      case 'tagOverlapTitle':
      case 'recentAndTrending':
        optionComp = <TagTileBoxOptions {...optionProps} />;
        break;
      case 'splitTagBox':
        optionComp = <SplitTagBoxOptions {...optionProps} />;
        break;
    }
    return (
            <>
                {optionComp}
                <AdminInput
                  label='Query:'
                  input={
                    <AdminTextInput
                      onChangeText={(query: string) => updateQuery(query)}
                      value={queryStr}
                    />
                  }
                />
            </>
    );
  }
}
