import React from 'react';
import PropTypes from 'prop-types';
import Speechable from '../lib/Speechable';

class SpeechableBasicDemo extends React.Component {

    renderVoices() {
        const voices = window.speechSynthesis.getVoices();
        console.log(voices);
        return voices.map((voice, index) => {
            return (
                <tr key={`list-${index}`}>
                    <td>
                        <Speechable voice={voice.name} key={voice.name}>{voice.name}</Speechable>
                    </td>
                    <td>{voice.lang}</td>
                </tr>
            );
        });
    }

    render() {
        return (
            <table className="voicesTable">
                <tr>
                    <th>Voice Name</th>
                    <th>Language</th>
                </tr>
                {this.renderVoices()}
            </table>
        );     
    }
};

export default SpeechableBasicDemo;
