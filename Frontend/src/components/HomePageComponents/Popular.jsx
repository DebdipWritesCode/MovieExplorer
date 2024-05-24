import { useState, useEffect } from 'react'
import { AiFillStar } from 'react-icons/ai'
import './Popular.css'

const Popular = () => {
    const [movies, setMovies] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    function fetchMovies() {
        fetch('https://movie-explorer-backend.vercel.app/movie/popular')
            .then(response => response.json())
            .then(data => {
                setMovies(data.movies.results)
                setLoading(false)
            })
            .catch(err => {
                setError('Failed to fetch movies: ');
                console.log(err)
                setLoading(false)
            })
    }

    useEffect(() => {
        fetchMovies()
    }, [])

    if(loading) {
        return <div className='popular'>
            <h1>Loading...</h1>
        </div>
    }

    if(error) {
        return <div  className='popular'>
            <h1>{error}</h1>
        </div>
    }

    return (
        <div className="popular">
            <h1>Popular Picks</h1>
            <div className="movies">
                {
                    movies.map(movie => (
                        <div key={movie.id} className="movie">
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                            <div className="rating">
                                <AiFillStar color='rgb(236, 220, 0)' size={40} />
                                <h3>{movie.vote_average.toFixed(1)}</h3>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Popular