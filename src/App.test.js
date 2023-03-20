import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PodcastMain from './Components/PodcastMain/PodcastMain';
import PodcastDetails from './Components/PodcastView/PodcastDetails';
import PodcastPlayer from './Components/PodcastPlayer/PodcastPlayer';
import Layout from './Components/PodcastAppLayout/Layout';
import { act } from 'react-dom/test-utils';

const renderRoutes = async () => {
    await act(async () => {
        render(
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                <Route index element={<PodcastMain />} />
                <Route path="/podcast-view/:id" element={<PodcastDetails />} />
                <Route path="/podcast/:id/episode/:episodeId" element={<PodcastPlayer />} />
                </Route>
            </Routes>
            </BrowserRouter>
        );
    });
};

test('renders', async  () => {
    // Render the routes
    await renderRoutes();

    // Get the link element
    const linkElement = screen.getByText(/Podcaster/i);
  
    // Check if the link element is in the document
    expect(linkElement).toBeInTheDocument();
});

test('renders podcast main', async () => {
    // Render the routes
    await renderRoutes();

    // Get the podcast main element
    const podcastMainElement = screen.getByText(/Podcast/i);
  
    // Check if the podcast main element is in the document
    expect(podcastMainElement).toBeInTheDocument();
});

test('renders podcast details', async () => {
    // Render the routes
    await renderRoutes();

    // push the podcast details route
    window.history.pushState({}, 'Test page', 'podcast-view/1535809341');

    // Get the podcast details element
    const podcastDetailsElement  = screen.getByText(/Podcast/i);
  
    // Check if the podcast details element is in the document
    expect(podcastDetailsElement).toBeInTheDocument();
});

test('renders podcast player', async () => {
    // Render the routes
    await renderRoutes();

    // push the podcast player route
    window.history.pushState({}, 'Test page', 'podcast/1535809341/episode/1000602253708');

    // Get the podcast player element
    const podcastPlayerElement = screen.getByText(/Podcast/i);

    // Check if the podcast player element is in the document
    expect(podcastPlayerElement).toBeInTheDocument();
});
