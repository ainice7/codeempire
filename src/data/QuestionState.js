import React, {createContext, useState, useEffect, useRef} from 'react';
import {questions} from './questions';

export const Questions = createContext();

export const QuestionState = ({children}) => {

  const defValues = {
    secondActor: [],
    visual: '',
    animatedFilm: '',
    adaptedScript: '',
    secondActress: '',
    director: '',
    actress: '',
    actor: '',
    bestMovie: ''
  };

  const [answers, setAnswer] = useState({...defValues});
  const [loading, setLoading] = useState(true);
  let correctAnswers = useRef({});

  
  useEffect(() => {
    function getAnswers() {
      fetch('http://localhost:3000/answers/')
        .then(res => res.json())
        .then(data => correctAnswers.current = {...data})
        .then(setLoading(false))
    }
    getAnswers();
  }, []); 

  const answersChange = (key, value) => {
    setAnswer({
      ...answers,
      [key]: value
    });
  }
  
  return (
    <Questions.Provider value={{
      answers,
      answersChange,
      questions,
      correctAnswers: correctAnswers.current,
      loading
    }}>{children}</Questions.Provider>
  )
}