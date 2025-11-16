import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ItemPage from './pages/ItemPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ItemPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
