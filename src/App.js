import './App.css';
import React, { useState } from "react";
import * as Tone from "tone";
import { setContext } from 'tone';
import { start } from 'tone';

let isBeepLoaded = false;
let beat = 0;

// function that runs the metronome with the same click tone on every beat 
const startMetronome = async () => {
  if (!isBeepLoaded) {
    await Tone.context.resume();
    const loTone = new Tone.Oscillator(440).toDestination();

    await Tone.loaded();
    console.log("beep is loaded");  
    

    let beatsPerMeasure = 4;

    
      Tone.Transport.scheduleRepeat(time => {
          loTone.start(time).stop(time + 0.1);
          console.log("lo beep plays");
          console.log(beat);
        
  
        }, "4n");
  }
      
    
    isBeepLoaded = true;


console.log("starting metronome");
  Tone.Transport.start();
}


// function that runs the metronome with a higher click on the first note
const startAccentuatedMetronome = async () => {
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

console.log("starting accentuated metronome");
  Tone.Transport.start();
}

const stopMetronome = async () => {
  console.log("stopping normal  metronome");
  Tone.Transport.stop();
  beat = 0;
}

const stopAccentuatedMetronome = async () => {
  console.log("stopping accentuated metronome");
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
  const [accentuate,setAccentuate] = useState(false);
  

  Tone.Transport.bpm.value = bpm;

// this part is what im having issues with   
  const handleAccentuatedClickToggle= () => {
    if (accentuate) {
      console.log("accentuate off");

    } 
    if (!accentuate) {
      console.log("accentuate on");
      

    }
    setAccentuate(!accentuate);

  
  }


  const handleToggle = () => {
    if (on) {
      stopMetronome();
    }

    else {
      if (!on) {      
        if(accentuate){startMetronome();}

      }
      if (!on) {
        if(!accentuate){startAccentuatedMetronome();}


      };
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
      </div>
      <div>
        <ToggleButton onClick={handleToggle} isRunning={on} />
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

{/* toggle switch to turn off/on accentuated first click */}
<div className='accentuate_click_section'>
<div className="accentuate_click_text">Accentuate first click</div>
<label class = "switch"> 
  <input 
  type = "checkbox"
  // on click handles whether or not first click will be accentuated
  onClick={handleAccentuatedClickToggle} isAccentuated= {accentuate}
  
    
  />     
  
  <span id="slider"></span>
</label>     
  </div>


    </div>

  );
}


document.querySelector('button')?.addEventListener('click', async () => {
  await Tone.start();
  console.log('audio is ready');

})




export default App;
