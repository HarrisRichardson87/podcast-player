import React from 'react'
import styles from './PodcastTrackLine.module.css';
import { useNavigate } from 'react-router-dom';

// Constants for converting milliseconds to hours, minutes, and seconds
const HOURS = 3600000;
const MINUTES = 60000;
const SECONDS = 1000;

export default function PodcastTrackLine({ track, index }) {
    const navigate = useNavigate();
    
    const getTrackTime = () => {
        // Get the track time in milliseconds
        const trackTimeMillis = track.trackTimeMillis;

        // Get the hours, minutes, and seconds
        const hours   = Math.floor(trackTimeMillis / HOURS);
        const minutes = Math.floor(trackTimeMillis / MINUTES);
        const seconds = Math.floor((trackTimeMillis % MINUTES) / SECONDS);

        // If there are hours, then show the hours
        if (hours > 0) {
            // subtract the hours from the minutes
            const minutes = Math.floor((trackTimeMillis % HOURS) / MINUTES);
            return `${hours}:${minutes}:${seconds}`;
        }

        // If there are no hours, then show the minutes and seconds
        return `${minutes}:${seconds}`;
    }
    const handleClick = (e) => {
        // Prevent the default action of the click
        e.preventDefault();

        // id is the id of the podcast
        const id = track.collectionId;

        // episodeId is the id of the episode
        const trackId = track.trackId;

        // Navigate to the podcast player page
        navigate(`/podcast/${id}/episode/${trackId}`);
    }

    const getRowColor = () => {
        // if odd, then return the odd row color
        if (index % 2 === 1) 
            return styles.oddRow;

        // if even, then return the even row color
        return styles.evenRow;
    }

  return (
    <tr className={`${styles.trackLine} ${getRowColor()}`} onClick={handleClick}> 

        <td className={`${styles.left} ${styles.title}`}>{track.trackName}</td>

        <td>{new Date(track.releaseDate).toLocaleDateString()}</td>

        <td className={styles.right}>{getTrackTime()}</td>
    </tr>
  )
}
