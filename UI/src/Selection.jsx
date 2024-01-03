import React, { useState } from 'react'

import caption from "./assets/Charecter/captain_america.png";
import captionGif from "./assets/Charecter/captain_america.webm"

import iron from "./assets/Charecter/iron_man.png";
import ironGif from "./assets/Charecter/iron_man.webm";

import spider from "./assets/Charecter/hulk.png";
import spiderGif from "./assets/Charecter/spider_man.webm";

import MultiVideoCanvas from './Canvas';

import Style from './style.module.css'

const selectedCount = 2;

const Selection = () => {

  const [character, setCharacter] = useState([
    {
      id: "123",
      link: caption,
      video: [captionGif]
    },
    {
      id: "456",
      link: iron,
      video: [ironGif]
    },
    {
      id: "789",
      link: spider,
      video: [spiderGif]
    }
  ]);

  const [selected, setSelected] = useState([]);

  const [output, setOutput] = useState(false);

  const selectedHandler = (item) => {

    if (selected.find(a => a.id === item.id)) {
      setSelected(selected.filter(a => a.id !== item.id));
    } else {
      if (selected.length === selectedCount) {
        return;
      }
      setSelected([...selected, item]);
    }
  }

  return (
    <div>
      {/* {!output && */}
      <div>
        <h1>Select 2 character</h1>
        <div style={{ display: "flex", gap: "3rem" }}>
          {character.map((item) => {
            return (
              <div key={item.id} style={{ width: "100px", height: "200px" }} onClick={() => selectedHandler(item)}>
                <img src={item.link} alt="characters" width="100%" height="100%" />
              </div>
            )
          })
          }

          <div style={{ position: 'absolute', top: 0, right: 0, display: "flex" }}>

            <div>
              {new Array(selectedCount).fill(0).map((item, idx) => {
                return (
                  <div key={idx} style={{
                    height: "200px",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    gap: '3rem'
                  }}>
                    <div style={{ width: '50px', height: "50px", fontSize: "72px" }}>&#9734;</div>
                  </div>
                )
              })
              }
            </div>
            <div style={{ minWidth: '200px' }}>
              {selected.map((item, idx) => {
                return (
                  <div key={item.id} style={{
                    width: "200px",
                    height: "200px",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    gap: '3rem'
                  }}>
                    <div style={{ width: '200px', height: "400px", transform: "rotate(-60deg)", position: "absolute", left: "45%", top: "-10%" }}>
                      <img src={item.link} alt="characters" width="100%" height="100%" />
                    </div>
                  </div>
                )
              })
              }
            </div>
          </div>
        </div>
      </div>
      {/* } */}
      <button onClick={() => setOutput(prev => !prev)}>{output ? "Reset" : "Go"}</button>
      {output &&
        <MultiVideoCanvas selected={[...selected].reverse()} />
      }
    </div>
  )
}

export default Selection;