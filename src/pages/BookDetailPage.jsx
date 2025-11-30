import { useParams, Link, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { supabase, getBookCoverUrl } from '../lib/supabase'
import { ArrowLeft, BookOpen, MessageCircle, Package } from 'lucide-react'
import { Loader2 } from 'lucide-react'

export default function BookDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER

  // Fetch book details
  const { data: book, isLoading, error } = useQuery({
    queryKey: ['book', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      return data
    },
  })

  const handleWhatsAppOrder = () => {
    if (!book) return

    const message = encodeURIComponent(
      `Hi! I'm interested in ordering:\n\nTitle: ${book.title}\nAuthor: ${book.author}\nPrice: Rs. ${book.price}\n\nPlease let me know the availability and payment options.`
    )

    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank')
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin text-primary" size={48} />
        </div>
      </div>
    )
  }

  if (error || !book) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p className="font-semibold">Book not found</p>
          <Link to="/" className="text-accent underline mt-2 inline-block">
            Return to catalog
          </Link>
        </div>
      </div>
    )
  }

  const coverUrl = getBookCoverUrl(book.cover_image_url)

  const getStockBadge = () => {
    const badges = {
      in_stock: {
        text: 'In Stock',
        color: 'bg-green-100 text-green-800',
        icon: <Package size={16} />
      },
      out_of_stock: {
        text: 'Out of Stock',
        color: 'bg-red-100 text-red-800',
        icon: <Package size={16} />
      },
      coming_soon: {
        text: 'Coming Soon',
        color: 'bg-blue-100 text-blue-800',
        icon: <Package size={16} />
      },
    }
    return badges[book.stock_status] || badges.in_stock
  }

  const stockBadge = getStockBadge()
  const isAvailable = book.stock_status === 'in_stock'

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-12">
        {/* Minimal Back Button */}
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-400 hover:text-gray-900 transition-colors mb-12 font-light"
        >
          <ArrowLeft size={16} className="mr-2" strokeWidth={1} />
          Back
        </Link>

        {/* Minimalist Book Detail Layout */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16">
            {/* Book Cover - Takes 2 columns */}
            <div className="md:col-span-2">
              <div className="relative aspect-[2/3] bg-gray-50 overflow-hidden rounded-sm shadow-lg">
                {coverUrl ? (
                  <img
                    src={coverUrl}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <BookOpen size={80} className="text-gray-200" strokeWidth={1} />
                  </div>
                )}
              </div>
            </div>

            {/* Book Info - Takes 3 columns */}
            <div className="md:col-span-3 flex flex-col">
              {/* Title & Author */}
              <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-3 tracking-tight leading-tight">
                  {book.title}
                </h1>
                <p className="text-xl text-gray-500 font-light tracking-wide">{book.author}</p>
              </div>

              {/* Genre & ISBN */}
              <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-gray-500 font-light">
                <span>{book.genre}</span>
                {book.isbn && (
                  <>
                    <span className="text-gray-300">·</span>
                    <span>ISBN {book.isbn}</span>
                  </>
                )}
                {book.stock_status === 'in_stock' && book.quantity > 0 && (
                  <>
                    <span className="text-gray-300">·</span>
                    <span>{book.quantity} available</span>
                  </>
                )}
              </div>

              {/* Description */}
              {book.description && (
                <div className="mb-12">
                  <p className="text-gray-600 leading-relaxed font-light whitespace-pre-line">
                    {book.description}
                  </p>
                </div>
              )}

              {/* Price & Actions */}
              <div className="mt-auto">
                <div className="mb-6">
                  <p className="text-3xl font-light text-gray-900">
                    Rs. {book.price?.toFixed(2) || '0.00'}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  {isAvailable ? (
                    <button
                      onClick={handleWhatsAppOrder}
                      className="w-full bg-gray-900 hover:bg-gray-800 text-white font-light py-4 px-6 transition-colors duration-200 text-sm tracking-wide"
                    >
                      Order via WhatsApp
                    </button>
                  ) : (
                    <div className="w-full bg-gray-100 text-gray-400 font-light py-4 px-6 text-center text-sm tracking-wide">
                      Currently Unavailable
                    </div>
                  )}

                  <button
                    onClick={() => navigate('/request')}
                    className="w-full border border-gray-200 hover:border-gray-900 text-gray-600 hover:text-gray-900 font-light py-4 px-6 transition-colors duration-200 text-sm tracking-wide"
                  >
                    Request this Book
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
