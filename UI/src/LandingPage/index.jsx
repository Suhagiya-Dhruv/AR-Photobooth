import React from 'react'
import Style from './style.module.css'

const Landing = (props) => {

    const { setStart } = props;

    return (
        <div className={`${Style.landding}`} onClick={() => setStart(true)}>
            <h4>pose with the</h4>
            <h1>pros</h1>
            <div></div>
            <h2>huddle up</h2>
            <h3>and take a photo</h3>
            <i className="fa-solid fa-camera"></i>
        </div>
    )
}

export default Landing