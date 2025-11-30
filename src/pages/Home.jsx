import { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import BookCard from '../components/BookCard'
import SearchBar from '../components/SearchBar'
import FilterPanel from '../components/FilterPanel'
import { Loader2 } from 'lucide-react'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('all')
  const [sortBy, setSortBy] = useState('title_asc')

  // Fetch books
  const { data: books, isLoading, error } = useQuery({
    queryKey: ['books'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return data
    },
  })

  // Get unique genres
  const genres = useMemo(() => {
    if (!books) return []
    return [...new Set(books.map(book => book.genre))].sort()
  }, [books])

  // Filter and sort books
  const filteredBooks = useMemo(() => {
    if (!books) return []

    let result = [...books]

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (book) =>
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query) ||
          book.genre.toLowerCase().includes(query) ||
          (book.isbn && book.isbn.toLowerCase().includes(query)) ||
          (book.description && book.description.toLowerCase().includes(query))
      )
    }

    // Genre filter
    if (selectedGenre !== 'all') {
      result = result.filter((book) => book.genre === selectedGenre)
    }

    // Sort
    const [field, direction] = sortBy.split('_')
    result.sort((a, b) => {
      let aVal, bVal

      if (field === 'title' || field === 'author') {
        aVal = a[field].toLowerCase()
        bVal = b[field].toLowerCase()
      } else if (field === 'price') {
        aVal = a[field] || 0
        bVal = b[field] || 0
      } else if (field === 'newest') {
        aVal = new Date(a.created_at)
        bVal = new Date(b.created_at)
      }

      if (direction === 'asc' || field === 'newest') {
        return aVal > bVal ? 1 : -1
      } else {
        return aVal < bVal ? 1 : -1
      }
    })

    if (field === 'newest') {
      result.reverse()
    }

    return result
  }, [books, searchQuery, selectedGenre, sortBy])

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p className="font-semibold">Error loading books</p>
          <p className="text-sm">{error.message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-6 tracking-tight">
            {books?.length || 0} Books
          </h1>

          {/* Minimalist Search */}
          <div className="max-w-md mx-auto mb-8">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search..."
            />
          </div>

          {/* Simple Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setSelectedGenre('all')}
              className={`px-4 py-2 text-sm font-light tracking-wide transition-colors ${
                selectedGenre === 'all'
                  ? 'text-gray-900 border-b-2 border-gray-900'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              All
            </button>
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-4 py-2 text-sm font-light tracking-wide transition-colors ${
                  selectedGenre === genre
                    ? 'text-gray-900 border-b-2 border-gray-900'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-32">
            <Loader2 className="animate-spin text-gray-300" size={32} strokeWidth={1} />
          </div>
        )}

        {/* Books Grid - Minimal spacing, focus on covers */}
        {!isLoading && filteredBooks.length === 0 && (
          <div className="text-center py-32">
            <p className="text-gray-400 font-light">No books found</p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedGenre('all')
              }}
              className="mt-6 text-sm text-gray-600 hover:text-gray-900 underline font-light"
            >
              Clear filters
            </button>
          </div>
        )}

        {!isLoading && filteredBooks.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-8">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
