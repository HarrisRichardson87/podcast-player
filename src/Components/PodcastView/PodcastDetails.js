import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import PodcastTrackLine from './PodcastTrackLine/PodcastTrackLine';
import styles from './PodcastDetails.module.css';
import PodcastSidebar from '../PodcastSidebar/PodcastSidebar';
const LOCAL_STORAGE_KEY_UPDATE = 'lastupdate';

/**
 * This component displays the details of a podcast
 * It also checks local storage to see if the podcast details are already there
 * It uses the id from the url to get the podcast details
 * @param {id} param
 * @returns {JSX.Element}
 */
export default function PodcastDetails() {
	// use params to get the podcast id
	const { id } = useParams();

	// loading state
	const [ loading, setLoading ] = React.useState(false);

	const [ podcastDetails, setPodcastDetails ] = React.useState(null);
	const [ trackList,      setTrackList      ] = React.useState(null);

	useEffect(() => {
		// Check local storage to see if the podcast details are already there
		const podcastDetails = localStorage.getItem(id);
		const lastUpdate = localStorage.getItem(LOCAL_STORAGE_KEY_UPDATE + id);
		
		// If the podcast details are in local storage, set the podcast details state variable to the details from local storage
		if (podcastDetails && lastUpdate && !hasItBeenADaySinceLastUpdate(lastUpdate)) {
			// Set the podcast details state variable to the details from local storage
			initPodcast(JSON.parse(podcastDetails));
			return;
		}
		
		// Call the API to get the podcast details
		getPodcastDetails();
	}, []);

	const hasItBeenADaySinceLastUpdate = function (lastUpdate){
		// Convert the last update time to a date object
		lastUpdate = new Date(lastUpdate).getTime();

		// Get the current time in milliseconds
		const ONE_DAY = 1000 * 60 * 60 * 24;
		const now = new Date().getTime();

		// If the last update was more than a day ago, return true
		return now - lastUpdate >= ONE_DAY;
	}

	const initPodcast = function(podcastDetails) {
		// Get the first podcast details from the API, it is the first item in the array
		setPodcastDetails(podcastDetails.results[0]);

		// Get the list of tracks from the API, it is the rest of the items in the array
		setTrackList(podcastDetails.results.slice(1));
	}
	
	const getUrl = () => {
        // If the id is a number, then it is a podcast id
        if (!isNaN(id)) 
            return `https://api.allorigins.win/get?url=${encodeURIComponent(`https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=20`)}`;
	}		

	const getPodcastDetails = () => {
		// Set the loading state to true
		setLoading(true);

		fetch(getUrl())
		.then(response => response.json())
		.then(data => {
			// Get the first podcast details from the API
			const podcastDetails = JSON.parse(data.contents);

			// Set the podcast details state variable to the details from the API
			initPodcast(podcastDetails);

			// Save the podcast details in client storage
			localStorage.setItem(id, JSON.stringify(podcastDetails));
			localStorage.setItem(LOCAL_STORAGE_KEY_UPDATE + id, new Date().getTime());

			// Set the loading state to false
			setLoading(false);
		}).catch(error => {
			setLoading(false);
			console.log(error);
		});
	}

	return (
		<div>

			{/* LOADING */}
			{ loading &&
				<div className={styles.loading}>
					<div className={styles.spinner}></div>
				</div>
			}

			{podcastDetails && !loading &&(
				<div className={styles.main}>

					{/* SIDEBAR */}
					{ podcastDetails && <PodcastSidebar />}

					{/* PODCAST DETAILS */}
					<div className={styles.list}>

						{/* COUNT */}
						<div className={`${styles.card} ${styles.count}`}>
							<h2>Episodes: {trackList.length}</h2>
						</div>

						{/* TRACKLIST */}
						<div className={`${styles.card} ${styles.trackList}`}>
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
