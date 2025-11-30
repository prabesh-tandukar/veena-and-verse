import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../../lib/supabase'
import { Eye, Trash2, Loader2, X, Phone, Mail } from 'lucide-react'

export default function ManageRequests() {
  const queryClient = useQueryClient()
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedRequest, setSelectedRequest] = useState(null)

  // Fetch requests
  const { data: requests, isLoading } = useQuery({
    queryKey: ['book-requests', filterStatus],
    queryFn: async () => {
      let query = supabase
        .from('book_requests')
        .select('*')
        .order('created_at', { ascending: false })

      if (filterStatus !== 'all') {
        query = query.eq('status', filterStatus)
      }

      const { data, error } = await query

      if (error) throw error
      return data
    },
  })

  // Update status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const { error } = await supabase
        .from('book_requests')
        .update({ status })
        .eq('id', id)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['book-requests'])
      queryClient.invalidateQueries(['admin-stats'])
    },
  })

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase
        .from('book_requests')
        .delete()
        .eq('id', id)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['book-requests'])
      queryClient.invalidateQueries(['admin-stats'])
      setSelectedRequest(null)
    },
  })

  const handleDelete = (request) => {
    if (window.confirm(`Delete request from ${request.customer_name}?`)) {
      deleteMutation.mutate(request.id)
    }
  }

  const handleStatusChange = (id, status) => {
    updateStatusMutation.mutate({ id, status })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Book Requests</h1>
        <p className="text-gray-600">{requests?.length || 0} total requests</p>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex gap-3">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterStatus === 'all'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterStatus('pending')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterStatus === 'pending'
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilterStatus('fulfilled')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterStatus === 'fulfilled'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Fulfilled
          </button>
          <button
            onClick={() => setFilterStatus('cancelled')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterStatus === 'cancelled'
                ? 'bg-red-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Cancelled
          </button>
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-primary" size={48} />
          </div>
        ) : requests && requests.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Book Title
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {requests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium">{request.book_title}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {request.author || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm">{request.customer_name}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex flex-col gap-1">
                        {request.customer_phone && (
                          <a
                            href={`tel:${request.customer_phone}`}
                            className="flex items-center text-accent hover:underline"
                          >
                            <Phone size={12} className="mr-1" />
                            {request.customer_phone}
                          </a>
                        )}
                        {request.customer_email && (
                          <a
                            href={`mailto:${request.customer_email}`}
                            className="flex items-center text-accent hover:underline text-xs"
                          >
                            <Mail size={12} className="mr-1" />
                            {request.customer_email}
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <select
                        value={request.status}
                        onChange={(e) => handleStatusChange(request.id, e.target.value)}
                        className={`px-2 py-1 rounded text-xs font-semibold border-0 cursor-pointer ${
                          request.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : request.status === 'fulfilled'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="fulfilled">Fulfilled</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(request.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedRequest(request)}
                          className="text-accent hover:text-blue-700"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(request)}
                          className="text-red-500 hover:text-red-700"
                          disabled={deleteMutation.isPending}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500">No requests found</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-primary">Request Details</h2>
              <button
                onClick={() => setSelectedRequest(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700">Book Title</label>
                <p className="text-lg">{selectedRequest.book_title}</p>
              </div>

              {selectedRequest.author && (
                <div>
                  <label className="text-sm font-semibold text-gray-700">Author</label>
                  <p className="text-lg">{selectedRequest.author}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700">Customer Name</label>
                  <p>{selectedRequest.customer_name}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700">Status</label>
                  <p>
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        selectedRequest.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : selectedRequest.status === 'fulfilled'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {selectedRequest.status}
                    </span>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700">Phone</label>
                  <p>
                    <a href={`tel:${selectedRequest.customer_phone}`} className="text-accent hover:underline">
                      {selectedRequest.customer_phone}
                    </a>
                  </p>
                </div>
                {selectedRequest.customer_email && (
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Email</label>
                    <p>
                      <a
                        href={`mailto:${selectedRequest.customer_email}`}
                        className="text-accent hover:underline"
                      >
                        {selectedRequest.customer_email}
                      </a>
                    </p>
                  </div>
                )}
              </div>

              {selectedRequest.additional_notes && (
                <div>
                  <label className="text-sm font-semibold text-gray-700">Additional Notes</label>
                  <p className="whitespace-pre-line bg-gray-50 p-3 rounded">
                    {selectedRequest.additional_notes}
                  </p>
                </div>
              )}

              <div>
                <label className="text-sm font-semibold text-gray-700">Submitted On</label>
                <p>{new Date(selectedRequest.created_at).toLocaleString()}</p>
              </div>
            </div>

            <div className="border-t px-6 py-4">
              <button onClick={() => setSelectedRequest(null)} className="btn-primary w-full">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
