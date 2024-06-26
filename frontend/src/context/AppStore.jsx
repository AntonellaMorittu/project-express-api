/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, useContext } from 'react'

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [accommodations, setAccommodations] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [currentPage, setCurrentPage] = useState(1) // State to track current page

  useEffect(() => {
    setLoading(true)
    fetchAccommodations(currentPage)
  }, [currentPage])

  //  fetch accommodations based on page number
  const fetchAccommodations = (page) => {
    setLoading(true)
    fetch(
      `https://project-express-api-7pjc.onrender.com/accommodations?page=${page}`
    )
      .then((res) => res.json())
      .then((data) => {
        setAccommodations(data.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching accommodations:', error)
        setLoading(false)
      })
  }

  // handle search function
  const handleSearch = (e) => {
    e.preventDefault()
    const results = accommodations.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setSearchResults(results)
  }

  // handle next page function
  const nextPage = () => {
    setCurrentPage(currentPage + 1)
  }

  //previous page function
  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <AppContext.Provider
      value={{
        accommodations,
        loading,
        handleSearch,
        setSearchTerm,
        searchResults,
        searchTerm,
        nextPage,
        previousPage,
        currentPage,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  return context
}
