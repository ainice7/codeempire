import React, {useContext, useEffect, useRef} from 'react';
import {Questions} from '../data/QuestionState';
import { Spin, Icon } from 'antd';

export const Result = (props) => {
  const {answers, questions, correctAnswers, loading} = useContext(Questions);
  let history = useRef(props.history);

  useEffect(() => {
    if(history.current.action !== "PUSH") {
      history.current.push('/');
    }
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, [correctAnswers]); 

  const finder = (item, comparison) => {
    if(item.type === 'checkbox') {
      if(comparison[item.field] !== undefined) {
        return comparison[item.field].map(el => item.answers[el]).join(', ')
      }
    } else if(item.type !== 'input') {
      return item.answers[comparison[item.field]]
    } else {
      return comparison[item.field]
    }
  }

  const total = () => {
    let counter = 0;
    function arraysEqual(a, b) {
      if (a === b) return true;
      if (a === null || b === null) return false;
      if(a === undefined || b === undefined) return false; 
      if (a.length !== b.length) return false;
    
      a = a.sort((c, d) => c - d);
    
      for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
      }
      return true;
    }

    function compare() {
      for(let key in answers) {
        if(!Array.isArray(answers[key])) {
          if(answers[key] === correctAnswers[key]) {
            counter++
          }
        } else {
          if(arraysEqual(answers[key], correctAnswers[key])) {
            counter++
          }
        }
      }
      return counter
    }
    return compare();
  }

  const antIcon = <Icon type="loading" style={{ fontSize: 48 }} spin />;

  return (
    <main>
      {
        loading 
        ? <Spin indicator={antIcon} /> 
        : Object.keys(correctAnswers).length !== 0 
          ? <div className="results">
              <h2>Ваш результат: {total()}/9</h2>
              <p>Правильные ответы:</p>
              {questions.map((item, i) => {
                return(
                  <div className="question-container" key={i}>
                    <h2>{item.question}</h2>
                    <p>Вы выбрали: <span className="capitalized">{finder(item, answers)}</span></p>
                    <p>Правильным ответом был: <span className="capitalized">{finder(item, correctAnswers)}</span></p>
                  </div>
                )
              })}
            </div>
          : <div className="results">
              <h2>Вы ничего не выбрали</h2>
            </div>
      }
    </main>
  )
}