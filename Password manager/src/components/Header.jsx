import React from 'react'

function Header() {
  return (
    <div className='Navbar w-full'>
        <nav className='bg-slate-800 text-white p-3'>
            <div className="nav-content flex items-center justify-between px-[15%]">
                <div className="logo font-bold text-lg">
                    <span className='text-green-500'>&lt;</span>
                    <span>Pass</span>
                    <span className='text-green-500'>OP/&gt;</span>
                </div>
                <div className="button font-bold">
                    <button className='flex items-center gap-1 border-2 rounded-full bg-green-600'>
                        <img src="imgs/github.svg" alt="github_logo" className='invert' />
                        <span className='mx-1'>GitHub</span>
                    </button>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Header
