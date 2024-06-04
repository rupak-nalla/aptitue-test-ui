'use client'
import CountdownTimer from "../app/components/countdown"
import questions from "../app/data/questions"
import { useState } from 'react';

export default function Home() {

  
  const qs  = questions;

  let [i,setI]=useState(1);
  
  const [ 
      selectedValue, 
      setSelectedValue, 
  ] = useState(null); 

  const handleRadioChange = ( 
      value 
  ) => { 
      setSelectedValue(value); 
  }; 

  let newDict={}
  for (let j=1;j<=Object.keys(qs).length;j++){
    newDict[j]={
      "QNo":j,
      "attempted":false,
      "seen":false,
      "markedForReview":false,
      "response":null
    }
  }
  const [responses,setData]=useState(newDict)
  function handleNext() {
    const opSelected=selectedValue;
    setSelectedValue(null);
    if (opSelected) {
      responses[i].attempted=true;
      responses[i].response=opSelected;
    }
    if (i==Object.keys(qs).length) {
      setI(1);
      responses[i].seen=true;
    }
    else{
      setI(i+1)
      responses[i].seen=true;
    }
    console.log(responses);
  }
  function handlePrev() {
    const opSelected=selectedValue;
    setSelectedValue(null);
    if (i==1) {
      setI(Object.keys(qs).length);
      responses[i].seen=true;
    } else {
      setI(i-1);
      responses[i].seen=true;
    }
    console.log(i);
  }
  function handleMarkAndNext() {
    const opSelected=selectedValue;
    setSelectedValue(null);
    responses[i].markedForReview=true;
    if (opSelected) {
      responses[i].attempted=true;
      responses[i].response=opSelected;
    }
    if (i==Object.keys(qs).length) {
      setI(1);
      responses[i].seen=true;
    }
    else{
      setI(i+1)
      responses[i].seen=true;
    }
    console.log(responses);
  }
  function handleJumpQuestion(Qno) {
    setI(Qno);
    responses[i].seen=true;
    console.log(responses);
  }
  function handleSubmit() {
    
  }
  function handleCountdownComplete() {
    
  }

  return (
    <main>
      <nav class="bg-gray-800 py-4 p-4">
        <div class="container mx-auto flex justify-between items-center">
          <a href="#" class="text-white font-bold text-2xl">AVINYA 2K24: Aptitude Test</a>
          <div>
            <CountdownTimer onCountdownComplete={handleCountdownComplete}/>
          </div>
        </div>
      </nav>
        <div class="flex flex-col md:flex-row h-screen">
          <div class="w-full md:w-3/4 bg-gray-200 p-8">
            {/* <!-- Content for the first column --> */}
            <div class="min-h-screen flex flex-col" id="qp">
              <div class="h-[90%] bg-gray-200 p-8">
                <h2 class="text-2xl font-bold mb-4">Question</h2>
                <h4 class=" mb-4">{qs[i].Question}</h4>
                <div class="flex flex-col space-y-4">
                  {/* options */}
                  {Object.keys(qs[i].Options).map((optionKey) => (
                    
                    // <div class="flex items-center">
                    //   <input key={`${qs.Q1}-${optionKey}`} type="radio" id="option1" name="options" value="option1" class="h-4 w-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    //   <label for={qs[i].Options[optionKey]} class="ml-2 text-sm font-medium ">{qs[i].Options[optionKey]}</label>
                    // </div>

                  <div class="flex items-center">
                    <input 
                      key={`${qs.Q1}-${optionKey}`}
                      type="radio"
                      class="h-4 w-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      id="option1"
                      value= {qs[i].Options[optionKey]}
                      checked={ 
                          selectedValue === qs[i].Options[optionKey] || responses[i].response === qs[i].Options[optionKey]
                      } 
                      onChange={() => 
                          handleRadioChange( 
                            qs[i].Options[optionKey]
                          ) 
                    } /> 
                    <label htmlFor={qs[i].Options[optionKey]} class="ml-2 text-sm font-medium "> 
                    {qs[i].Options[optionKey]}
                    </label>
                  </div>

                  ))}
                  
                </div>
              </div>
              
              <div class="h-[10%]  p-4">
                <div class="row space-y-4">
                  <button class="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded m-1" onClick={handlePrev}>Previous</button>
                  <button class="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded m-1" onClick={handleMarkAndNext}>Mark For Review & Next</button>
                  <button class="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded m-1" onClick={handleNext}>Next</button>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/4 bg-gray-300 p-8 hidden md:block">
            {/* <!-- Content for the second column --> */}
            <h2 class="text-2xl font-bold mb-4 text-center">Questions</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {Array.from({ length: Object.keys(qs).length }, (_, index) => index + 1).map((number) => (
                (number == i) ? (
                  <button key={number} onClick={()=>{handleJumpQuestion(number)}} class="bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded">
                    {number}
                  </button>
                ): (
                  <button key={number} onClick={()=>{handleJumpQuestion(number)}} className=
                  {` text-white font-bold py-2 px-4 rounded ${
                    responses[number].markedForReview===true && responses[number].attempted===false
                      ?'bg-violet-500 hover:bg-violet-700'
                      :responses[number].seen === true && responses[number].attempted === false
                      ? 'bg-red-400 hover:bg-red-700'
                      : responses[number].seen === true && responses[number].attempted === true
                      ? 'bg-lime-500 hover:bg-lime-700'
                      : 'bg-slate-500 hover:bg-slate-700'
                  }`}
                  >
                    {number}
                  </button>
                )
                
              ))}
              
            </div>
            <div class="flex justify-center m-10">
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto" onClick={handleSubmit}>
                SUBMIT
              </button>
            </div>

          </div>
        </div>
    </main>
  );
}
