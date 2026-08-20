import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Playback } from './pages/Playback'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/r/:id" element={<Playback />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
