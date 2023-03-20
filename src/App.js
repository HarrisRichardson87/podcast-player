import PodcastMain from './Components/PodcastMain/PodcastMain';
import PodcastView from './Components/PodcastView/PodcastView';
import PodcastPlayer from './Components/PodcastPlayer/PodcastPlayer';
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Layout from './Components/PodcastAppLayout/Layout';
import PodcastContextProvider from './Components/PodcastContext/PodcastContext';
function App() {
  return (
    <div className="App">
      <PodcastContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<PodcastMain />} />
              <Route path="/podcast-view/:id" element={<PodcastView />} />
              <Route path="/podcast/:id/episode/:episodeId" element={<PodcastPlayer />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PodcastContextProvider>
    </div>
  );
}

export default App;
