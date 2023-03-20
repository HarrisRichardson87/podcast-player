import React from 'react';
import ReactDOM from 'react-dom';
import PodcastMain from '../PodcastMain';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
describe('PodcastMain', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<PodcastMain />, div);

        ReactDOM.unmountComponentAtNode(div);
    });
});