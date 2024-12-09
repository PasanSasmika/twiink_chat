import { Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react'

function App() {

  const {authUser,checkAuth} = useAuthStore()

  useEffect(()=>{
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });
  

  return (
    <>
    <NavBar/>  



    <Routes>

      <Route path="/"  element={<HomePage/>}/>
      <Route path="/signup"  element={<SignUpPage/>}/>
      <Route path="/login"  element={<LoginPage/>}/>
      <Route path="/settings"  element={<SettingsPage/>}/>
      <Route path="/profile"  element={<ProfilePage/>}/>



    </Routes>
    </>
  )
}

export default App
