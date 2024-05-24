const fetch = require('node-fetch');
require('dotenv').config();

exports.getPopularMovies = async (req, res, next) => {
    const url = "https://api.themoviedb.org/3/movie/popular"
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.AUTHORIZATION_TOKEN}`
        }
    }
    
    function sendResponse(data, res, status, message) {
        res.status(status).json({
            message: message,
            movies: data
        });
    }
    try {
        const response = await fetch(url, options);
        if (response.status !== 200) {
            throw new Error('Failed to fetch movies');
        }
        const data = await response.json();
        sendResponse(data, res, response.status, 'Movies fetched successfully');
    }
    
    catch (err) {
        console.log(err);
        sendResponse(null, res, 500, 'Failed to fetch movies');
    }
}

exports.postSearchMovies = async (req, res, next) => {
    const movie = req.body.movie;
    const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${movie}`
    const genreUrl = `https://api.themoviedb.org/3/genre/movie/list`
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.AUTHORIZATION_TOKEN}`
        }
    }

    function sendResponse(searchData, genreData, res, status, message) {
        res.status(status).json({
            message: message,
            movies: searchData,
            genres: genreData
        });
    }

    try {
        const searchResponse = await fetch(searchUrl, options);
        if (searchResponse.status !== 200) {
            throw new Error('Failed to fetch movies');
        }
        const searchData = await searchResponse.json();
        const genreResponse = await fetch(genreUrl, options);
        if(genreResponse.status !== 200) {
            throw new Error('Failed to fetch genres');
        }
        const genreData = await genreResponse.json();
        sendResponse(searchData, genreData, res, searchResponse.status, 'Movies fetched successfully');
    }
    catch(err) {
        console.log(err);
        sendResponse(null, null, res, 500, 'Failed to fetch movies');
    }
}