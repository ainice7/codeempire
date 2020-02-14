import React from 'react';
import { Input, Radio, Checkbox, Select } from 'antd';

const { Option } = Select;

export const Question = ({ questionObj, handleChange }) => {

  const { type, question, answers, field } = questionObj;

  const whatType = () => {
    let options = [];
    if(Object.keys(answers).length !== 0) {
      for(let key in answers) {
      let obj = {};
        obj['label'] = answers[key];
        obj['value'] = key;
        options.push(obj); 
      }
    }

    if(type === 'select') {
      return (
        <Select  onChange={(e) => handleChange(field, e)}>
          {options.map((item, index) => <Option value={item.value} key={index}>{item.label}</Option>)}
        </Select>
      )
    } else if(type === 'radio') {
      return <Radio.Group options={options} onChange={(e) => handleChange(field, e.target.value)} />
    } else if(type === 'checkbox') {
      return <Checkbox.Group options={options} onChange={(e) => handleChange(field, e)} />
    } else {
      return <Input placeholder="Введите фильм" onChange={(e) => handleChange(field, e.target.value.trim().toLowerCase())} />
    }
  }

  return (
    <div className="question-container">
      <h2>{ question }</h2>
      { whatType() }
    </div>
  )
  
}