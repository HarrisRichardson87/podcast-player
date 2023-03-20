import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
export const PodcastContext = React.createContext();
/**
 * This is the context provider for the podcast details, which is used to pass the podcast details to the podcast view page
 * It also checks local storage to see if the podcast details are already there
 * It uses the id from the url to get the podcast details
 * @param {id} param  
 * @returns 
 */
export default function PodcastContextProvider ({ children }) {
    // use params to get the podcast id
	const { id } = useParams();
    // Create a state variable to hold the podcast details
    const [podcast, setPodcast] = React.useState(null);

    useEffect(() => {
        // If podcast is null, check local storage to see if podcast details are already there
        if (!podcast) {
            if(!id) // If the id is null, then exit 
                return;
            const podcast = localStorage.getItem(id);

            // If the podcast details are in local storage, set the podcast details state variable to the details from local storage
            if (podcast) {
                // Set the podcast details state variable to the details from local storage
                setPodcast(JSON.parse(podcast));
            }
        }
    }, [])

    const value = {
        podcast, // The podcast details
        setPodcast, // The function to set the podcast details
    }

    return (
        <PodcastContext.Provider value={{...value}}>
            {children}
        </PodcastContext.Provider>
    )
}