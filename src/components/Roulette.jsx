import React, { useState } from 'react'
import "./Roulette.css";
function Roulette({options,onResult}) {
  const [rotation,setRotation]= useState (0);
  const [result, setResult]= useState(null);
  const [shake, setShake] = useState(null);
  const [block,setBlock]= useState(null);
  function randomAngulo(){
    if (!options || options.length === 0) {
     alert("They're no options in the rulette ");
  return;
}
    const turns = Math.floor(Math.random()* 5) +5;
    const offset = Math.floor(Math.random()* 360);
    const  newRotation = turns *360 + offset;
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
            style={{transform: `rotate(${rotation}deg)`}}></div>
           <div className={`pointer ${shake ? "shaking":""}`}></div>
      </div>
      <button className={`btn-start ${block ? "blocking":""}`} onClick={randomAngulo}>Start</button>
       {result && <p className="result">Book: {result.title} <br />Author: {result.author}</p>}

    </div>
  )
}

export default Roulette