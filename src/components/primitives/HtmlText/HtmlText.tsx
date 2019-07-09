// @flow

import React, { PureComponent } from 'react';

interface Props {
    html: string;
    // Don't use styles created with React NativeStylesheet. This is a React component. 
    // Think in terms of React inline styles.
    // https://reactjs.org/docs/dom-elements.html#style
    css?: object; 
    className?: string;
}

export default class HtmlText extends PureComponent<Props> {

    public createMarkup = (html: any) => {
        return {__html: html};
    }

    public render() {
        const { html, css, className } = this.props;
        return <div className={className} dangerouslySetInnerHTML={this.createMarkup(html)} style={css}/>;
    }
}