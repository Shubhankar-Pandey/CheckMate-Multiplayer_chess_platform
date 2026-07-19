import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Landing from './screens/landing'
import Game from './screens/Game'
import Navbar from './components/coreComponents/Navbar'
import Signin from './screens/Signin'
import Signup from './screens/Signup'
import { Toaster } from 'react-hot-toast'
import SelectGame from './screens/SelectGame'
import ProtectedRoute from './components/CommonComponents/ProtectedRoute'



function App() {

  return (
    <div className='h-screen w-screen'>

      <Toaster
        position="top-center"
        reverseOrder={false}
      />

      <BrowserRouter>
        <Navbar/>

        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/signup' element={<Signup/>}/>

          <Route element={<ProtectedRoute/>}>
            <Route path='/game' element={<Game/>}/>
            <Route path='/selectGame' element={<SelectGame/>}/>
          </Route>
        
        </Routes>

      </BrowserRouter>

    </div>
  )
}

export default App
