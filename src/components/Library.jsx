import React from 'react'
import SongPreview from './SongPreview'

const Library = ({ songs, isLibraryOpen, onSelectSong }) => {

    return (
        <div className={`library ${isLibraryOpen ? 'active-library' : ''}`}>
            <h2>Library</h2>
            <div className="song-list">
                {songs.length > 0 && songs.map(song => <SongPreview
                    song={song} key={song.id}

                    onSelectSong={onSelectSong}
                />)}

            </div>
        </div>
    )

}


export default Library