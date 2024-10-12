import React from 'react'

function Sidebar() {

    const displayOff = () => {

        const sidebar = document.getElementById('s-1')
        const hamburger = document.getElementById('hamburger')

        sidebar.style.display = 'none'
        hamburger.style.display = 'block'
    }

    return (
        <div id='s-1' className='sidebar'>
            <div className="heading p-3 mt-4  h-[10%] flex items-center gap-5 text-2xl">
                <h1 className='text-center'>Calculated</h1>
                <i id='cancel' onClick={displayOff} className="fa-solid fa-xmark lg:hidden"></i>
            </div>
            <div className="functions p-3 w-3/4 h-[90%]">
                <div className="sub-heading text-center text-sm">
                    <h3>Select your calculator</h3>
                </div>
                <div className="buttons w-full  my-1 h-[90%] flex flex-wrap gap-5 items-center justify-center">
                    <button className="numbers w-2/5 bg-blue-500 h-1/6">
                        <i className="fa-solid fa-1"></i>
                        <i className="fa-solid fa-2"></i>
                        <i className="fa-solid fa-3"></i>
                    </button>
                    <button className="unit-converter w-2/5 hover:bg-blue-500 h-1/6 bg-slate-800">
                        <i className="fa-solid fa-chart-simple"></i>
                    </button>
                    <button className="currency w-2/5 hover:bg-blue-500 h-1/6 bg-slate-800">
                        <i className="fa-solid fa-dollar-sign"></i>
                    </button>
                    <button className="home w-2/5 hover:bg-blue-500 h-1/6 bg-slate-800">
                        <i className="fa-solid fa-house"></i>
                    </button>
                    <button className="tempreture w-2/5 hover:bg-blue-500 h-1/6 bg-slate-800">
                        <i className="fa-solid fa-temperature-three-quarters"></i>
                    </button>
                    <button className="graph w-2/5 hover:bg-blue-500 h-1/6 bg-slate-800">
                        <i className="fa-solid fa-chart-line"></i>
                    </button>
                    <button className="watch w-2/5 hover:bg-blue-500 h-1/6 bg-slate-800">
                        <i className="fa-solid fa-clock"></i>
                    </button>
                    <button className="database w-2/5 hover:bg-blue-500 h-1/6 bg-slate-800">
                        <i className="fa-solid fa-database"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
