import React from 'react';
import SpeechableBasicDemo from './SpeechableBasicDemo';
import './css/index.css';

import { storiesOf } from '@storybook/react';
import Speechable from '../lib/Speechable';

storiesOf('Speechable Basic Functionality', module)
    .add('Basic Example', () => {
        return (
            <div>
                <div className="speechableStyle"> 
                    <Speechable>Hi There! Click me and I'll speak! </Speechable>
                </div>
                <h4>Code</h4>
                <div className="sampleCode">
                    {"<Speechable> Hi There! Click me and I'll speak! </Speechable>"}
                </div>
            </div>
        );
    })
    .add("Change Voice", () => {
        return (
            <div>
                <div className="speechableStyle">
                    <Speechable voice="Samantha">Hi There! This is Samantha!</Speechable>
                </div>
                <h4>Code</h4>
                <div className="sampleCode">
                    {'<Speechable voice="Samantha"> Hi There! This is Samantha! </Speechable>'}
                </div>
            </div>
        );
    })
    .add('Slow Down Alex!', () => {
        return (
            <div>
                <div className="speechableStyle">
                    <Speechable rate={0.1}>Did I speak too fast?</Speechable>
                </div>
                <h4>Code</h4>
                <div className="sampleCode">
                    {'<Speechable rate={0.1}"> Did I speak too fast? </Speechable>'}
                </div>
            </div>
        );
    })
    .add('Chinese?', () => {
        return (
            <div>
                <div className="speechableStyle">
                    <Speechable voice="Ting-Ting">你好! 我也会说中文!</Speechable>
                </div>
                <h4>Code</h4>
                <div className="sampleCode">
                    {'<Speechable voice="Ting-Ting">你好! 我也会说中文!</Speechable>'}
                </div>
            </div>
        );
    })
    .add('Can pandas (and images) talk?', () => {
        return (
            <div>
                <div className="speechableStyle">
                    <Speechable voice="Samantha" text="Hi there! I'm a panda!">
                        <img src="https://media4.s-nbcnews.com/j/newscms/2016_36/1685951/ss-160826-twip-05_8cf6d4cb83758449fd400c7c3d71aa1f.nbcnews-ux-2880-1000.jpg" />
                    </Speechable>
                </div>
                <h4>Code</h4>
                <div className="sampleCode">
                    {'<Speechable voice="Samantha" text="Hi there! I\'m a panda!">'}
                    <br />
                    <span>    {'<img src="imgSrc" />'}</span>
                    <br />
                    {'</Speechable>'}
                </div>
            </div>
        );
    });
storiesOf('All Voices', module)
    .add('View', () => {
        return <SpeechableBasicDemo />;
    });
