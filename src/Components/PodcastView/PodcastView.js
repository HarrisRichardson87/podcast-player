import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import PodcastTrackLine from './PodcastTrackLine/PodcastTrackLine';
import styles from './PodcastView.module.css';
import PodcastSidebar from '../PodcastSidebar/PodcastSidebar';
import PodcastContext from '../PodcastContext/PodcastContext';
export default function PodcastView() {
  // use context to get the podcast details
  const { podcast, setPodcast } = React.useContext(PodcastContext);

  // use params to get the podcast id
  const { id } = useParams();

  const [ podcastDetails, setPodcastDetails ] = React.useState(null);
  const [ trackList,      setTrackList      ] = React.useState(null);

  useEffect(() => {
    // Check local storage to see if the podcast details are already there
    const podcastDetails = localStorage.getItem(id);
    
    // If the podcast details are in local storage, set the podcast details state variable to the details from local storage
    if (podcastDetails) {
      // Set the podcast details state variable to the details from local storage
      initPodcast(JSON.parse(podcastDetails));
      return;
    }
    
    // Call the API to get the podcast details
    getPodcastDetails();
  }, [])

  const initPodcast = function(podcastDetails) {
    // Get the first podcast details from the API, it is the first item in the array
    setPodcastDetails(podcastDetails[0]);

    // Get the list of tracks from the API, it is the rest of the items in the array
    setTrackList(podcastDetails.slice(1));
  }

  const getPodcastDetails = () => {
    fetch(`https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=20`)
      .then(response => response.json())
      .then(data => {
        // Get the first podcast details from the API
        const podcastDetails = data.results;

        // Set the podcast details state variable to the details from the API
        initPodcast(podcastDetails);

        // Save the podcast details in client storage
        localStorage.setItem(id, JSON.stringify(podcastDetails));
      }).catch(error => console.log(error));
  }

  return (
    <div>
      {podcastDetails && (
        <div className={styles.main}>

          <PodcastSidebar 
            img={podcastDetails.artworkUrl600} 
            title={podcastDetails.collectionName}
            artist={podcastDetails.artistName}
            description={podcastDetails.description}/>

          <div className={styles.list}>
            <div className={`${styles.card} ${styles.count}`}>
              <h2>Episodes: {trackList.length}</h2>
            </div>

            <div className={styles.card}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.left}>Title</th>
                    <th>Date</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {trackList.map((x,i) => <PodcastTrackLine key={x.trackId} track={x} index={i} />)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
