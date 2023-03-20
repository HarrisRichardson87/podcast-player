import styles from './App.module.css';
import PodcastMain from './Components/PodcastMain/PodcastMain';
import PodcastView from './Components/PodcastView/PodcastView';
import PodcastPlayer from './Components/PodcastPlayer/PodcastPlayer';
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <div className={styles.title}>
        <h1>Podcaster</h1>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PodcastMain />} />
          <Route path="/podcast-view/:id" element={<PodcastView />} />
          <Route path="/podcast/:id/episode/:episodeId" element={<PodcastPlayer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
