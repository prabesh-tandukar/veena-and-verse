import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '../../lib/supabase'
import { BookOpen, MessageSquare, Package, TrendingUp } from 'lucide-react'

export default function AdminDashboard() {
  // Fetch stats
  const { data: stats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const [booksRes, requestsRes] = await Promise.all([
        supabase.from('books').select('*', { count: 'exact' }),
        supabase.from('book_requests').select('*', { count: 'exact', head: false }),
      ])

      const totalBooks = booksRes.count || 0
      const inStock = booksRes.data?.filter(b => b.stock_status === 'in_stock').length || 0
      const outOfStock = booksRes.data?.filter(b => b.stock_status === 'out_of_stock').length || 0

      const totalRequests = requestsRes.count || 0
      const pendingRequests = requestsRes.data?.filter(r => r.status === 'pending').length || 0

      return {
        totalBooks,
        inStock,
        outOfStock,
        totalRequests,
        pendingRequests,
      }
    },
  })

  // Fetch recent requests
  const { data: recentRequests } = useQuery({
    queryKey: ['recent-requests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('book_requests')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5)

      if (error) throw error
      return data
    },
  })

  const statCards = [
    {
      title: 'Total Books',
      value: stats?.totalBooks || 0,
      icon: BookOpen,
      color: 'bg-blue-500',
      link: '/admin/books',
    },
    {
      title: 'In Stock',
      value: stats?.inStock || 0,
      icon: Package,
      color: 'bg-green-500',
      link: '/admin/books',
    },
    {
      title: 'Out of Stock',
      value: stats?.outOfStock || 0,
      icon: Package,
      color: 'bg-red-500',
      link: '/admin/books',
    },
    {
      title: 'Pending Requests',
      value: stats?.pendingRequests || 0,
      icon: MessageSquare,
      color: 'bg-yellow-500',
      link: '/admin/requests',
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's an overview of your bookshop.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <Link
            key={stat.title}
            to={stat.link}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} text-white p-3 rounded-lg`}>
                <stat.icon size={24} />
              </div>
              <TrendingUp className="text-gray-400" size={20} />
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold text-primary">{stat.value}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Link
          to="/admin/books"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-primary mb-2">Manage Books</h3>
              <p className="text-gray-600">Add, edit, or remove books from your catalog</p>
            </div>
            <BookOpen className="text-primary" size={48} />
          </div>
        </Link>

        <Link
          to="/admin/requests"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-primary mb-2">View Requests</h3>
              <p className="text-gray-600">Manage customer book requests</p>
            </div>
            <MessageSquare className="text-primary" size={48} />
          </div>
        </Link>
      </div>

      {/* Recent Requests */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-primary">Recent Book Requests</h2>
          <Link to="/admin/requests" className="text-accent hover:underline">
            View All
          </Link>
        </div>

        {recentRequests && recentRequests.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Book Title
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Phone
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">{request.book_title}</td>
                    <td className="px-4 py-3 text-sm">{request.customer_name}</td>
                    <td className="px-4 py-3 text-sm">{request.customer_phone}</td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          request.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : request.status === 'fulfilled'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {request.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {new Date(request.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No recent requests</p>
        )}
      </div>
    </div>
  )
}
