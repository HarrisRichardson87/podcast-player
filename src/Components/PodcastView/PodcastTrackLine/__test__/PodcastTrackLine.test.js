import React from 'react';
import ReactDOM from 'react-dom';
import PodcastView from '../PodcastView';
import PodcastTrackLine from '../PodcastTrackLine';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('PodcastTrackLine', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<PodcastTrackLine />, div);

        ReactDOM.unmountComponentAtNode(div);
    });

});

