import React, { useRef, useEffect, useState } from 'react';
import Style from './style.module.css'
import Photo from '../Photo';

const MultiVideoCanvas = ({ selected }) => {
    const canvasRef = useRef(null);
    const webcamRef = useRef(null);

    const [screenshot, setScreenshot] = useState(null);
    const [counter, setCounter] = useState(25); // Second for video running

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');

        if (context && selected) {
            const videoSources = selected.map(item => item.video[0]);

            let videos = videoSources.map((source, index) => {
                const video = document.createElement('video');
                video.src = source;
                video.crossOrigin = 'anonymous';
                video.loop = true;
                video.width = 200;
                video.height = 200;
                video.muted = true;
                video.play();

                return { video, index };
            });

            const setupWebcam = async () => {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                    webcamRef.current.srcObject = stream;

                } catch (error) {
                    console.error('Error accessing webcam:', error);
                }
            };

            setupWebcam();

            const drawFrame = () => {
                context.clearRect(0, 0, canvas.width, canvas.height);
                if (webcamRef?.current) {
                    context.save();
                    context.scale(-1, 1);
                    context.drawImage(webcamRef.current, -canvas.width, 0, canvas.width, canvas.height);
                    context.restore();
                }

                requestAnimationFrame(drawFrame);
            };

            drawFrame(); // start the camera

            const drawFrame1 = () => {
                videos.forEach(({ video, index }) => {
                    context.drawImage(video, 0, 0, canvas.width, canvas.height);
                });

                requestAnimationFrame(drawFrame1);
            };

            const screenshotTimeout1 = setTimeout(() => {
                drawFrame1();
            }, 10000); // after few second all player are comes

            const screenshotTimeout = setTimeout(() => {
                const dataURL = canvas.toDataURL();
                setScreenshot(dataURL);
            }, 15000); // take a screen shot what ever visible in screen

            const interval = setInterval(() => {
                setCounter((prev) => {
                    if (prev === 1) {
                        clearInterval(interval);
                        webcamRef?.current?.srcObject?.getTracks().forEach(track => track.stop());
                        videos = videoSources.map((source, index) => {
                            const video = document.createElement('video');
                            video.src = source;
                            video.crossOrigin = 'anonymous';
                            video.loop = true;
                            video.width = 200;
                            video.height = 200;
                            video.muted = true;
                            video.play();

                            return { video, index };
                        });
                        return 0;
                    }
                    else if (prev === 3) {
                        videos?.forEach(({ video }) => {
                            video.pause();
                        });
                        videos = [];
                    }
                    return prev - 1;
                });

            }, 1000);

            return () => {
                videos?.forEach(({ video }) => video.pause());
                webcamRef?.current?.srcObject?.getTracks().forEach(track => track.stop());
                clearTimeout(screenshotTimeout);
                clearInterval(interval);
                clearTimeout(screenshotTimeout1);
            };
        }

    }, [selected]);

    return (
        <div style={{ width: "100vh", height: "100vw", position: "relative", zIndex: 1 }}>
            {counter !== 0 &&
                <>

                    <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
                    <div className={`${Style.camera_animation}`} style={counter - 7 === 0 ?
                        { backgroundColor: "rgba(255,255,255,1)"} :
                        counter - 7 === 1 ?
                            { backgroundColor: "rgba(255,255,255,0.7)"} :
                            counter - 7 === 2 ?
                                { backgroundColor: "rgba(255,255,255,0.4)" } :
                                {}}>
                        <div className={`${Style.ready_to_take}`}>
                            <h1>ready</h1>
                            <h3>to take a photo?</h3>
                        </div>
                        <div className={`${Style.ready_to_position}`}>
                            <h3>set into</h3>
                            <h1>Position</h1>
                        </div>
                        <div className={`${Style.ready_to_huddle_up}`}>
                            <h1>HUDDLE</h1>
                            <h1>UP</h1>
                        </div>
                        {(counter <= 10 && counter > 7) &&
                            <div className={`${Style.ready_to_countdown}`}>
                                <h1>{counter - 7}</h1>
                                <h1>smile</h1>
                                <h3>for the camera</h3>
                            </div>
                        }
                    </div>
                    <video ref={webcamRef} width="100%" height="100%" autoPlay playsInline style={{ transform: "scaleX(-1)", display: "none" }} />
                </>}
            {counter === 0 && screenshot &&
                <Photo screenshot={screenshot} />
            }
        </div>
    );
};

export default MultiVideoCanvas;