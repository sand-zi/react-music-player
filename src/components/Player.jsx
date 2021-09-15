import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faAngleLeft, faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons'

import { utilService } from '../services/utilService.js'

const Player = ({ currentSong, isSongPlaying, setIsSongPlaying, audioRef, navigateSong }) => {
    const [songInfo, setSongInfo] = useState(
        {
            currentTime: 0,
            duration: 0,
            animationPercentage: 0
        }
    )



    const handleTimeUpdate = (ev) => {
        const current = ev.target.currentTime
        const duration = ev.target.duration
        const animationPercentage = Math.round((Math.round(current) / Math.round(duration)) * 100) || 0

        setSongInfo({ ...songInfo, currentTime: current, duration, animationPercentage })
        if (current === duration) {
            onTogglePlaySong()
            navigateSong(1)
        }
    }

    const onDragInput = (ev) => {

        setSongInfo({ ...songInfo, currentTime: ev.target.value })
        audioRef.current.currentTime = ev.target.value

    }

    const onTogglePlaySong = () => {
        // I need  to access the html tag audio to do audio.play, so I will need to do useRef
        (isSongPlaying) ? audioRef.current.pause() : audioRef.current.play()
        setIsSongPlaying(!isSongPlaying)

    }

    const onSkipSong = (direction) => {
        navigateSong(direction)
    }

    const trackAnimationStyle = {
        transform: `translateX(${songInfo.animationPercentage}%)`
    }


    return (
        <div className="player flex column align-center justify-space-between ">
            <div className="time-control flex align-center">
                <p>{utilService.convertTime(songInfo.currentTime)}</p>
                <div className="track" style={{ background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]} )` }}>
                    <input min={0} max={songInfo.duration || 0} value={songInfo.currentTime} type="range" className="range-input" onChange={onDragInput} />
                    <div className="animate-track" style={trackAnimationStyle}></div>
                </div>

                <p>{utilService.convertTime(songInfo.duration || 0)}</p>
            </div>
            <div className="play-control flex align-center justify-space-between ">
                <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} onClick={() => onSkipSong(-1)} />
                <FontAwesomeIcon onClick={onTogglePlaySong} className="play" size="2x" icon={(isSongPlaying) ? faPause : faPlay} />

                <FontAwesomeIcon className="skip-forward" size="2x" icon={faAngleRight} onClick={() => onSkipSong(1)} />
            </div>
            {/* onloadedMetadata is used to initially update the time as onTimeUpdate will update only in the process */}
            <audio onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleTimeUpdate} ref={audioRef} src={currentSong.audio}></audio>
        </div>
    )
}


export default Player