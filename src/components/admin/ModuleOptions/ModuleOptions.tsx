import { SECTION_TYPES } from '@/constants';
import * as React from 'react';
import SectionOptions from './SectionOptions';
import SplitTagBoxOptions from './SplitTagBoxOptions';
import TagTileBoxOptions from './TagTileBoxOptions';
import AdminInput from '../AdminInput';
import AdminTextInput from '../AdminTextInput';

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

        switch (moduleOpts.type) {
            default:
                console.error('Unknown module type:', moduleOpts.type);
                break;
            case 'instagram':
            case 'newsletter':
            case 'ati-newsletter':
            case 'history-newsletter':
                return null;
            case 'recent':
            case 'tag':
                break;
            case 'trending':
                optionComp = <SectionOptions data={moduleOpts} updateOptions={updateOptions} />;
                break;
            case 'tagTileBox':
            case 'tagOverlapTitle':
            case 'recentAndTrending':
                optionComp = <TagTileBoxOptions data={moduleOpts} updateOptions={updateOptions} />;
                break;
            case 'splitTagBox':
                optionComp = <SplitTagBoxOptions data={moduleOpts} updateOptions={updateOptions} />;
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
