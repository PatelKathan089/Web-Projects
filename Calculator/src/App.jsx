import './App.css'
import Sidebar from './components/Sidebar'
import Mainbar from './components/Mainbar'

function App() {

  return (
    <>
      <div className='wrapper flex w-screen h-screen mx-auto'>
        <Sidebar />
        <Mainbar />
      </div>
    </>
  )
}

export default App
