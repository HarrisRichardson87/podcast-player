import styles from './PodcastSidebar.module.css';
import React, { Fragment } from 'react'

// Properties of the podcast object
import { IMAGE_PROPERTY, ARTIST_PROPERTY, NAME_PROPERTY } from '../PodcastMain/PodcastLine/PodcastLine';

// Import the PodcastContext
import { PodcastContext } from '../PodcastContext/PodcastContext';

export default function PodcastSidebar() {
	// Get the podcast details from the context
	const { podcast } = React.useContext(PodcastContext);
	return (
		<div className={`${styles.card} ${styles.blurb}`}>
			{ podcast && 
				<Fragment>
					
					<img className={styles.img} src={podcast[IMAGE_PROPERTY][2].label}  />
					
					<span className={styles.title}>{podcast[NAME_PROPERTY].label}</span>
					
					<p className={styles.artist}>By {podcast[ARTIST_PROPERTY].label}</p>
					
					<p className={styles.description}>{podcast?.summary.label}</p>
				</Fragment>
			}
		</div>
	)
}
