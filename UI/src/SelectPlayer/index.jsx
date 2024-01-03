import React, { useState } from 'react'

import caption from "../assets/Charecter/captain_america.png";
import captionGif from "../assets/Charecter/captain_america.webm"

import iron from "../assets/Charecter/iron_man.png";
import ironGif from "../assets/Charecter/iron_man.webm";

import spider from "../assets/Charecter/hulk.png";
import spiderGif from "../assets/Charecter/spider_man.webm";


import Style from './style.module.css'
import MultiVideoCanvas from '../Canvas';

const selectedCount = 5;

const SelectPlayer = () => {

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
    },
    {
      id: "124",
      link: caption,
      video: [captionGif]
    },
    {
      id: "457",
      link: iron,
      video: [ironGif]
    },
    {
      id: "780",
      link: spider,
      video: [spiderGif]
    },
    {
      id: "143",
      link: caption,
      video: [captionGif]
    },
    {
      id: "476",
      link: iron,
      video: [ironGif]
    }
  ]);

  const [selected, setSelected] = useState([]);

  const [output, setOutput] = useState(true);

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

    <div className={`${Style.selection_player}`}>
      {!output ?
        <>
          <div className={`${Style.child}`}>
            <h6>Select</h6>
            <h1>five player</h1>
            <div className={`${Style.model_container}`}>
              {character.map((item, idx) => {
                return (
                  <div key={idx} className={`${Style.model_image}`} onClick={() => selectedHandler(item)}>
                    {/* <div className={`${Style.selected}`}>&#9733;</div> */}
                    <div className={`${Style.selection}`}></div>
                    <img src={item.link} alt="none" className={`${Style.image}`} />
                    <h4>Iron</h4>
                    <h2>Man</h2>
                  </div>
                )
              })
              }

            </div>
            <div className={`${Style.buttons}`}>
              <div className={`${Style.reset}`} onClick={() => setSelected([])}>reset</div>
              <div className={`${Style.submit}`} style={selected.length === selectedCount ? { opacity: 1 } : { opacity: 0.5 }} onClick={() => {
                if (selected.length === selectedCount) {
                  setOutput(true)
                }
              }}>submit</div>
            </div>
          </div>
          <div className={`${Style.selected_player}`}>
            <div className={`${Style.selected_model_container}`}>
              {new Array(selectedCount).fill(0).map((item, idx) => {
                return (
                  <div key={idx} className={`${Style.selected_model_star}`}>
                    &#9734;
                  </div>
                )
              })
              }
            </div>
            <div className={`${Style.selected_model_container}`}>
              {[...selected].concat(new Array(5).fill(0)).slice(0, 5).map((item, idx) => {
                return (
                  <div key={idx} className={`${Style.image_box}`}>
                    {item !== 0 &&
                      <img src={item.link} alt="none" className={`${Style.selected_image}`} />
                    }
                  </div>
                )
              })
              }
            </div>
          </div>
        </>
        :
        <MultiVideoCanvas selected={[...selected].reverse()} />
      }

    </div>
  )
}

export default SelectPlayer;