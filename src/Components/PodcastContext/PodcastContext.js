import React from 'react'
export const PodcastContext = React.createContext();

export default function PodcastContextProvider ({ children }) {
    // Create a state variable to hold the podcast details
    const [podcast, setPodcast] = React.useState(null);

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