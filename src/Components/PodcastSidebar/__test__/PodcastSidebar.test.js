import React from 'react';
import ReactDOM from 'react-dom';
import PodcastSidebar from '../PodcastSidebar';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('PodcastSidebar', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<PodcastSidebar />, div);

        ReactDOM.unmountComponentAtNode(div);
    });

});