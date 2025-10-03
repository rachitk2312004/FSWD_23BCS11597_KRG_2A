import {useState} from "react";

export default function App(){
  const [count,setCount]=useState(0);

  const inc=()=>{
    if(count<10){
      setCount(count+1);
    }
  }

  const dec=()=>{
    if(count>0){
      setCount(count-1);
    }
  }

  const reset=()=>{
    setCount(0);
  }

  // Full screen styles for outer div
  const outerStyle={
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    height:"100vh",
    width:"100vw",
    fontFamily:"Arial,sans-serif",
    margin:0,
    padding:0,
    boxSizing:"border-box"
  };

  const innerStyle={textAlign:"center"};

  return(
    <div style={outerStyle}>
      <div style={innerStyle}>
        <h1 style={{fontSize:"2rem",marginBottom:"20px"}}>Counter: {count}</h1>

        {count===10&&<p style={{color:"red",marginBottom:"20px"}}>Maximum limit reached</p>}
        {count===0&&<p style={{color:"orange",marginBottom:"20px"}}>Minimum limit reached</p>}

        <div style={{display:"flex",justifyContent:"center",gap:"10px"}}>
          <button
            onClick={dec}
            disabled={count===0}
            style={{
              padding:"10px 20px",
              borderRadius:"8px",
              border:"none",
              color:"white",
            }}
          >-</button>

          <button
            onClick={inc}
            disabled={count===10}
            style={{
              padding:"10px 20px",
              borderRadius:"8px",
              border:"none",
              color:"white",
            }}
          >+</button>

          <button
            onClick={reset}
            style={{
              padding:"10px 20px",
              borderRadius:"8px",
              border:"none",
              backgroundColor:"red",
              color:"white",
              cursor:"pointer"
            }}
          >Reset</button>
        </div>
      </div>
    </div>
  );
}
