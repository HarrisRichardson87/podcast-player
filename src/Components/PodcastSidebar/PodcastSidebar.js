import styles from './PodcastSidebar.module.css';
import React, { Fragment } from 'react'

// Properties of the podcast object
import { IMAGE_PROPERTY, ARTIST_PROPERTY, NAME_PROPERTY, ID_PROPERTY } from '../PodcastMain/PodcastLine/PodcastLine';

// Import the PodcastContext
import { PodcastContext } from '../PodcastContext/PodcastContext';

// Import the react-router-dom hook
import { useNavigate } from 'react-router-dom';

export default function PodcastSidebar() {
	// Get the podcast details from the context
	const { podcast } = React.useContext(PodcastContext);

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
		<div className={`${styles.card} ${styles.sidebar}`}>
			{ podcast && 
				<Fragment>
					
					<img className={styles.img} src={podcast[IMAGE_PROPERTY][2].label}  onClick={handleClick}/>
					
					<span className={styles.title} onClick={handleClick}>{podcast[NAME_PROPERTY].label}</span>
					
					<p className={styles.artist}>By {podcast[ARTIST_PROPERTY].label}</p>
					
					<p className={styles.description}>{podcast?.summary.label}</p>
				</Fragment>
			}
		</div>
	)
}
