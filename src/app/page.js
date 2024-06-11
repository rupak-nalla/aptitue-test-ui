'use client'
import CountdownTimer from "../app/components/countdown"
import questions from "../app/data/questions"
import Image from 'next/image';
import myImage from '../app/data/logo.jpg';

import { useState } from 'react';

export default function Home() {
  const [isLoading,setLoader]=useState(false);
  const [isExamCompleted,setState]=useState(false);
  const [isExamNotStarted,setExamState]=useState(true);
  const qs  = questions;
  const [score,setScore]=useState(0);
  const [rollNo,setRollNo]=useState("");
  let [i,setI]=useState(1);
  const [CandidateName,setName]=useState('');
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
  async function handleSubmit() {
    setLoader(true);
      let score=0;
      const submitBtn= document.getElementById('submitbtn');
      submitBtn.disabled=true;
      for (let j=1;j<=Object.keys(qs).length;j++){
        if (responses[j].response && responses[j].response===qs[j].answer) {
          score+=1;
        }
        setScore(score);
      }

      console.log("score:",score);
      const options = { timeZone: 'Asia/Kolkata', hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
      const isoDateTime = new Intl.DateTimeFormat('en-IN', options).format(new Date());
      
      console.log(isoDateTime);
      const formData = {
        "time":isoDateTime ,
        "rollNo":rollNo ,
        "CandidateName":CandidateName,
        "score":score,
        "filePath":"AptitudeTest.xlsx"
      };
      
      const b=JSON.stringify(formData)
      console.log(formData)
      const response = await fetch('https://rupaknalla.pythonanywhere.com/api/excel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:b
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setLoader(false);
      setState(true);
      
  }
  function handleCountdownComplete() {
    handleSubmit();
  }
  function getRollNo(e) {
    e.preventDefault();
    setExamState(false);
  }
  return (
    <main>
      {
        isLoading ?(
          <div>
            <nav class="bg-gray-800 py-4 p-4">
              <div class="container mx-auto flex justify-between items-center">
                <a href="#" class="text-white font-bold text-2xl">AVINYA 2K24: Aptitude Test</a>
              </div>
            </nav>
            <div role="status" className="h-screen flex justify-center items-center">
                <svg aria-hidden="true" class="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="sr-only">Loading...</span>
                <h3>Submiting.. please wait...</h3>
            </div>
          </div>
        )
        : isExamNotStarted ?(
          <div>
            <nav class="bg-gray-800 py-4 p-4">
              <div class="container mx-auto flex justify-between items-center">
                <a href="#" class="text-white font-bold text-2xl">AVINYA 2K24: Aptitude Test</a>
                
              </div>
            </nav>
            <div className="h-screen  bg-gray-200 flex justify-center items-center">
              <div className="">
                <div class=" w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                  <div className="flex justify-center items-center">
                    <Image
                            src={myImage}
                            alt="My Image"
                            className="w-24 h-24 mb-3 rounded-full shadow-lg "
                            height={200}
                        />
                  </div>
                  
                    <form class="space-y-6 text-center" onSubmit={getRollNo}>
                        <h5 class="text-xl font-medium text-gray-900 dark:text-white">Login in to Exam</h5>
                        <div>
                            <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter You Roll No</label>
                            <input onChange={(e)=>{setRollNo(e.target.value) }} type="text" name="text" id="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Roll No" required />
                        </div>
                        <div>
                            <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Your Name</label>
                            <input onChange={(e)=>{setName(e.target.value) }} type="text" name="text" id="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Name" required />
                        </div>
                        <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to Exam</button>
                        
                    </form>
                </div>

              </div>
            </div>
            
          </div>
          
        ): isExamCompleted ? (
          <div>
            <nav class="bg-gray-800 py-4 p-4">
              <div class="container mx-auto flex justify-between items-center">
                <a href="#" class="text-white font-bold text-2xl">AVINYA 2K24: Aptitude Test</a>
              </div>
            </nav>
            <div className="flex bg-gray-200 p-8 justify-center items-center h-screen">
              
              <div class=" max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
                  <div className="flex justify-center p-3">
                    <Image
                        src={myImage}
                        alt="My Image"
                        class="w-24 h-24 mb-3 rounded-full shadow-lg"
                        height={200}
                    />
                  </div>
                  
                  <div class="p-5 text-center">
                      <a href="#">
                          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">AVINYA 2K24 : APTITUDE TEST</h5>
                      </a>
                      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Your Score : {score}</p>
                      
                  </div>
              </div>

            </div>
          </div>
          
        )
        :(
          <div>
            <nav class="bg-gray-800 py-4 p-4">
        <div class="container mx-auto flex justify-between items-center">
          <a href="#" class="text-white font-bold text-2xl">AVINYA 2K24: Aptitude Test</a>
          <div className="inline-flex text-white font-bold bg-gray-600 p-2 rounded-md divide-x">
            <h3 className="p-2">{rollNo}</h3>
            
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
                  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto" id="submitbtn" onClick={handleSubmit}>
                    SUBMIT
                  </button>
                </div>

              </div>
            </div>
          </div>
          
        )
      }
      
    </main>
  );
}
