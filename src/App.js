import { useState } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Loader from './components/Loader'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Search from './pages/Search'
import Settings from './pages/Settings'
import SignIn from './pages/SignIn'

function App() {
  const { user, isLoading } = useSelector(state => state.Auth)
  const { theme } = useSelector(state => state.theme)

  
  const CheckAuth = ({ children }) => {

    return user ? children : <Navigate to='/signin' />
  }
  const CheckNotAuth = ({ children }) => {

    return user ? <Navigate to='/' /> : children
  }

  return (
    <div className={theme}>
    <div className=" bg-[#eee] dark:bg-gray-900 overflow-auto  min-h-screen dark:text-white">
      <BrowserRouter>
        {isLoading && <Loader />}
        {user && <Header />}
        <Routes>
          <Route path="/search" element={<CheckAuth><Search /></CheckAuth>} />
          <Route path="/profile" element={<CheckAuth><Profile /></CheckAuth>} />
          <Route path="/settings" element={<CheckAuth><Settings /></CheckAuth>} />
          <Route path="/" element={<CheckAuth><Home /></CheckAuth>} />
          <Route path="/signin" element={<CheckNotAuth><SignIn /></CheckNotAuth>} />
          <Route path='/register' element={<CheckNotAuth><Register /></CheckNotAuth>} />
        </Routes>
      </BrowserRouter>
    </div>
    </div>
  )
}

export default App
