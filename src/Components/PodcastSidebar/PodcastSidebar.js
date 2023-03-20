import React from 'react'
import styles from './PodcastSidebar.module.css';

export default function PodcastSidebar({ img, title, artist, description }) {
  return (
    <div className={`${styles.card} ${styles.blurb}`}>
      <img className={styles.img} src={img} />
      <span className={styles.title}>{title}</span>
      { artist && <p className={styles.artist}>By {artist}</p>}
      { description && <p className={styles.description}>{description}</p>}
    </div>
  )
}
