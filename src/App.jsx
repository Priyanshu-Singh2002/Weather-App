import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Top from './pages/Top'
import Line from './components/Line'
import Middle from './pages/Middle'

function App() {

  return (
    <div>
      <Top/>
      <Line/>
      <Middle/>
    </div>
  )
}

export default App
