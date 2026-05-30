import React, { useState } from 'react'

function Card() {
    let  [counter, setCounter] = useState(0)
    // let counter = 15
    let addValue = ()=>{
        // console.log("value added", Math.random());
        console.log("click", counter);
        // setCounter(counter+1)
        if(counter < 20){
            setCounter(counter + 1)
        }
    }
    // let removevalue = () => {
        // setCounter(counter - 1)  
        
    let removevalue = () =>{
        if(counter > 0){
            setCounter(counter - 1)
        } 
            
        }
        
        
        return (
            <>
    <h2>Counter value{counter}</h2>
      <button onClick={addValue}>+</button><br />
        <button onClick={removevalue}>-</button>

      <div>
        <h1>footer {counter}</h1>
      </div>
    </>
  );
}


export default Card;
