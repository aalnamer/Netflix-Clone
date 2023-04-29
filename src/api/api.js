import axios from "axios";
import API_KEY from "./APIKEY";
const BASE_URL = "https://api.themoviedb.org/3";

class NetflixApi {
  static async getTrending() {
    let res = axios.get(
      `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`
    );
    return res.data;
  }
  static async getNetflixOriginals() {
    let res = axios.get(
      `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_networks=213`
    );
    return res.data;
  }
  static async getTopRated() {
    let res = axios.get(
      `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`
    );
    return res.data;
  }
  static async getActionMovies() {
    let res = axios.get(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`
    );
    return res.data;
  }
  static async getComedyMovies() {
    let res = axios.get(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35`
    );
    return res.data;
  }
  static async getHorrorMovies() {
    let res = axios.get(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27`
    );
    return res.data;
  }
  static async getRomanceMovies() {
    let res = axios.get(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=10749`
    );
    return res.data;
  }
  static async getDocumentaries() {
    let res = axios.get(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=99`
    );
    return res.data;
  }
}

export default NetflixApi;
