import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import BookDetailPage from './pages/BookDetailPage'
import RequestBook from './pages/RequestBook'
import LinkInBio from './pages/LinkInBio'
import AdminLogin from './pages/Admin/Login'
import AdminDashboard from './pages/Admin/Dashboard'
import ManageBooks from './pages/Admin/ManageBooks'
import ManageRequests from './pages/Admin/ManageRequests'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book/:id" element={<BookDetailPage />} />
          <Route path="/request" element={<RequestBook />} />
          <Route path="/links" element={<LinkInBio />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/books"
            element={
              <ProtectedRoute>
                <ManageBooks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/requests"
            element={
              <ProtectedRoute>
                <ManageRequests />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <footer className="border-t border-gray-100 py-12 mt-20">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-gray-400 font-light tracking-wide">
            &copy; 2024 Veena & Verse
          </p>
          <p className="text-xs text-gray-300 font-light mt-2">
            Built by{' '}
            <a
              href="https://github.com/prabesh-tandukar"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 transition-colors duration-300"
            >
              Prabesh Tandukar
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
