import React from 'react'

const SongPreview = ({ song, onSelectSong }) => {

   

    return (
        <div onClick={() => onSelectSong(song)} className={`song-preview flex align-center ${song.active ? 'selected' : ''}`}>
            <div className="img-container">
                <img src={song.cover} alt={song.name} />
            </div>

            <div className="song-info flex column">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>

        </div>
    )

}


export default SongPreview