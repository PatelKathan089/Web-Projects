import React, { useEffect, useState } from 'react'

function Histroy() {

    const [history, setHistory] = useState([])

    useEffect(() => {
        const getHistory = async () => {
            try {
                const res = await fetch('http://localhost:3000')
                const data = await res.json()
                setHistory(data)
            } catch (error) {
                console.log(error)
            }
        }
        getHistory()
    }, [])

    console.log(history)

    const displayOn = () => {
        const sidebar = document.getElementById('s-1')
        const hamburger = document.getElementById('hamburger')

        sidebar.style.display = 'flex'
        hamburger.style.display = 'none'
    }

    return (
        <>
            <div className='mainbar'>
                <i id='hamburger' onClick={displayOn} className="fa-solid fa-bars self-start text-xl cursor-pointer lg:hidden"></i>
                <div className='border-2 w-[90%] border-slate-600 rounded-lg mt-4 overflow-y-auto'>
                    <table className='w-full flex flex-col'>
                        <thead>
                            <tr className='w-full flex justify-between items-center px-4 py-1'>
                                <th>Sr No.</th>
                                <th>Calculations</th>
                                <th>Date</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((item) => {
                                const srNo = history.indexOf(item) + 1
                                return (
                                    <tr key={item.id} className='w-full flex justify-between items-center px-4 py-1'>
                                        <td className='ml-3'>{srNo}</td>
                                        <td className='ml-16'>{item.expression}</td>
                                        <td className='ml-6'>{item.day}</td>
                                        <td>{item.time}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Histroy

