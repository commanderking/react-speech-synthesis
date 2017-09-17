import React from 'react';
import Speechable from '../../lib/Speechable';
import { shallow } from 'enzyme';

describe('Speechable', () => {
    let getVoicesMock;
    let speakMock;
    let cancelMock;
    let mockVoices;
    beforeEach(() => {
        mockVoices = [{ name: "Alex" }, { name: "Albert" }];
        getVoicesMock = jest.fn().mockReturnValue(mockVoices);
        speakMock = jest.fn();
        cancelMock = jest.fn();        
        window.speechSynthesis = {
            onvoiceschanged: null,
            getVoices: getVoicesMock,
            speak: speakMock,
            speaking: false,
            cancel: cancelMock
        };
    });

    describe('constructor', () => {
        it('executes', () => {
            const wrapper = shallow(<Speechable />);
            expect(wrapper.state('voices')).toEqual([]);
        });
    });

    describe('componentWillMount', () => {
        let setStateMock;
        beforeEach(() => {
            setStateMock = jest.spyOn(Speechable.prototype, 'setState').mockReturnValue({});
        });

        afterEach(() => {
            setStateMock.mockReset();
        });

        it('sets onvoiceschanged when called', () => {
            shallow(<Speechable />);

            expect(window.speechSynthesis.onvoiceschanged).toBeInstanceOf(Function);

            window.speechSynthesis.onvoiceschanged();
            expect(setStateMock).toHaveBeenCalledTimes(1);
            expect(setStateMock).toHaveBeenCalledWith({ voices: mockVoices });
        });

        it('does not execute setState if no voices returned from getVoices', () => {
            mockVoices = [];
            window.speechSynthesis.getVoices = jest.fn().mockReturnValue(mockVoices);
            shallow(<Speechable />);

            window.speechSynthesis.onvoiceschanged();
            expect(setStateMock).not.toHaveBeenCalled();
        });
    });

    describe('playSpeech', () => {
        let expectedUtterance;
        beforeEach(() => {
            expectedUtterance = new SpeechSynthesisUtterance();
            expectedUtterance.text = "childText";
            expectedUtterance.rate = 1;
            expectedUtterance.volume = 1;
        });

        it('executes with children text (will use default voice)', () => {
            const wrapper = shallow(<Speechable>childText</Speechable>);
            wrapper.instance().playSpeech();

            expect(speakMock).toHaveBeenCalledTimes(1);
            expect(speakMock).toHaveBeenCalledWith(expectedUtterance);
        });

        it('executes with text prop', () => {
            const wrapper = shallow(<Speechable text="textInProps" />);
            expectedUtterance.text = 'textInProps';

            wrapper.instance().playSpeech();
            expect(speakMock).toHaveBeenCalledTimes(1);
            expect(speakMock).toHaveBeenCalledWith(expectedUtterance);
        });

        it('can change playSpeech volume with volume prop', () => {
            let expectedVolume = 0.5;
            const wrapper = shallow(<Speechable volume={expectedVolume}>childText</Speechable>);
            expectedUtterance.volume = expectedVolume;

            wrapper.instance().playSpeech();
            expect(speakMock).toHaveBeenCalledTimes(1);
            expect(speakMock).toHaveBeenCalledWith(expectedUtterance);
        });

        it('can change playSpeech rate with rate prop', () => {
            let expectedRate = 0.1;
            const wrapper = shallow(<Speechable rate={expectedRate}>childText</Speechable>);
            expectedUtterance.rate = expectedRate;

            wrapper.instance().playSpeech();
            expect(speakMock).toHaveBeenCalledTimes(1);
            expect(speakMock).toHaveBeenCalledWith(expectedUtterance);
        });

        it('can change voice with voice prop', () => {
            let expectedVoice = { name: 'Albert' };
            const wrapper = shallow(<Speechable voice={expectedVoice.name}>childText</Speechable>);

            expectedUtterance.voice = expectedVoice;
            wrapper.instance().playSpeech();
            expect(speakMock).toHaveBeenCalledTimes(1);
            expect(speakMock).toHaveBeenCalledWith(expectedUtterance);
        });
        
        it('cancels currently playing sound', () => {
            window.speechSynthesis.speaking = true;
            const wrapper = shallow(<Speechable />);
            wrapper.instance().playSpeech();
            expect(cancelMock).toHaveBeenCalledTimes(1);
        });

        it('do not play sound if no voices have been found', () => {
            window.speechSynthesis.getVoices.mockReturnValue([]);
            const wrapper = shallow(<Speechable />);
            wrapper.instance().playSpeech();
            expect(window.speechSynthesis.speak).not.toHaveBeenCalled();
        });
    });

    describe('render', () => {
        it('renders with correct props', () => {
            const wrapper = shallow(<Speechable />);
            const spanNodes = wrapper.find('span');
            expect(spanNodes.length).toEqual(1);
            const spanNode = spanNodes.first();
            expect(spanNode.props().onClick).toEqual(wrapper.instance().playSpeech);
        });

        it('calls playSpeech method on click', () => {
            const playSpeechMock = jest.spyOn(Speechable.prototype, 'playSpeech').mockImplementation(() => { return null; } );            
            const wrapper = shallow(<Speechable />);
            wrapper.simulate('click');
            expect(playSpeechMock).toHaveBeenCalledTimes(1);
        });
    });
});
