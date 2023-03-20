import React, { useEffect } from 'react'
import PodcastLine from './PodcastLine/PodcastLine';
import styles from './PodcastMain.module.css';
/**
 * This is the main component for the podcast app
 * It contains the list of podcasts
 * It also contains the search bar
 * It checks local storage to see if the list of podcasts is already there or if it needs to be updated
 * @returns {JSX} The main component for the podcast app
 */
export default function PodcastMain() {
    // Create a state variable for the podcast list
    const [ podcastList, setPodcastList ] = React.useState([]);

    // Create a state variable for the filtered podcast list
    const [ filteredPodcastList, setFilteredPodcastList ] = React.useState([]);
    
    useEffect(() => {
        // Check the date of the last update
        const lastUpdate  = localStorage.getItem('lastUpdate');

        // If the last update was less than 24 hours ago, get the list from client storage
        if (lastUpdate && !hasItBeenADaySinceLastUpdate(lastUpdate)) {

            // Get the list from client storage
            const podcastList = JSON.parse(localStorage.getItem('podcastList'));

            // Set the podcast list to the list from client storage
            setPodcastList(podcastList);
            setFilteredPodcastList(podcastList);
            return;
        } 

        // User has data in local storage, but it is more than 24 hours old
        if(lastUpdate)
            localStorage.clear();

        // Otherwise, get the list from the API
        getListOfPodcasts();
    }, []);

    const hasItBeenADaySinceLastUpdate = (lastUpdate) => {
        // Convert the last update time to a date object
        lastUpdate = new Date(lastUpdate).getTime();

        // Get the current time in milliseconds
        const ONE_DAY = 1000 * 60 * 60 * 24;
        const now = new Date().getTime();

        // If the last update was more than a day ago, return true
        return now - lastUpdate >= ONE_DAY;
    }

    // I am using to fetch the data from the API to get the list of podcasts
    const getListOfPodcasts = () => {
    fetch("https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json")
        .then(response => response.json())
        .then(data => {
            // Set the podcast list to the data from the API
            setPodcastList(data.feed.entry)
            setFilteredPodcastList(data.feed.entry);

            // save in client storage
            localStorage.setItem('podcastList', JSON.stringify(data.feed.entry));

            // save date of last update
            localStorage.setItem('lastUpdate', new Date().getTime());

        }).catch(error => console.log(error));
    }

    const handleSearch = (e) => {
        // Get the value of the search
        const searchValue = e.target.value;

        // Filter the podcast list based on the search value
        const filteredPodcastList = podcastList.filter((x) => x.title.label.toLowerCase().includes(searchValue.toLowerCase()));

        // Set the podcast list to the filtered list
        setFilteredPodcastList(filteredPodcastList);
    }

    return (
        <div className={styles.main}>
            <div className={styles.podcastList}>
                <div className={styles.actions}>
                    <span className={styles.count}>{filteredPodcastList.length}</span>
                    <input className={styles.search} type="text" placeholder="Filter podcasts..." onChange={handleSearch}/>
                </div>
                { filteredPodcastList.map((x, i) => <PodcastLine key={x.title.label + i} podcast={x} />) }
            </div>
        </div>
    )
}
