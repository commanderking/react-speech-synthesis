import React from 'react';
import PropTypes from 'prop-types';
import Speechable from '../lib/Speechable';

class SpeechableBasicDemo extends React.Component {
    renderVoices() {
        const voices = window.speechSynthesis.getVoices();
        return voices.map((voice, index) => {
            return (
                <li key={`list-${index}`}>
                    <Speechable voice={voice.name} key={voice.name}>{voice.name}</Speechable>
                    <span> {voice.lang}</span>
                </li>
            );
        });
    }

    render() {
        return (
            <div>
                {this.renderVoices()}
            </div>
        );     
    }
};

export default SpeechableBasicDemo;
