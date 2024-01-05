import React, { useState } from 'react'
import Style from './style.module.css'
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

const emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const Photo = (props) => {

    const { screenshot } = props;

    const [email, setEmail] = useState(false);
    const [emailValue, setEmailValue] = useState("");
    const [emailSent, setEmailSent] = useState(false);
    const [error, setError] = useState(false);

    const downloadScreenshot = async () => {
        // const downloadLink = document.createElement('a');
        // downloadLink.href = screenshot;
        // downloadLink.download = 'screenshot.png';
        // document.body.appendChild(downloadLink);
        // downloadLink.click();
        // document.body.removeChild(downloadLink);
        setEmail(prev => !prev)
    };

    const onChnage = (e) => {
        setEmailValue(e);
        if (error) {
            setError(false);
        }
    }
    const onKeyPress = (e) => {
        if (e === "{enter}") {
            if (emailReg.test(emailValue)) {
                setEmailSent(true);
                setEmail(prev => !prev);
                setEmailValue("");
            } else {
                setError(true);
            }
        }
    }

    return (
        <div className={`${Style.screenshot}`}>
            <div>
                <h3>share your</h3>
                <h1>live portrait</h1>
            </div>
            <img src={screenshot} alt="Screenshot" width="50%" height="50%" className={`${Style.image_capture}`} />
            {email ?
                <div className={`${Style.keyboard}`}>
                    <input type="email" placeholder='Enter your email' autoFocus value={emailValue} className={`${Style.inputfield}`}
                        style={error ? { borderColor: "red" } : {}} />
                    <Keyboard
                        onChange={onChnage}
                        onKeyPress={onKeyPress}
                    />
                </div>

                :
                <div className={`${Style.buttons}`}>
                    <button onClick={downloadScreenshot} disabled={emailSent} style={emailSent ? { opacity: 0.5 } : {}}> {emailSent ? "Email sent" : "Email"}</button>
                    <button onClick={() => window.location.reload()}>Home</button>
                </div>
            }
        </div>
    )
}

export default Photo