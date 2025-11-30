import { Search } from 'lucide-react'

export default function SearchBar({ value, onChange, placeholder = "Search..." }) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="text-gray-300" size={18} strokeWidth={1} />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 focus:border-gray-400 focus:outline-none transition-colors text-sm font-light tracking-wide text-gray-900 placeholder-gray-300"
      />
    </div>
  )
}
