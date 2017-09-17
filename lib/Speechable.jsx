import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';


class Speechable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            voices: []
        };
        this.playSpeech = this.playSpeech.bind(this);
    }

       
    componentWillMount() {
        window.speechSynthesis.onvoiceschanged = () => {
            const voices = window.speechSynthesis.getVoices();

            if (voices.length > 0) {
                this.setState({ voices });
            }
        };
    }

    playSpeech() {
        // cancel speech if something is already playing
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
        }

        const { text, voice, children, rate, volume } = this.props;
        // TODO - shouldn't need to getVoices on each playSpeech call
        const voices = window.speechSynthesis.getVoices();
        const voiceObject = _.find(voices, (currentVoice) => {
            return currentVoice.name === voice;
        });

        /** 
          * Set voice if one provided and found, otherwise default one will be used based on 
          ＊ user's provided language by speechSynthesisUtterance.
          * Safari won't read chinese/japanese characters if msg.lang not explicity 
          * set to the right langauge （works fine on chrome/firefox)
          */
        let msg = new SpeechSynthesisUtterance();
        if (voice) {
            msg.voice = voiceObject;
            msg.lang = voiceObject.lang;
        }

        // Text passed as a prop takes priority, then assume children, and finally ''
        // TODO: Parse out text of children only in the case of using <u> or <i>
        msg.text = text || children || '';
        msg.rate = rate;
        msg.volume = volume;

        if ( voices.length > 0) {
            window.speechSynthesis.speak(msg);
        }
    }

    render() {
        return (
            <span onClick={this.playSpeech}>
                <b>{this.props.children}</b>
            </span>
        );
    }
}

Speechable.propTypes = {
    voice: PropTypes.string,
    rate: PropTypes.number,
    volume: PropTypes.number,
    text: PropTypes.string,
    children: PropTypes.any
};

Speechable.defaultProps = {
    rate: 1,
    volume: 1
};

export default Speechable;
