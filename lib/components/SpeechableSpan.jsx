import React from 'react';

class SpeechableSpan extends React.Component {
    render() {
        return (
            <span>{this.props.children}</span>
        );
    }
}

export default SpeechableSpan;
