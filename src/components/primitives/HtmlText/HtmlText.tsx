// @flow

import React, { PureComponent } from 'react';

interface Props {
    html: any;
    // Don't use styles created with React NativeStylesheet. This is a React component. 
    // Think in terms of React inline styles.
    // https://reactjs.org/docs/dom-elements.html#style
    css?: object; 
}

export default class HtmlText extends PureComponent<Props> {

    createMarkup = (html: any) => {
        return {__html: html};
    }

    render() {
        const { html, css } = this.props;
        return (
            <div dangerouslySetInnerHTML={this.createMarkup(html)} style={css}></div>
        )
    }
}