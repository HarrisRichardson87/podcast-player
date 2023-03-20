import React from 'react';
import ReactDOM from 'react-dom';
import PodcastPlayer from '../PodcastPlayer';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('PodcastPlayer', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<PodcastPlayer />, div);

        ReactDOM.unmountComponentAtNode(div);
    });
});