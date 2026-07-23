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
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { meCall } from './apiCalls/user'
import { setUser } from './Redux/Slices/userSlice'



function App() {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    (
      async () => {
        const data = await meCall();
        if(data?.success){
          dispatch(setUser(data.user));
        }
        else{
        }
        setCheckingAuth(false);
      }
    )();
  }, []);

  if(checkingAuth){
    return <div className="w-screen h-screen flex flex-col items-center justify-center bg-black gap-2">
      <div className="loader"></div>
      <div className='text-white'>Connecting...</div>
    </div>;
  }

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
