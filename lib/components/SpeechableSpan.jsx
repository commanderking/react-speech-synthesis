import React from 'react';
import PropTypes from 'prop-types';


class SpeechableSpan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            voices: []
        };
        this.playSpeech = this.playSpeech.bind(this);
    }

    /** 
      * TODO: option to change voices of speech
      */
    /*
    componentWillMount() {
        window.speechSynthesis.onvoiceschanged = () => {
            this.setState({
                voices: window.speechSynthesis.getVoices()
            });
            console.log(this.state.voices);
        };
    }

    componentDidMount() {
        const voices = speechSynthesis.getVoices();
        console.log(speechSynthesis);
        console.log(voices);
    }

    */

    playSpeech() {
        const text = this.props.children;
        let msg = new SpeechSynthesisUtterance();
        msg.text = text;

        if (window.speechSynthesis.speaking) {
            console.log('speaking');
            window.speechSynthesis.cancel();
        }
        window.speechSynthesis.speak(msg);
    }

    render() {
        return (
            <button 
                style={{ 
                    display: 'inline-block', 
                    outline: 'none', 
                    border: 'none', 
                    backgroundColor: 'transparent',
                    padding: '0px'
                }}
                onClick={this.playSpeech}
            >
                <b>{this.props.children}</b>
            </button>
        );
    }
}

SpeechableSpan.propTypes = {
    children: PropTypes.string
};

export default SpeechableSpan;
