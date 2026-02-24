import Link from 'next/link'
import { getIndexData, getCategories } from '../../lib/data'

export default function ModelsPage({ models, categories }) {
  // Group models by category
  const groupedModels = {}
  Object.keys(categories).forEach(category => {
    groupedModels[category] = models.filter(m => m.category === category)
  })

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">📚 Học theo Model</h1>
        <p className="text-gray-600 mt-2">
          Chọn một AI assistant để học sâu về system prompts và tools của nó
        </p>
      </header>

      {Object.entries(groupedModels).map(([category, categoryModels]) => (
        categoryModels.length > 0 && (
          <section key={category} className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <span className="mr-2">{getCategoryIcon(category)}</span>
              {category}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryModels.map(model => (
                <Link
                  key={model.id}
                  href={`/models/${model.id}`}
                  className="card-hover group"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary-600">
                      {model.name}
                    </h3>
                    {model.hasPrompt && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                        Prompt
                      </span>
                    )}
                  </div>
                  <div className="mt-2 flex items-center space-x-3 text-sm text-gray-500">
                    {model.toolCount > 0 && (
                      <span className="flex items-center">
                        <span className="mr-1">🛠️</span>
                        {model.toolCount} tools
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )
      ))}
    </div>
  )
}

function getCategoryIcon(category) {
  const icons = {
    'CLI Coding': '💻',
    'IDE Integrated': '🔌',
    'Agentic': '🤖',
    'Web Builders': '🌐',
    'Browser': '🧭',
    'Knowledge': '🧠',
    'Open Source': '📖',
    'Other': '📦'
  }
  return icons[category] || '📦'
}

export async function getStaticProps() {
  const index = getIndexData()
  return {
    props: {
      models: index.models,
      categories: index.categories
    }
  }
}
