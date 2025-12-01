import { Link, useNavigate } from 'react-router-dom'
import { BookOpen, ShoppingBag, LogOut } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Secret keyboard shortcut: Press 'a' three times quickly to access admin login
  useEffect(() => {
    let keyPressCount = 0
    let resetTimer = null

    const handleKeyPress = (e) => {
      if (e.key === 'a' || e.key === 'A') {
        keyPressCount++

        // Clear existing timer
        if (resetTimer) clearTimeout(resetTimer)

        // If pressed 3 times, navigate to admin
        if (keyPressCount === 3) {
          e.preventDefault()
          navigate('/admin/login')
          keyPressCount = 0
        }

        // Reset counter after 1 second of no presses
        resetTimer = setTimeout(() => {
          keyPressCount = 0
        }, 1000)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
      if (resetTimer) clearTimeout(resetTimer)
    }
  }, [navigate])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between py-6">
          {/* Logo - Minimalist */}
          <Link to="/" className="group">
            <h1 className="text-2xl font-light tracking-wide text-gray-900 group-hover:text-gray-600 transition-colors">
              Veena & Verse
            </h1>
          </Link>

          {/* Navigation Links - Minimalist */}
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-light tracking-wide"
            >
              Browse
            </Link>

            <Link
              to="/request"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-light tracking-wide"
            >
              Request
            </Link>

            {user && (
              <>
                <Link
                  to="/admin"
                  className="text-sm text-gray-900 hover:text-gray-600 transition-colors font-light tracking-wide"
                >
                  Admin
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-light tracking-wide"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
