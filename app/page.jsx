'use client'
import { useState, useEffect } from "react";
import { BASE_URL } from "./constants";
import MovieGrid from "./components/MovieGrid";
import Modal from "./components/Modal";

async function searchMovies(query){
  try {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${encodeURIComponent(query)}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching data in searchMovie', error)
    return []
  }
}

export default function Home() {
  const [query, setQuery] = useState('')
  const [movies,setMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [loading, setLoading] = useState(false)

  function handleMovieClick(movie){
    setSelectedMovie(movie)
  }

  function handleCloseModal(){
    setSelectedMovie(null)
  }

  function handleReset(){
    setQuery('')
    setMovies([])
  }

  useEffect(() => {
    handleReset();
  },[]);

  async function handleSearch(e){
    e.preventDefault()
    if (!query) return
    setLoading(true)
    const results = await searchMovies(query)
    setMovies(results.results)
    setLoading(false)
  }
  
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <main className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-6xl font-bold m-4">
          Movie Explorer
        </h1>
        <form  onSubmit={handleSearch} className="m-8">
          <input 
          id="SubmitForm"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies.."
          className="px-4 py-2 w-80 text-gray-900" 
          />
          <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">Search</button>
          <button onClick={handleReset} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">Reset</button>
        </form>
        
        {loading ? 
        <button disabled type="button" className="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
          <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
          </svg>
          Loading...
        </button> : 
        <MovieGrid movies={movies} handleMovieClick={handleMovieClick} />}
      </main>
      <Modal movie={selectedMovie} onClose={handleCloseModal} />
    </div>
  );
}
