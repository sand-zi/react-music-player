import React, { useState, useRef, useEffect } from 'react'
import AppNav from '../components/AppNav'
import Library from '../components/Library'
import Player from '../components/Player'
import Song from '../components/Song'

import { getChillHopSongs } from '../services/dataService.js'

const MusicApp = () => {
    const audioRef = useRef(null)
    const [songs, setSongs] = useState(getChillHopSongs())
    const [currentSong, setCurrentSong] = useState(songs[0])
    const [isSongPlaying, setIsSongPlaying] = useState(false)

    const [isLibraryOpen, setisLibraryOpen] = useState(false)
    // ToDO implement useEffect base on currentSong, no need to pass the updateActiveSong

    useEffect(() => {

        function updateActiveSong(songId) {
            const updatedSongs = songs.map(song => {
                return (song.id === songId) ? { ...song, active: true } : { ...song, active: false }
            })
            setSongs(updatedSongs)
        }

        updateActiveSong(currentSong.id)

    }, [currentSong])


    const getNextSongIdx = (idx) => {
        if (idx < 0) {
            return songs.length - 1
        } else if (idx === songs.length) {
            return 0
        } else return idx

    }

    const onSelectSong = async (song) => {
        await setCurrentSong({ ...song, active: true })
        await audioRef.current.play()
        setIsSongPlaying(true)


    }

    const navigateSong = (direction) => {
        const currentSongIdx = songs.findIndex(song => song.id === currentSong.id)
        const nextSongIdx = getNextSongIdx(currentSongIdx + direction)

        onSelectSong(songs[nextSongIdx])
    }






    return (
        <div className={`music-app ${isLibraryOpen ? 'library-open' : ''}`}>
            <AppNav isLibraryOpen={isLibraryOpen} setisLibraryOpen={setisLibraryOpen} />
            <Song currentSong={currentSong} />
            <Player currentSong={currentSong}
                isSongPlaying={isSongPlaying}
                setIsSongPlaying={setIsSongPlaying}
                audioRef={audioRef}
                navigateSong={navigateSong}
            />
            <Library songs={songs}

                isLibraryOpen={isLibraryOpen}
                onSelectSong={onSelectSong}
            />
        </div>
    )
}


export default MusicApp


{/* <Library songs={songs} setCurrentSong={setCurrentSong} audioRef={audioRef}
setIsSongPlaying={setIsSongPlaying} updateActiveSong={updateActiveSong}
isLibraryOpen={isLibraryOpen} /> */}