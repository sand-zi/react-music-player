import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic } from '@fortawesome/free-solid-svg-icons'

const AppNav = ({ setisLibraryOpen, isLibraryOpen }) => {
    const onUpdateLibraryStatus = () => {

        setisLibraryOpen(!isLibraryOpen)

    }

    return (
        <nav className="app-nav flex align-center justify-space-around ">
            <h1>Vibes</h1>
            <button onClick={onUpdateLibraryStatus}>
                Library
                <FontAwesomeIcon icon={faMusic} />
            </button>

        </nav>
    )
}


export default AppNav
