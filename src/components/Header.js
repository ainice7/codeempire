import React from 'react';
import oscar from '../assets/oscar.png'

export const Header = () => {
  return (
    <header>
      <img src={oscar} alt="oscar"/>
      <h1>Насколько хорошо ты смотрел Оскар 2020?</h1>
    </header>
  )
}