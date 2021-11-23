import axios from "axios";

const baseUrl = "https://api.themoviedb.org/3";
const apiKey = "3db39639d31a09459dd9e9052e7086eb";
  
export async function trendingApi() {
    try {
        return  await axios.get(`${baseUrl}/trending/movie/week?api_key=${apiKey}`);
    } catch (error) {
        // console.log('error')
        }
}

export async function searchApi(query) {
    try {
        return  await axios.get(`${baseUrl}/search/movie?api_key=${apiKey}&query=${query}`);
    } catch (error) {
        // console.log('error')
        }
}

export async function movieApiByID(movieId) {
    try {
        return  await axios.get(`${baseUrl}/movie/${movieId}?api_key=${apiKey}`);
    } catch (error) {
        }
}

export async function movieApiByIDCast(movieId) {
    try {
        return  await axios.get(`${baseUrl}/movie/${movieId}/credits?api_key=${apiKey}`);
    } catch (error) {
        }
}

export async function movieApiByIDReviews(movieId) {
    try {
        return  await axios.get(`${baseUrl}/movie/${movieId}/reviews?api_key=${apiKey}`);
    } catch (error) {
        }
}