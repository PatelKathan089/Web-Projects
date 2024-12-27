import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

function Mainbar() {

  const [number, setnumber] = useState('')

  const handleChange = (e) => {
    setnumber(e.target.value)
  }

  const displayOn = () => {
    const sidebar = document.getElementById('s-1')
    const hamburger = document.getElementById('hamburger')

    sidebar.style.display = 'flex'
    hamburger.style.display = 'none'
  }

  const changeSign = () => {
    (number == Math.abs(number)) ? setnumber((-1 * number)) : setnumber(Math.abs(number))
  }

  const handleCalculations = () => {

    try {
      const result = eval(number) // eval() will follow bodmas rule.
      const expression = number + '=' + result
      const date = new Date()
      const day = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()
      const time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()

      fetch('http://localhost:3000', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: uuidv4(), expression: expression, day: day, time: time }) })

      setnumber(result.toString())

    } catch {
      setnumber('Error')
    }
  }

  return (
    <div className='mainbar'>
      <i id='hamburger' onClick={displayOn} className="fa-solid fa-bars self-start text-xl cursor-pointer lg:hidden"></i>
      <div className="screen w-[80%] border-2 border-slate-600 rounded-lg mt-16">
        <input onChange={handleChange} type="text" value={number} placeholder='0' className='w-full p-4 text-xl text-right bg-slate-800 rounded-lg ' />
      </div>
      <div className="calc_functions w-3/4 h-3/5 mt-6 sm:mt-10  sm:w-[50%] sm:h-[65%] grid grid-cols-4 grid-rows-5 gap-2">
        <button onClick={() => { setnumber("") }} className='calc-btn'>AC</button>
        <button onClick={changeSign} className='calc-btn'>[+/-]</button>
        <button onClick={() => { setnumber(number + "%") }} className='calc-btn'>%</button>
        <button onClick={() => { setnumber(number + "/") }} className='calc-btn'>/</button>
        <button onClick={() => { setnumber(number + 7) }} className='calc-btn'>7</button>
        <button onClick={() => { setnumber(number + 8) }} className='calc-btn'>8</button>
        <button onClick={() => { setnumber(number + 9) }} className='calc-btn'>9</button>
        <button onClick={() => { setnumber(number + "*") }} className='calc-btn'>X</button>
        <button onClick={() => { setnumber(number + 4) }} className='calc-btn'>4</button>
        <button onClick={() => { setnumber(number + 5) }} className='calc-btn'>5</button>
        <button onClick={() => { setnumber(number + 6) }} className='calc-btn'>6</button>
        <button onClick={() => { setnumber(number + "-") }} className='calc-btn'>-</button>
        <button onClick={() => { setnumber(number + 1) }} className='calc-btn'>1</button>
        <button onClick={() => { setnumber(number + 2) }} className='calc-btn'>2</button>
        <button onClick={() => { setnumber(number + 3) }} className='calc-btn'>3</button>
        <button onClick={() => { setnumber(number + "+") }} className='calc-btn'>+</button>
        <button onClick={() => { setnumber(number + 0) }} className='calc-btn col-span-2'>0</button>
        <button onClick={() => { setnumber(number + ".") }} className='calc-btn'>.</button>
        <button onClick={handleCalculations} className='calc-btn'>=</button>
      </div>
    </div>
  )
}

export default Mainbar
