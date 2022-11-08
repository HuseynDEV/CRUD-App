import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AddEditUser from './pages/AddEditUser'
import Home from './pages/Home'
import 'semantic-ui-css/semantic.min.css'
import { Button } from 'semantic-ui-react'
import NavBar from './components/NavBar'

const App = () => {
  return (
    <Router>
      <div className='App'>
        <NavBar/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/add' element={<AddEditUser />} />
          <Route path='/update/:id' element={<AddEditUser /> } />
        </Routes>
      </div>
    </Router>
  )
}

export default App