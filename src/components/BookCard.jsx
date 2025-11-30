import { Link } from 'react-router-dom'
import { getBookCoverUrl } from '../lib/supabase'
import { BookOpen } from 'lucide-react'

export default function BookCard({ book }) {
  const coverUrl = getBookCoverUrl(book.cover_image_url)

  return (
    <Link to={`/book/${book.id}`} className="group block">
      {/* Minimalist Book Cover - Just the image */}
      <div className="relative aspect-[2/3] bg-gray-100 overflow-hidden rounded-sm shadow-sm hover:shadow-xl transition-all duration-500">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
            <BookOpen size={48} className="text-gray-300" strokeWidth={1} />
          </div>
        )}

        {/* Subtle hover overlay */}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
      </div>

      {/* Minimal title on hover */}
      <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="text-sm font-medium text-gray-900 line-clamp-2">{book.title}</p>
        <p className="text-xs text-gray-500 mt-1">{book.author}</p>
      </div>
    </Link>
  )
}
