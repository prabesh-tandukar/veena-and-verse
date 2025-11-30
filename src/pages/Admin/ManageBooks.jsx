import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase, uploadBookCover, deleteBookCover, getBookCoverUrl } from '../../lib/supabase'
import { Plus, Edit, Trash2, X, Upload, Loader2 } from 'lucide-react'

export default function ManageBooks() {
  const queryClient = useQueryClient()
  const [showModal, setShowModal] = useState(false)
  const [editingBook, setEditingBook] = useState(null)
  const [coverFile, setCoverFile] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    description: '',
    price: '',
    isbn: '',
    stock_status: 'in_stock',
    quantity: 0,
  })

  // Fetch books
  const { data: books, isLoading } = useQuery({
    queryKey: ['admin-books'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return data
    },
  })

  // Add/Update book mutation
  const saveMutation = useMutation({
    mutationFn: async (data) => {
      let coverPath = data.cover_image_url

      // Upload new cover if file selected
      if (coverFile) {
        coverPath = await uploadBookCover(coverFile)
      }

      const bookData = { ...data, cover_image_url: coverPath }

      if (editingBook) {
        // Update
        const { error } = await supabase
          .from('books')
          .update(bookData)
          .eq('id', editingBook.id)

        if (error) throw error
      } else {
        // Insert
        const { error } = await supabase.from('books').insert([bookData])

        if (error) throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-books'])
      queryClient.invalidateQueries(['books'])
      closeModal()
    },
  })

  // Delete book mutation
  const deleteMutation = useMutation({
    mutationFn: async (book) => {
      // Delete cover image if exists
      if (book.cover_image_url) {
        await deleteBookCover(book.cover_image_url)
      }

      const { error } = await supabase.from('books').delete().eq('id', book.id)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-books'])
      queryClient.invalidateQueries(['books'])
    },
  })

  const openModal = (book = null) => {
    if (book) {
      setEditingBook(book)
      setFormData({
        title: book.title,
        author: book.author,
        genre: book.genre,
        description: book.description || '',
        price: book.price || '',
        isbn: book.isbn || '',
        stock_status: book.stock_status || 'in_stock',
        quantity: book.quantity || 0,
      })
    } else {
      setEditingBook(null)
      setFormData({
        title: '',
        author: '',
        genre: '',
        description: '',
        price: '',
        isbn: '',
        stock_status: 'in_stock',
        quantity: 0,
      })
    }
    setCoverFile(null)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingBook(null)
    setCoverFile(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    saveMutation.mutate(formData)
  }

  const handleDelete = (book) => {
    if (window.confirm(`Are you sure you want to delete "${book.title}"?`)) {
      deleteMutation.mutate(book)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Manage Books</h1>
          <p className="text-gray-600">{books?.length || 0} books in catalog</p>
        </div>
        <button onClick={() => openModal()} className="btn-primary flex items-center">
          <Plus className="mr-2" size={20} />
          Add New Book
        </button>
      </div>

      {/* Books Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-primary" size={48} />
          </div>
        ) : books && books.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Cover
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Genre
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {books.map((book) => {
                  const coverUrl = getBookCoverUrl(book.cover_image_url)
                  return (
                    <tr key={book.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="w-12 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded overflow-hidden">
                          {coverUrl && (
                            <img
                              src={coverUrl}
                              alt={book.title}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">{book.title}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{book.author}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="bg-accent text-white px-2 py-1 rounded text-xs">
                          {book.genre}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold">
                        Rs. {book.price?.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            book.stock_status === 'in_stock'
                              ? 'bg-green-100 text-green-800'
                              : book.stock_status === 'out_of_stock'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {book.stock_status} ({book.quantity})
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openModal(book)}
                            className="text-accent hover:text-blue-700"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(book)}
                            className="text-red-500 hover:text-red-700"
                            disabled={deleteMutation.isPending}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 mb-4">No books yet</p>
            <button onClick={() => openModal()} className="btn-primary">
              Add Your First Book
            </button>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-primary">
                {editingBook ? 'Edit Book' : 'Add New Book'}
              </h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              {/* Cover Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Book Cover
                </label>
                <div className="flex items-center gap-4">
                  {(coverFile || editingBook?.cover_image_url) && (
                    <div className="w-24 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded overflow-hidden">
                      <img
                        src={
                          coverFile
                            ? URL.createObjectURL(coverFile)
                            : getBookCoverUrl(editingBook.cover_image_url)
                        }
                        alt="Cover preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <label className="cursor-pointer btn-outline flex items-center">
                    <Upload className="mr-2" size={18} />
                    {coverFile ? 'Change Image' : 'Upload Image'}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setCoverFile(e.target.files[0])}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="input-field"
                  />
                </div>

                {/* Author */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Author <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="input-field"
                  />
                </div>

                {/* Genre */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Genre <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.genre}
                    onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                    className="input-field"
                    placeholder="e.g., Fiction, Non-Fiction, Poetry"
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (Rs.) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="input-field"
                  />
                </div>

                {/* ISBN */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ISBN
                  </label>
                  <input
                    type="text"
                    value={formData.isbn}
                    onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                    className="input-field"
                  />
                </div>

                {/* Stock Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stock Status
                  </label>
                  <select
                    value={formData.stock_status}
                    onChange={(e) => setFormData({ ...formData, stock_status: e.target.value })}
                    className="input-field"
                  >
                    <option value="in_stock">In Stock</option>
                    <option value="out_of_stock">Out of Stock</option>
                    <option value="coming_soon">Coming Soon</option>
                  </select>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="input-field"
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    rows="4"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>

              {/* Error */}
              {saveMutation.isError && (
                <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  <p className="text-sm">{saveMutation.error.message}</p>
                </div>
              )}

              {/* Buttons */}
              <div className="mt-6 flex gap-3">
                <button
                  type="submit"
                  disabled={saveMutation.isPending}
                  className="btn-primary flex-1 flex items-center justify-center"
                >
                  {saveMutation.isPending ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={20} />
                      Saving...
                    </>
                  ) : (
                    <>{editingBook ? 'Update Book' : 'Add Book'}</>
                  )}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="btn-outline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
