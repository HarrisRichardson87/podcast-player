import React from 'react'
export const PodcastContext = React.createContext();

export default function PodcastContext() {
    const [podcast, setPodcast] = React.useState(null);
    const [episode, setEpisode] = React.useState(null);
    
    const value = React.useMemo(() => {
        return {
            podcast,
            setPodcast,
            episode,
            setEpisode
        }
    }, [podcast, episode]);

    return (
        <PodcastContext.Provider value={value}>
            {children}
        </PodcastContext.Provider>
    )
}
