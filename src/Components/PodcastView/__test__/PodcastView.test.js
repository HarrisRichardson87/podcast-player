import React from 'react';
import ReactDOM from 'react-dom';
import PodcastView from '../PodcastView';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('PodcastView', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<PodcastView />, div);

        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the podcast sidebar', () => {
        const { getByText } = render(<PodcastView />);
        expect(getByText('Podcast Sidebar')).toBeInTheDocument();
    });
    
    it('renders the podcast track list', () => {
        const { getByText } = render(<PodcastView />);
        expect(getByText('Podcast Track List')).toBeInTheDocument();
    });
});
