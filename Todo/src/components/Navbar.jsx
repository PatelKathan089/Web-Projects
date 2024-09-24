import React from 'react'

function Navbar() {
    return (
        <div className='navbar flex bg-indigo-950 text-white justify-around py-2 sticky top-0'>
            <div className="logo">
                <p className='cursor-pointer hover:font-bold transition-all'>iTask</p>
            </div>
            <div className="nav-items">
                <ul className='flex gap-4'>
                    <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
                    <li className='cursor-pointer hover:font-bold transition-all'>Your Tasks</li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar
