import React from 'react';
import abcjs from 'abcjs'

const CONTROLLER_WIDTH = 200;
const CIRCLES_COLOR = "#ff0000";
const CONTROLLER_r = CONTROLLER_WIDTH/9.7;
const CONTROLLER_R = CONTROLLER_WIDTH/2 - CONTROLLER_r;
const ANSWERS = ["C", "G", "D", "A", "E", "B", "F#", "C#", "G#", "D#", "A#", "F"];
const notes = ["a", "b", ]


let minded_note = ANSWERS[Math.floor(Math.random()*12)];
let answer = "";

function get_coords(){

  let coords = [];
  let angle = Math.PI/6;
  let middle_x = CONTROLLER_WIDTH/2;
  let middle_y = CONTROLLER_WIDTH/2;

  for( let i=0; i<12; i++){
    coords.push({
      x: Math.cos(angle*(i - 3)) * CONTROLLER_R + middle_x, 
      y: Math.sin(angle*(i - 3)) * CONTROLLER_R + middle_y})
  }
  return coords
}

function set_answer( answ ){
  answer =ANSWERS[answ]
}

function draw_circles(){
  return get_coords().map(
    (e,i)=>{
      return (<circle 
      cx={e.x} 
      cy={e.y} 
      r={CONTROLLER_r -1}
      fill="transparent"
      stroke="black"
      key={i}
      onMouseEnter={()=>set_answer(i)}
      style={{"cursor": "pointer", "fill": CIRCLES_COLOR}}
    ></circle>)})
}

function draw_text(){
  let coords = get_coords();
  return ANSWERS.map((note, i)=><text 
                                  x={coords[i].x} 
                                  y={coords[i].y} 
                                  textAnchor="middle"
                                  dominantBaseline="middle"
                                  style={{'cursor': "pointer"}}
                                  >{note}</text>)
}

function next_if_right_answer(){
  if(answer === minded_note){
    minded_note = notes[Math.floor(Math.random()*notes.length)].toUpperCase()
  }
  else {
    console.log('wrong')
  }
  return minded_note
}

function draw_center(){
  return <circle
          cx={CONTROLLER_WIDTH/2}
          cy={CONTROLLER_WIDTH/2}
          r={CONTROLLER_R/2}
          onMouseEnter={()=>next_if_right_answer()}
         ></circle>
};



function App() {
  return (
    <div className="App">
      <Display notation={answer || "C"}></Display>
      <svg id="controller" width={CONTROLLER_WIDTH} height={CONTROLLER_WIDTH}>
        {draw_circles()}
        {draw_text()}
        {draw_center()}
      </svg>
    </div>
  )
}

export default App;
