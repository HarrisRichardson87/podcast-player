import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import PodcastMain from './Components/PodcastMain/PodcastMain';
import PodcastDetails from './Components/PodcastView/PodcastDetails';
import PodcastPlayer from './Components/PodcastPlayer/PodcastPlayer';
import Layout from './Components/PodcastAppLayout/Layout';
// import context
import PodcastContextProvider  from './Components/PodcastContext/PodcastContext';

function App() {
  return (
    <div className="App">    
		<PodcastContextProvider>
			<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
				<Route index element={<PodcastMain />} />
				<Route path="/podcast-view/:id" element={<PodcastDetails />} />
				<Route path="/podcast/:id/episode/:episodeId" element={<PodcastPlayer />} />
				</Route>
			</Routes>
			</BrowserRouter>
		</PodcastContextProvider>
    </div>
  );
}

export default App;
