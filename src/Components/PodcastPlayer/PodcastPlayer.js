import styles from './PodcastPlayer.module.css';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import PodcastSidebar from '../PodcastSidebar/PodcastSidebar';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

export default function PodcastPlayer() {
    // Get the id and episodeId from the url
    const id        = useParams().id;
    const episodeId = useParams().episodeId;

    // Create a state variable to hold the episode details
    const [ episodeDetails, setEpisodeDetails ] = useState(null);

    // Create a ref to the podcast player
    const podcastPlayer       = useRef();
    const podcastPlayerSource = useRef();

    // loading state
    const [loading, setLoading] = useState(false);
    
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

        // Set loading to true
        setLoading(true);

        // Call the API to get the episode details
        fetch(getUrl())
            .then(response => response.json())
            .then(data => {
                // Get the first episode details from the API
                const list = JSON.parse(data.contents).results;

                // Find the episode details in the list of episodes
                const episode = list.find(episode => episode.trackId == episodeId); // use == instead of === because the trackId is a number and the episodeId is a string
                
                // Set the episode details state variable to the details from the API
                initEpisode(episode);

                // Save the episode details in client storage
                localStorage.setItem(episodeId, JSON.stringify(episode));

                // Set loading to false
                setLoading(false);

            }).catch(error => {
                // Set loading to false
                setLoading(false);

                // Log the error
                console.log(error)}
            );
    }

    return (
        <div className={styles.main}>
            
            <PodcastSidebar/>

            <div className={styles.details}>
                
                { loading && <Skeleton height={400} width={400} />}

                {!loading && 
                    <Fragment>
                        <h1>{episodeDetails?.trackName}</h1>
                        <p className={styles.description}>{episodeDetails?.description}</p>
                        <audio ref={podcastPlayer} id="podcast-player" controls autoPlay loop >
                            <source ref={podcastPlayerSource} id="podcast-player-source" type="audio/mpeg" src={episodeDetails?.trackViewUrl } />
                        </audio>
                    </Fragment>
                }
            </div>
        </div>
    )
}
