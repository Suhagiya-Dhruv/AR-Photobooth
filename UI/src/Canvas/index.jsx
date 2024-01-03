import React, { useRef, useEffect, useState } from 'react';
import Style from './style.module.css'

const MultiVideoCanvas = ({ selected }) => {
    const canvasRef = useRef(null);
    const webcamRef = useRef(null);

    const [screenshot, setScreenshot] = useState(null);
    const [counter, setCounter] = useState(10);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');

        if (context) {
            const videoSources = selected.map(item => item.video[0]);

            const videos = videoSources.map((source, index) => {
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
                    // context.rotate((90 * Math.PI) / 180);
                    context.scale(-1, 1);
                    context.drawImage(webcamRef.current, -canvas.width, 0, canvas.width, canvas.height);
                    context.restore();
                }

                // context.save();
                // context.rotate((90 * Math.PI) / 180);
                // context.translate(0, -canvas.width);

                videos.forEach(({ video, index }) => {
                    context.drawImage(video, 0, 0, canvas.width, canvas.height);
                });

                // context.restore();
                requestAnimationFrame(drawFrame);
            };

            drawFrame();

            // const screenshotTimeout = setTimeout(() => {
            //     const dataURL = canvas.toDataURL();
            //     setScreenshot(dataURL);
            // }, 7000);

            // const interval = setInterval(() => {
            //     setCounter((prev) => {
            //         if (prev === 0) {
            //             clearInterval(interval);
            //             webcamRef?.current?.srcObject?.getTracks().forEach(track => track.stop());
            //             videos?.forEach(({ video }) => video.pause());
            //             return 0;
            //         }
            //         return prev - 1;
            //     });

            // }, 1000);

            return () => {
                videos?.forEach(({ video }) => video.pause());
                webcamRef?.current?.srcObject?.getTracks().forEach(track => track.stop());
                // clearTimeout(screenshotTimeout);
                // clearInterval(interval);
            };
        }

    }, [selected]);

    const downloadScreenshot = () => {
        const downloadLink = document.createElement('a');
        downloadLink.href = screenshot;
        downloadLink.download = 'screenshot.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    return (
        <div style={{ border: "1px solid blue", width: "100vh", height: "100vw", position: "relative" }}>
            {counter !== 0 &&
                <>

                    <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
                    {(counter <= 5 && counter > 2) &&
                        <div style={{
                            position: "absolute",
                            top: "0",
                            left: "0",
                            background: "rgba(255,255,255,0.5)",
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <div style={{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                                className='smile'
                            >
                                <h1>{counter - 2}</h1>
                                <h2>SMILE</h2>
                                <div>FOR THE CAMERA</div>

                            </div>
                        </div>
                    }
                    <video ref={webcamRef} autoPlay playsInline style={{ transform: "scaleX(-1)", display: "none" }} />
                </>}
            {counter === 0 && screenshot &&
                <>
                    <img src={screenshot} alt="Screenshot" width="80%" height="80%" />
                    <button onClick={downloadScreenshot}>Download Screenshot</button>
                </>
            }
        </div>
    );
};

export default MultiVideoCanvas;