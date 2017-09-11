import React from 'react';
import SpeechableSpan from '../../lib/components/SpeechableSpan';
import { shallow } from 'enzyme';

describe('SpeechableSpan', () => {
    describe('constructor', () => {
        it('executes', () => {
            const wrapper = shallow(<SpeechableSpan />);
            expect(wrapper.state('voices')).toEqual([]);
        });
    });
    xdescribe('playSpeech', () => {
        it('executes', () => {

            // Mocking SpeechSynthesisUtterance here is not working
            const mockFn = jest.fn();
            const SpeechSynthesisUtterance = {
                SpeechSynthesisUtterance: new mockFn()
            };

            const wrapper = shallow(<SpeechableSpan />);
            wrapper.instance().playSpeech();
        });
    });

    describe('render', () => {
        it('renders with correct props', () => {
            window.speechSynthesis = {
                onvoiceschanged: null
            };
            const wrapper = shallow(<SpeechableSpan />);
            const buttonNodes = wrapper.find('button');
            expect(buttonNodes.length).toEqual(1);
            // console.log(buttonNodes);
            const expectedStyle = {
                display: 'inline-block', 
                outline: 'none', 
                border: 'none', 
                backgroundColor: 'transparent',
                padding: '0px'
            };
            const buttonNode = buttonNodes.first();
            expect(buttonNode.props().style).toEqual(expectedStyle);
            expect(buttonNode.props().onClick).toEqual(wrapper.instance().playSpeech);
        });

        it('calls playSpeech method on click', () => {
            const playSpeechMock = jest.spyOn(SpeechableSpan.prototype, 'playSpeech').mockImplementation(() => { return null; } );            
            const wrapper = shallow(<SpeechableSpan />);
            wrapper.simulate('click');
            expect(playSpeechMock).toHaveBeenCalledTimes(1);
        });
    });
});
