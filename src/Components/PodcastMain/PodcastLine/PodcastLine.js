import React, { useContext } from 'react';
import styles from './PodcastLine.module.css';
import { useNavigate } from 'react-router-dom';
import { PodcastContext } from '../../PodcastContext/PodcastContext';

// Constants for the properties of the podcast object
const ID_PROPERTY = "im:id";
export const IMAGE_PROPERTY  = "im:image";
export const ARTIST_PROPERTY = "im:artist";
export const NAME_PROPERTY   = "im:name";

export default function PodcastLine({ podcast }) {
	// Get the podcast details from the context
	const { setPodcast } = useContext(PodcastContext);

	// Get the navigate function from the react-router-dom
	const navigate = useNavigate();

	const handleClick = (e) => {
		// Prevent the default action of the click
		e.preventDefault();

		// Set the podcast details in the context
		setPodcast(podcast);

		// id is the id of the podcast
		const id = podcast.id.attributes[ID_PROPERTY];

		// Navigate to the podcast view page
		navigate(`/podcast-view/${id}`);
	}
	return (
		<div onClick={handleClick} className={styles.podcast}>
			<img  className={styles.circleImg} src={podcast[IMAGE_PROPERTY][2].label} />
			<span className={styles.title}>{podcast[NAME_PROPERTY].label}</span>
			<span className={styles.artist}>{podcast[ARTIST_PROPERTY].label}</span>
		</div>
	)
}
