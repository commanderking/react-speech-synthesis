import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import SpeechableSpan from '../lib/components/SpeechableSpan';

storiesOf('SpeechableSpan', module)
    .add('Hello World', () => <SpeechableSpan>Hello World</SpeechableSpan>)
    .add('Hey Globe', () => <SpeechableSpan>Hey Globe</SpeechableSpan>)
    .add('Test Image', () => <SpeechableSpan><img src="https://images.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png" /></SpeechableSpan>);