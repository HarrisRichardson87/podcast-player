import React from 'react'
export const PodcastContext = React.createContext();

export default function PodcastContextProvider ({ children}) {
    const [podcast, setPodcast] = React.useState(null);

    const value = {
        podcast,
        setPodcast,
    }
    return (
        <PodcastContext.Provider value={{...value}}>
            {children}
        </PodcastContext.Provider>
    )
}