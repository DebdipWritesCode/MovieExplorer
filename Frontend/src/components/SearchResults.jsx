import { useLocation } from "react-router-dom"
import { AiFillStar } from 'react-icons/ai'
import './SearchResults.css'

const SearchResults = () => {
    const location = useLocation();
    const { movie, movieResults, genreResults } = location.state;

    const genreMap = genreResults.reduce((acc, genre) => {
        acc[genre.id] = genre.name;
        return acc;
    }, {});

    const getGenreNames = (genreIds) => {
        return genreIds.map(id => genreMap[id]).join(', ');
    };

    return (
        <div className="movies-container">
            <h1 className="search-heading">Search Results for {movie}</h1>
            <div className="search-movies">
                {
                    movieResults && movieResults.length ?
                        movieResults.map((result, index) => (
                            <div key={index} className="search-movie">
                                <img src={`https://image.tmdb.org/t/p/w500${result.poster_path}`} alt={result.title} />
                                <h2>{result.title}</h2>
                                <p className="genres">{getGenreNames(result.genre_ids)}</p>
                                <div className="search-rating">
                                    <AiFillStar color='rgb(236, 220, 0)' size={40} />
                                    <h3>{result.vote_average.toFixed(1)}</h3>
                                </div>
                                <p className="release-date"> Year: {result.release_date.split('-')[0]}</p>
                                <p className="overview">{result.overview}</p>
                            </div>
                        ))
                        : <h1>No movies found</h1>
                }
            </div>
        </div>
    );
}

export default SearchResults