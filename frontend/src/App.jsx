import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react'
import {Loader} from 'lucide-react';

function App() {

  const {authUser,checkAuth, isCheckingAuth} = useAuthStore()

  useEffect(()=>{
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if(isCheckingAuth && !authUser)return(
    <div className='flex items-center justify-center h-screen'>
      <Loader className="size-10 animate-spin"/>
    </div>
  )
  

  return (
    <>
    <NavBar/>  



    <Routes>

      <Route path="/"  element={authUser ? <HomePage/> : <Navigate to="/login"/>}/>
      <Route path="/signup"  element={ !authUser ?  <SignUpPage/> : <Navigate to="/"/>}/>
      <Route path="/login"  element={  !authUser ? <LoginPage/> : <Navigate to="/"/>}/>
      <Route path="/settings"  element={<SettingsPage/>}/>
      <Route path="/profile"  element={ authUser ? <ProfilePage/> : <Navigate to="/login"/> }/>



    </Routes>
    </>
  )
}

export default App
