// import './App.css'
import { useState, useRef } from "react";
import { Operations } from "./utils/Operations";

function App() {
  const [sum, setSum] = useState(0);
  const [tempSum, setTempSum] = useState(null);
  const [shouldClearSum, setShouldClearSum] = useState(false);
  const [isOperating, setIsOperating] = useState(false);
  const [operationType, setOperationType] = useState(null);

  const sumElement = useRef();

  const numberPress = (e) => {
    const value = e.target.dataset.value;

    if(isOperating) {
      if(shouldClearSum) { 
        setSum(0);
        setShouldClearSum(false);
      }
      setSum(prev => parseFloat(`${prev}${value}`));
      return;
    }

    if(sum == 0) {
      setSum(value);
    }
    else {
      setSum(prev => parseFloat(`${prev}${value}`));
    }

    sumElement.current.scrollLeft = sumElement.current.clientWidth;
  }
  
  const resetPress = () => {
    setSum(0);
    setIsOperating(false);
  }

  const operationPress = (e) => {
    const value = e.target.dataset.value;
    setOperationType(value);
    setIsOperating(true);
    setShouldClearSum(true);

    setTempSum(sum);
  }

  const reverseSign = () => {
    setSum(prev => prev*-1);
  }

  const processValue = () => {
    if(!isOperating) {
      return;
    }

    switch(operationType) {
      case '+':
        setSum(prev => Operations.add(tempSum, prev));
        break;
      case '-':
        setSum(prev => Operations.minus(tempSum, prev));
        break;
      case 'X':
        setSum(prev => Operations.multiply(tempSum, prev));
        break;
      case '÷':
        setSum(prev => Operations.division(tempSum, prev));
        break;
      case '%':
        setSum(prev => Operations.modulus(tempSum, prev));
        break;
    }

    setOperationType(null);
    setIsOperating(false);
    setTempSum(null);

    sumElement.current.scrollLeft = -sumElement.current.clientWidth;
  }

  const addDot = () => {
    setSum(prev => prev + '.');
  }

  return (
    <div className="App">
      <div className="flex justify-center items-center h-screen bg-slate-500">
        <div className="max-w-5xl mx-6 md:mx-auto bg-gray-200 py-6 px-8 rounded-3xl shadow-2xl overflow-x-hidden">
          <h1 className="text-4xl md:text-5xl font-bold font-mono mb-4 text-center">Calculator</h1>
          <div className="relative"> 
            <img 
              src="https://images.unsplash.com/photo-1614850715649-1d0106293bd1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              className="w-96 h-16 object-fit rounded-md opacity-60"
              />
            <p ref={sumElement} className="absolute top-1/2 right-0 left-0 p-5 -translate-y-1/2 text-5xl text-slate-800 text-end font-bold overflow-x-scroll overflow-y-hidden scrollbar-hide">{sum}</p>
            </div>
            <div className="grid grid-cols-4 text-center align-center my-4 gap-x-4 gap-y-4 md:gap-x-6 md:gap-y-4">
              <div className="cal-btn" onClick={resetPress} data-value="AC">AC</div>
              <div className="cal-btn" onClick={reverseSign} data-value="+/-">+/-</div>
              <div className="cal-btn" onClick={operationPress} data-value="%">%</div>
              <div className="cal-btn" onClick={operationPress} data-value="÷">÷</div>
              <div className="cal-btn" onClick={numberPress} data-value="7">7</div>
              <div className="cal-btn" onClick={numberPress} data-value="8">8</div>
              <div className="cal-btn" onClick={numberPress} data-value="9">9</div>
              <div className="cal-btn" onClick={operationPress} data-value="X">X</div>
              <div className="cal-btn" onClick={numberPress} data-value="4">4</div>
              <div className="cal-btn" onClick={numberPress} data-value="5">5</div>
              <div className="cal-btn" onClick={numberPress} data-value="6">6</div>
              <div className="cal-btn" onClick={operationPress} data-value="-">-</div>
              <div className="cal-btn" onClick={numberPress} data-value="1">1</div>
              <div className="cal-btn" onClick={numberPress} data-value="2">2</div>
              <div className="cal-btn" onClick={numberPress} data-value="3">3</div>
              <div className="cal-btn" onClick={operationPress} data-value="+">+</div>
              <div className="cal-btn cal-btn-2" onClick={numberPress} data-value="0">0</div>
              <div className="cal-btn" onClick={addDot} data-value=".">.</div>
              <div className="cal-btn" onClick={processValue} data-value="=">=</div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default App
