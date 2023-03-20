import React from 'react';
import styles from './PodcastLine.module.css';
import { useNavigate } from 'react-router-dom';

// Constants for the properties of the podcast object
const IMAGE_PROPERTY = "im:image";
const ID_PROPERTY = "im:id";
const ARTIST_PROPERTY = "im:artist";
const NAME_PROPERTY = "im:name";

export default function PodcastLine({ podcast }) {
  // Get the navigate function from the react-router-dom
  const navigate = useNavigate();

  const handleClick = (e) => {
    // Prevent the default action of the click
    e.preventDefault();

    // id is the id of the podcast
    const id = podcast.id.attributes[ID_PROPERTY];

    // Navigate to the podcast view page
    navigate(`/podcast-view/${id}`);
  }
  return (
    <div onClick={handleClick} className={styles.podcast}>
        <img className={styles.circleImg} src={podcast[IMAGE_PROPERTY][2].label} />
        <span className={styles.title}>{podcast[NAME_PROPERTY].label}</span>
        <span className={styles.artist}>{podcast[ARTIST_PROPERTY].label}</span>
    </div>
  )
}
