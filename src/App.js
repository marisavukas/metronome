import './App.css';
import React, { useState } from "react";
import * as Tone from "tone";
import { setContext } from 'tone';

let isBeepLoaded = false;
let isMetronomeRunning = false;
let beat = 0;



const startMetronome = async () => {
  if (!isBeepLoaded) {
    await Tone.context.resume();
    const hiTone = new Tone.Oscillator(540).toDestination();
    const loTone = new Tone.Oscillator(440).toDestination();

    await Tone.loaded();
    console.log("beep is loaded");  
    

    let beatsPerMeasure = 4;
      Tone.Transport.scheduleRepeat(time => {
        if (beat === beatsPerMeasure) {
          beat = 0;
        }
        if (beat === 0) {
          hiTone.start(time).stop(time + 0.1);
          console.log("hi beep plays");
          console.log(beat);         
        } else {
          loTone.start(time).stop(time + 0.1);
          console.log("lo beep plays");
          console.log(beat);
        }
      beat++;
  
        }, "4n");
      
    }
    isBeepLoaded = true;


console.log("starting metronome");
  Tone.Transport.start();
}

const stopMetronome = async () => {
  console.log("stopping metronome");
  Tone.Transport.stop();
  beat = 0;
}

const ToggleButton = ({ onClick, isRunning }) => {
    const text = isRunning ? <div className ="stop_button"></div> : <div className ="start_button"></div>;
    return <button onClick={onClick}>{text}</button>;
  
 
};



function App() {
  const [bpm, setBpm] = useState(100);
  const [on, setOn] = useState(false);

  Tone.Transport.bpm.value = bpm;

  const handleToggle = () => {
    if (on) {
      stopMetronome();
    } else {
      startMetronome();
    }
    setOn(!on);
  };

  function minus_one() {
    if (bpm <=40) {
      setBpm(40);
    }
    else {
      setBpm(bpm-1);
    }
  }

  function minus_five() {
    if (bpm < 45) {
      setBpm(40);
    }
    else {
      setBpm(bpm-5);
    }
  }

  function add_one() {
    if (bpm >=217) {
      setBpm(218);
    }
    else {
      setBpm(bpm+1);
    }
  }

  function add_five() {
    if (bpm >=213) {
      setBpm(218);
    }
    else {
      setBpm(bpm+5);
    }
  }


 

  return (

    <div className = "App">
   
      <h1 className="metronome_header">Online Free Metronome</h1>
      <div>
        <ToggleButton onClick={handleToggle} isRunning={on} />
      </div>

    <div className="boxes"> 
      <div className = "box_1"> </div>
      <div className = "box_2"> </div>
      <div className = "box_3"> </div>
      <div className = "box_4"> </div>
    </div>
  


    <div className='speed_buttons'> 
    <div className= 'minus_buttons'> 
      <input 
        type="button"
        value = {"-5"}
        onClick = {minus_five}
        class= "minus_five"
      />

      <input 
      type="button"
      value = {"-"}
      onClick = {minus_one}
      class= "minus_one"
      />
  </div>

{/* when user click +1 and +5 buttons, bpm is increased by 1 and 5, respectively  */}
    <div className= 'plus_buttons'> 
    
        <input 
          type="button"
          value = {"+"}
          onClick = {add_one}
          class= "plus_one"
        />
       
        <input 
          type="button"
          value={"+5"}
          onClick = {add_five}
          class= "plus_five"
        />
    </div>

  </div> 
  <h2>{bpm} bpm</h2>


{/* when user click and drags slider, bpm is set to new bpm defined by slider */}

<input 
   onChange = {(e) => setBpm(parseInt(e.target.value))} 
   type="range" 
   min="40" 
   max="218" 
   class="slider"
   defaultValue={100}
   value = {bpm}
   id="myRange"/>

   
  

<output 

   name ="result" 
   for="slider" 
   id="result"> 



   </output> 

      <div id="wrapper">

      </div>
    </div>

  );
}

document.querySelector('button')?.addEventListener('click', async () => {
  await Tone.start();
  console.log('audio is ready');

})




export default App;
