import React from 'react'
import Style from './style.module.css'
import landing from '../assets/landing.jpg'

const Landing = (props) => {

    const { setStart } = props;

    return (
        <div className={`${Style.landding}`} onClick={() => setStart(true)}>
            <h4>pose with the</h4>
            <h1>pros</h1>
            <div>
                <img width="100%" height="100%" src={landing} alt="landing-jpg"/>
            </div>
            <h2>huddle up</h2>
            <h3>and take a photo</h3>
            <i className="fa-solid fa-camera"></i>
        </div>
    )
}

export default Landing