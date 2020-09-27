import abcjs from 'abcjs';
import React from 'react';


const CONTROLLER_WIDTH = 200;
const CIRCLES_COLOR = "azure";
const CONTROLLER_r = CONTROLLER_WIDTH/9.7;
const CONTROLLER_R = CONTROLLER_WIDTH/2 - CONTROLLER_r;
const LABLES = ["C", "G", "D", "A", "E", "B", "F#", "C#", "G#", "D#", "A#", "F"];
const abc_notes = {
  "C": ["C,", "C", "c", "c'"],
  "C#": ["^C,", "^C", "^c", "^c'", "_D,", "_D", "_d", "_d'"],
  "D": ["D,", "D", "d", "d'"],
  "D#": ["^D,", "^D", "^d", "^d'", "_E,", "_E", "_e", "_e'"],
  "E": ["E,", "E", "e", "e'"],
  "F": ["F,", "F", "f", "f'"],
  "F#": ["^F,", "^F", "^f", "^f'", "_G,", "_G", "_g", "_g'"],
  "G": ["G,", "G", "g", "g'"],
  "G#": ["^G,", "^G", "^g", "^g'", "_A,", "_A", "_a", "_a'"],
  "A": ["A,", "A", "a", "a'"],
  "A#": ["^A,", "^A", "^a", "^a'", "_B,", "_B", "_b", "_b'"],
  "B": ["B,", "B", "b", "b,"],
}

let minded_lable = ""
let answer = "";

let get_random_abc_note = ()=>{
  let keys = Object.keys(abc_notes)
  let random_key = keys[Math.floor(Math.random()*keys.length)]
  minded_lable = random_key 
  let notes = abc_notes[random_key]
  let note = notes[Math.floor(Math.random()*notes.length)]
  return note
}
let minded_note = get_random_abc_note();

let convert_abc_notation_in_label = (notation) =>{
  let sharp = notation[0]=="^" ? "#": ""
  return notation[1].toUpperCase() + sharp
}


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
  answer = LABLES[answ]
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
  return LABLES.map((note, i)=><text 
                                  x={coords[i].x} 
                                  y={coords[i].y} 
                                  textAnchor="middle"
                                  dominantBaseline="middle"
                                  style={{'cursor': "pointer"}}
                                  >{note}</text>)
}

function next_if_right_answer(){
  display_notation(minded_note)

  if(minded_lable === answer){
    minded_note = get_random_abc_note()
    display_notation(minded_note)
  }
}

function draw_center(){
  return <circle
          cx={CONTROLLER_WIDTH/2}
          cy={CONTROLLER_WIDTH/2}
          r={CONTROLLER_R/2}
          onMouseEnter={()=>next_if_right_answer() }
         ></circle>
};

function display_notation(notation){
  abcjs.renderAbc('display', notation)
}


function App() {
  return (
    <div className="App">
      <div id="display"></div>
      <svg id="controller" width={CONTROLLER_WIDTH} height={CONTROLLER_WIDTH}>
        {draw_circles()}
        {draw_text()}
        {draw_center()}
      </svg>
    </div>
  )
}

export default App;
