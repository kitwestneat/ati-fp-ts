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

const HU_INSTAGRAM_QUERY = 'hu-instagram' ;
const ATI_INSTAGRAM_QUERY = 'instagram';

export default class ModuleOptions extends React.PureComponent<Props> {
  public render() {
    const { moduleOpts, updateOptions, queryStr, updateQuery } = this.props;

    let optionComp: JSX.Element | null = null;

    const optionProps = { data: moduleOpts, updateOptions, };

    switch (moduleOpts.type) {
      default:
        console.error('Unknown module type:', moduleOpts.type);
        break;
      case 'instagram':
        const instaUpdateOpts = ({ isHU }: { isHU: boolean}) => { 
          updateOptions({ isHU });
          updateQuery(isHU ? HU_INSTAGRAM_QUERY : ATI_INSTAGRAM_QUERY);
        };

        return <InstagramOptions data={moduleOpts} updateOptions={instaUpdateOpts} />;
      case 'newsletter':
      case 'ati-newsletter':
      case 'history-newsletter':
        return null;
      case 'recent':
      case 'tag':
      case 'recentAndTrending':
        break;
      case 'trending':
        optionComp = <SectionOptions {...optionProps} />;
        break;
      case 'tagTileBox':
      case 'tagOverlapTitle':
        optionComp = (
          <TagTileBoxOptions
            {...optionProps}
          />
        );
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
