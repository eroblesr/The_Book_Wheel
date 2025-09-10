import React, { useState } from 'react'
import "./Roulette.css";
function Roulette({options,genre,onResult}) {
  const [rotation,setRotation]= useState (0);
  const [result, setResult]= useState(null);
  const [shake, setShake] = useState(null);
  const [block,setBlock]= useState(null);
  const  palette = genre === "Romance"
  ? ["pink", "lightpink", "hotpink", "deeppink",
  "palevioletred", "lightcoral", "salmon", "darksalmon",
  "mistyrose", "peachpuff", "moccasin", "lightgoldenrodyellow",
  "lavender", "plum", "orchid", "thistle",
  "mediumvioletred", "indianred", "rosybrown", "lightsteelblue"]
  : ["black", "dimgray", "darkslategray", "slategray",
  "darkred", "firebrick", "maroon", "brown",
  "crimson", "indigo", "midnightblue", "darkblue",
  "darkslateblue", "rebeccapurple", "purple", "darkmagenta",
  "darkolivegreen", "saddlebrown", "darkgoldenrod", "darkcyan"];
  const angle = 360 /options.length;
  const gradient = options
  .map((_, i) => {
    const color = palette[i % palette.length];
    return `${color} ${i * angle}deg ${(i + 1) * angle}deg`;
  })
  .join(", "); 
  function randomAngulo(){
    if (!options || options.length === 0) {
     alert("They're no options in the rulette ");
  return;
}
    const turns = Math.floor(Math.random()* 5) +5;
    const offset = Math.floor(Math.random()* 360);
    const newRotation = turns *360 + offset;
    const finalAngle = (newRotation + 90) % 360; 
    const sizeOptions = (360/options.length);
    const index = Math.floor(finalAngle /sizeOptions);
    setRotation(newRotation);
    setResult(options[index]);
    const winner = options[index];
    if(onResult) onResult(winner);
    setShake(true);
    setBlock(true);
    setTimeout(()=>{
      setShake(false);
      setBlock(false);

    },1000);
  }
  return (
    <div className="app">
      <div className="roulette-container">
           <div
            className="wheel"
            style={{transform: `rotate(${rotation}deg)`,
                    background: `conic-gradient(${gradient})`
            }}></div>
           <div className={`pointer ${shake ? "shaking":""}`}></div>
      </div>
      <button className={`btn-start ${block ? "blocking":""}`} onClick={randomAngulo}>Start</button>
       {result && <p className="result">Book: {result.title} <br />Author: {result.author}</p>}

    </div>
  )
}

export default Roulette