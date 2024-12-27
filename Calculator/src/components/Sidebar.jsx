import React from 'react'
import { NavLink } from 'react-router-dom'

function Sidebar() {

    const displayOff = () => {
        const sidebar = document.getElementById('s-1')
        const hamburger = document.getElementById('hamburger')

        sidebar.style.display = 'none'
        hamburger.style.display = 'block'
    }

    const handleStyle = ({ isActive }) => {
        return {
            backgroundColor: isActive ? '#2563EB' : '#4B5563'
        }
    }

    return (
        <div id='s-1' className='sidebar'>
            <div className="heading p-3 mt-4  h-[10%] flex items-center gap-5 text-2xl">
                <h1 className='text-center'>Calculated</h1>
                <i id='cancel' onClick={displayOff} className="fa-solid text-lg fa-xmark lg:hidden"></i>
            </div>
            <div className="functions p-3 w-3/4 h-[90%]">
                <div className="sub-heading text-center text-sm">
                    <h3>Select your calculator</h3>
                </div>
                <div className="NavLink w-full  my-1 h-[90%] flex flex-wrap gap-5 items-center justify-center">
                    <NavLink to="/" style={handleStyle} className="numbers flex justify-center items-center w-[35%] bg-slate-800 h-[15%] hover:bg-blue-500">
                        <i className="fa-solid text-lg fa-1"></i>
                        <i className="fa-solid text-lg fa-2"></i>
                        <i className="fa-solid text-lg fa-3"></i>
                    </NavLink>
                    <NavLink to='/unit' style={handleStyle} className="unit-converter flex justify-center items-center w-[35%] hover:bg-blue-500 h-[15%] bg-slate-800">
                        <i className="fa-solid text-lg fa-chart-simple"></i>
                    </NavLink>
                    <NavLink to='/currency' style={handleStyle} className="currency flex justify-center items-center w-[35%] hover:bg-blue-500 h-[15%] bg-slate-800">
                        <i className="fa-solid text-lg fa-dollar-sign"></i>
                    </NavLink>
                    <NavLink to='/land' style={handleStyle} className="home flex justify-center items-center w-[35%] hover:bg-blue-500 h-[15%] bg-slate-800">
                        <i className="fa-solid text-lg fa-house"></i>
                    </NavLink>
                    <NavLink to='/temp' style={handleStyle} className="tempreture flex justify-center items-center w-[35%] hover:bg-blue-500 h-[15%] bg-slate-800">
                        <i className="fa-solid text-lg fa-temperature-three-quarters"></i>
                    </NavLink>
                    <NavLink to='/graph' style={handleStyle} className="graph flex justify-center items-center w-[35%] hover:bg-blue-500 h-[15%] bg-slate-800">
                        <i className="fa-solid text-lg fa-chart-line"></i>
                    </NavLink>
                    <NavLink style={handleStyle} to='/history' className="watch flex justify-center items-center w-[35%] hover:bg-blue-500 h-[15%] bg-slate-800">
                        <i className="fa-solid text-lg fa-clock"></i>
                    </NavLink>
                    <NavLink to='/database' style={handleStyle} className="database flex justify-center items-center w-[35%] hover:bg-blue-500 h-[15%] bg-slate-800">
                        <i className="fa-solid text-lg fa-database"></i>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
