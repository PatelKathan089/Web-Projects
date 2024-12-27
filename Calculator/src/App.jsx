import './App.css'
import { Route, Routes } from 'react-router-dom'
import Sidebar from "./components/Sidebar"
import Mainbar from './components/Mainbar'
import Unit from './components/Unit'
import Currency from './components/Currency'
import Land from './components/Land'
import Temp from './components/Temp'
import Graph from './components/Graph'
import History from './components/Histroy'
import Database from './components/Database'

function App() {

  return (
    <>
      <div className='wrapper flex w-screen h-screen mx-auto'>
        <Sidebar />
        <Routes>
          <Route path='/' element={<Mainbar />} />
          <Route path='/unit' element={<Unit />} />
          <Route path='/currency' element={<Currency />} />
          <Route path='/land' element={<Land />} />
          <Route path='/temp' element={<Temp />} />
          <Route path='/graph' element={<Graph />} />
          <Route path='/history' element={<History />} />
          <Route path='/database' element={<Database />} />
        </Routes>
      </div>
    </>
  )
}

export default App
