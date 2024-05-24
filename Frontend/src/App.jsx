import HomePage from "./components/HomePage"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SearchResults from "./components/SearchResults"

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='search-results' element={<SearchResults />} />
      </Routes>
    </Router>
  )
}

export default App
