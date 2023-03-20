import styles from './PodcastPlayer.module.css';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import PodcastSidebar from '../PodcastSidebar/PodcastSidebar';

export default function PodcastPlayer() {
    const id = useParams().id;
    const episodeId = useParams().episodeId;

    const [ episodeDetails, setEpisodeDetails ] = useState(null);

    const podcastPlayer = useRef();
    const podcastPlayerSource = useRef();
    
    useEffect(() => {
        // Check local storage to see if episode details are already there
        const episodeDetails = localStorage.getItem(episodeId);

        // If the episode details are in local storage, set the episode details state variable to the details from local storage
        if (episodeDetails) {
            // Set the episode details state variable to the details from local storage
            initEpisode(JSON.parse(episodeDetails));
            return;
        }
        // Call the API to get the episode details
        getEpisodeDetails();
        
    }, [id, episodeId])

    const initEpisode = function(episodeDetails) {
        // Get the first episode details from the API, it is the first item in the array

        setEpisodeDetails(episodeDetails);

        // Play the episode
        podcastPlayerSource.current.src = episodeDetails.trackViewUrl;

        // Load the episode
        podcastPlayer.current.load();

        // Play the episode
        podcastPlayer.current.play();
    }

    const getUrl = () => {
        // If the id is a number, then it is a podcast id
        if (!isNaN(id)) 
            return `https://api.allorigins.win/get?url=${encodeURIComponent(`https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=20`)}`;
    }


    const getEpisodeDetails = () => {
        // Get the url for the API call
        const url = getUrl();
        
        // If the url is null, then return
        if (!url) 
            return;

        // Call the API to get the episode details
        fetch(getUrl())
            .then(response => response.json())
            .then(data => {
                // Get the first episode details from the API
                const list = JSON.parse(data.contents).results;

                // Find the episode details in the list of episodes
                const episode = list.find(episode => episode.trackId == episodeId);
                
                // Set the episode details state variable to the details from the API
                initEpisode(episode);

                // Save the episode details in client storage
                localStorage.setItem(episodeId, JSON.stringify(episode));

            }).catch(error => console.log(error));
    }

    return (
        <div className={styles.main}>
            <PodcastSidebar 
                img={episodeDetails?.artworkUrl600}
                title={episodeDetails?.collectionName}
                artist={episodeDetails?.artistName}
            />

            <div className={styles.details}>
                <h1>{episodeDetails?.trackName}</h1>
                <p className={styles.description}>{episodeDetails?.description}</p>
                <audio ref={podcastPlayer} id="podcast-player" controls autoPlay loop >
                    <source ref={podcastPlayerSource} id="podcast-player-source" type="audio/mpeg" src={episodeDetails?.trackViewUrl } />
                </audio>
            </div>
        </div>
    )
}
