import { useState } from 'react'
import './App.css'
import Cake_view from './features/cake/Cake_view';
import User_view from './features/user/User_view';
import Icecream_view from './features/icecream/Icecream_view';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Cake_view />
      <Icecream_view />
      <User_view />
    </div>
  )
}

export default App
