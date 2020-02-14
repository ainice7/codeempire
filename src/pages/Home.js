import React, {useState, useContext} from 'react';
import {Questions} from '../data/QuestionState';
import { Question } from '../components/Question';
import { Button, Modal } from 'antd';

export const Home = ( props ) => {

  const {answers, answersChange, questions} = useContext(Questions);

  const [visible, setVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let isEmpty = [];
    for(let key in answers) {
      if(!answers[key]) {
        isEmpty.push(key);
      }
    }
    if(isEmpty.length > 0) {
      setVisible(true)
    } else {
      props.history.push('/result')
    }
  }

  const handleOk = () => {
    props.history.push('/result')
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        {questions.map((item, index) => <Question questionObj={item} handleChange={answersChange} key={index} />)}
        <Button htmlType="submit">Подтвердить</Button>
      </form>
      <Modal
        title="Подтвердите действие"
        visible={visible}
        onOk={handleOk}
        onCancel={() => setVisible(false)}
      >
        <p>Каждый не отвеченный ответ считается
          неправильным, Вы уверены что хотите продолжить?
        </p>
      </Modal>
    </main>
  )
}