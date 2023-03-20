import React from 'react';
import ReactDOM from 'react-dom';
import PodcastLine from '../PodcastLine';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';


describe('PodcastLine', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<PodcastLine />, div);

        ReactDOM.unmountComponentAtNode(div);
    });

});
