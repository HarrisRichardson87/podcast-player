import React from 'react'
import styles from './PodcastSidebar.module.css';
import { PodcastContext } from '../PodcastContext/PodcastContext';

export default function PodcastSidebar() {
  // Get the podcast details from the context
  const { podcast } = React.useContext(PodcastContext);

  
  return (
    <div className={`${styles.card} ${styles.blurb}`}>
      <img className={styles.img} src={podcast?.artworkUrl600} />
      <span className={styles.title}>{podcast?.collectionName}</span>
      { podcast?.artistName && <p className={styles.artist}>By {podcast?.artistName}</p>}
      { podcast?.description && <p className={styles.description}>{podcast?.description}</p>}
    </div>
  )
}
