import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

function App() {
  return (
<BrowserRouter>
<Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/home' element={<Home/>}/>
  <Route path='/dashboard' element={<Dashboard/>}/>
  <Route path='/signup' element={<Signup/>}/>
  <Route path='/login' element={<Login/>}/>
</Routes>
</BrowserRouter>
  )
}
export default App;
