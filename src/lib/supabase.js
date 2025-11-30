import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper function to get public URL for book cover
export const getBookCoverUrl = (path) => {
  if (!path) return null

  // If it's already a full URL, return it
  if (path.startsWith('http')) return path

  // Otherwise, construct Supabase storage URL
  const { data } = supabase.storage.from('book-covers').getPublicUrl(path)
  return data.publicUrl
}

// Helper function to upload book cover
export const uploadBookCover = async (file) => {
  // Validate file type - only allow common image formats
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Invalid file type. Please upload JPG, PNG, WebP, or GIF images only.')
  }

  // Validate file size (max 5MB)
  const maxSize = 5 * 1024 * 1024 // 5MB in bytes
  if (file.size > maxSize) {
    throw new Error('File too large. Please upload an image smaller than 5MB.')
  }

  const fileExt = file.name.split('.').pop().toLowerCase()
  const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
  const filePath = `covers/${fileName}`

  const { error } = await supabase.storage
    .from('book-covers')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    })

  if (error) {
    console.error('Upload error:', error)
    throw new Error(error.message || 'Failed to upload image. Please check bucket permissions.')
  }

  return filePath
}

// Helper function to delete book cover
export const deleteBookCover = async (path) => {
  if (!path || path.startsWith('http')) return

  const { error } = await supabase.storage
    .from('book-covers')
    .remove([path])

  if (error) throw error
}
