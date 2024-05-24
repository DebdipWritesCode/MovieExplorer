import { useState } from 'react'
import './Main.css'
import homeBg from './assets/homeBg.webp'
import { useNavigate } from 'react-router-dom'

const Main = () => {
  const [movie, setMovie] = useState('')
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3000/movie/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ movie })
      })
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json()
      console.log('Success', result.movies.results)
      navigate('/search-results', { state: { movie, movieResults: result.movies.results, genreResults: result.genres.genres } })
    }
    catch(err) {
      console.error('Error', err)
    }
  }

  const scrollToPopularMovies = () => {
    const popularMoviesSection = document.querySelector('.popular h1');
    if (popularMoviesSection) {
      popularMoviesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="main">
        <img className='bg-img' src={homeBg} alt="main bg img" />
        <h1 className='heading'>Find all your favorite movies here</h1>
          <form onSubmit={handleFormSubmit} className='search-box'>
            <input id='movie' name='movie' type="text" value={movie} onChange={(e) => setMovie(e.target.value)} />
            <button type='submit' className='search-btn'>Search</button>
          </form>
        <div className="browse-popular">
          <button onClick={() => scrollToPopularMovies()}>Browse Popular</button> 
        </div>
    </div>
  )
}

export default Main