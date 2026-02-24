import { useState } from 'react'
import Link from 'next/link'
import { getAllFunctions, getFunctionCategories } from '../lib/data'

export default function FunctionsPage({ functions, categories }) {
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Group functions by category
  const groupedFunctions = {}
  functions.forEach(f => {
    if (!groupedFunctions[f.category]) {
      groupedFunctions[f.category] = []
    }
    groupedFunctions[f.category].push(f)
  })

  const filteredFunctions = selectedCategory === 'all'
    ? functions
    : groupedFunctions[selectedCategory] || []

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">🔧 Học theo Chức năng</h1>
        <p className="text-gray-600 mt-2">
          Xem cách các AI assistants khác nhau implement cùng một chức năng
        </p>
      </header>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            selectedCategory === 'all'
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Tất cả ({functions.length})
        </button>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              selectedCategory === category
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {getCategoryIcon(category)} {category} ({groupedFunctions[category]?.length || 0})
          </button>
        ))}
      </div>

      {/* Functions Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFunctions.map(func => (
          <Link
            key={func.id}
            href={`/functions/${func.id}`}
            className="card-hover group"
          >
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 font-mono text-sm">
                {func.name}
              </h3>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                {func.category}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-2 line-clamp-2">
              {func.description.substring(0, 100)}...
            </p>
            <div className="mt-3 flex items-center text-sm text-primary-600">
              <span>📊</span>
              <span className="ml-1">
                {Object.keys(func.implementations).length} models
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

function getCategoryIcon(category) {
  const icons = {
    'File Operations': '📁',
    'Code Search': '🔍',
    'Terminal': '💻',
    'Web & Browser': '🌐',
    'Git & Version': '📂',
    'Task Management': '📋',
    'Database': '🗃️',
    'AI & LLM': '🤖',
    'Other': '📦'
  }
  return icons[category] || '📦'
}

export async function getStaticProps() {
  const functions = getAllFunctions()
  const categories = [...new Set(functions.map(f => f.category))]
  return {
    props: {
      functions,
      categories
    }
  }
}
