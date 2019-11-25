import { SECTION_TYPES } from '@/constants';
import * as React from 'react';
import SectionOptions from './SectionOptions';
import SplitTagBoxOptions from './SplitTagBoxOptions';
import TagTileBoxOptions from './TagTileBoxOptions';

interface Props {
    moduleOpts: any;
    updateOptions: any;
}

export default class ModuleOptions extends React.PureComponent<Props> {
    public render() {
        const { moduleOpts, updateOptions } = this.props;
        switch (moduleOpts.type) {
            default:
                console.error('Unknown module type:', moduleOpts.type);
                break;
            case SECTION_TYPES.RECENT:
            case 'instagram':
            case 'newsletter':
            case 'tag':
                break;
            case 'trending':
                return <SectionOptions data={moduleOpts} updateOptions={updateOptions} />;
            case 'tagTileBox':
            case 'tagOverlapTitle':
            case 'recentAndTrending':
                return <TagTileBoxOptions data={moduleOpts} updateOptions={updateOptions} />;
            case 'splitTagBox':
                return <SplitTagBoxOptions data={moduleOpts} updateOptions={updateOptions} />;
        }

        return null;
    }
}
