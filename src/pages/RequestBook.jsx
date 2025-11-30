import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import { BookOpen, CheckCircle, Loader2 } from 'lucide-react'

export default function RequestBook() {
  const [formData, setFormData] = useState({
    book_title: '',
    author: '',
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    additional_notes: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const mutation = useMutation({
    mutationFn: async (data) => {
      const { error } = await supabase
        .from('book_requests')
        .insert([data])

      if (error) throw error
    },
    onSuccess: () => {
      setSubmitted(true)
      setFormData({
        book_title: '',
        author: '',
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        additional_notes: '',
      })
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    mutation.mutate(formData)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
            <CheckCircle className="mx-auto text-green-600 mb-4" size={64} />
            <h2 className="text-2xl font-bold text-green-900 mb-2">
              Request Submitted Successfully!
            </h2>
            <p className="text-green-800 mb-6">
              Thank you for your request. We'll contact you soon via phone or email
              to discuss availability and pricing.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="btn-primary mr-3"
            >
              Submit Another Request
            </button>
            <a href="/" className="btn-secondary">
              Browse Catalog
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <BookOpen className="mx-auto text-primary mb-4" size={64} />
          <h1 className="text-4xl font-bold text-primary mb-2">
            Request a Book
          </h1>
          <p className="text-gray-600">
            Can't find the book you're looking for? Let us know and we'll try to get it for you!
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
          {/* Book Title */}
          <div className="mb-6">
            <label htmlFor="book_title" className="block text-sm font-medium text-gray-700 mb-2">
              Book Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="book_title"
              name="book_title"
              value={formData.book_title}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="Enter the book title"
            />
          </div>

          {/* Author */}
          <div className="mb-6">
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
              Author
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter the author's name (if known)"
            />
          </div>

          {/* Customer Name */}
          <div className="mb-6">
            <label htmlFor="customer_name" className="block text-sm font-medium text-gray-700 mb-2">
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="customer_name"
              name="customer_name"
              value={formData.customer_name}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}
          <div className="mb-6">
            <label htmlFor="customer_email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="customer_email"
              name="customer_email"
              value={formData.customer_email}
              onChange={handleChange}
              className="input-field"
              placeholder="your.email@example.com"
            />
          </div>

          {/* Phone */}
          <div className="mb-6">
            <label htmlFor="customer_phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="customer_phone"
              name="customer_phone"
              value={formData.customer_phone}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="9812345678"
            />
          </div>

          {/* Additional Notes */}
          <div className="mb-6">
            <label htmlFor="additional_notes" className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes
            </label>
            <textarea
              id="additional_notes"
              name="additional_notes"
              value={formData.additional_notes}
              onChange={handleChange}
              rows="4"
              className="input-field"
              placeholder="Any additional information (edition, language, etc.)"
            />
          </div>

          {/* Error Message */}
          {mutation.isError && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              <p className="font-semibold">Error submitting request</p>
              <p className="text-sm">{mutation.error.message}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full btn-primary flex items-center justify-center"
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="animate-spin mr-2" size={20} />
                Submitting...
              </>
            ) : (
              'Submit Request'
            )}
          </button>

          <p className="text-sm text-gray-500 text-center mt-4">
            We'll contact you within 24-48 hours to discuss availability and pricing
          </p>
        </form>
      </div>
    </div>
  )
}
