import { useState } from 'react'
import { getIndexData, getAllModels } from '../lib/data'

export default function ComparePage({ models }) {
  const [selectedModels, setSelectedModels] = useState([])
  const [compareType, setCompareType] = useState('prompt') // prompt | tools

  const toggleModel = (modelId) => {
    if (selectedModels.includes(modelId)) {
      setSelectedModels(selectedModels.filter(id => id !== modelId))
    } else if (selectedModels.length < 3) {
      setSelectedModels([...selectedModels, modelId])
    }
  }

  const selectedModelData = models.filter(m => selectedModels.includes(m.id))

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">⚖️ So sánh AI Assistants</h1>
        <p className="text-gray-600 mt-2">
          Chọn 2-3 AI assistants để so sánh side-by-side
        </p>
      </header>

      {/* Model Selection */}
      <div className="card">
        <h2 className="font-semibold mb-4">Chọn Models (tối đa 3)</h2>
        <div className="flex flex-wrap gap-2">
          {models.map(model => (
            <button
              key={model.id}
              onClick={() => toggleModel(model.id)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedModels.includes(model.id)
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {model.name}
            </button>
          ))}
        </div>
      </div>

      {/* Compare Type */}
      {selectedModels.length >= 2 && (
        <div className="flex space-x-4">
          <button
            onClick={() => setCompareType('prompt')}
            className={`btn ${compareType === 'prompt' ? 'btn-primary' : 'btn-secondary'}`}
          >
            📝 System Prompts
          </button>
          <button
            onClick={() => setCompareType('tools')}
            className={`btn ${compareType === 'tools' ? 'btn-primary' : 'btn-secondary'}`}
          >
            🛠️ Tools
          </button>
        </div>
      )}

      {/* Comparison Grid */}
      {selectedModels.length >= 2 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedModelData.map(model => (
            <div key={model.id} className="card h-fit">
              <h3 className="font-semibold text-lg mb-4">{model.name}</h3>

              {compareType === 'prompt' && (
                <div className="space-y-4">
                  <div className="text-sm text-gray-500">
                    Category: {model.category}
                  </div>
                  {model.prompts?.vi ? (
                    <pre className="whitespace-pre-wrap text-xs bg-gray-50 p-3 rounded max-h-96 overflow-y-auto">
                      {model.prompts.vi.substring(0, 1500)}
                      {model.prompts.vi.length > 1500 && '...'}
                    </pre>
                  ) : (
                    <p className="text-gray-400 text-sm">Không có prompt</p>
                  )}
                </div>
              )}

              {compareType === 'tools' && (
                <div className="space-y-2">
                  <div className="text-sm text-gray-500 mb-2">
                    {model.toolCount} tools
                  </div>
                  <div className="max-h-96 overflow-y-auto space-y-2">
                    {(Array.isArray(model.tools?.vi)
                      ? model.tools?.vi
                      : model.tools?.vi?.tools || model.tools?.en?.tools || [])
                      .slice(0, 20)
                      .map((tool, idx) => (
                        <div key={idx} className="bg-gray-50 p-2 rounded text-sm">
                          <span className="font-mono font-medium">
                            {tool.name || tool.function?.name}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {selectedModels.length < 2 && (
        <div className="text-center py-12 text-gray-500">
          <div className="text-4xl mb-4">👆</div>
          <p>Chọn ít nhất 2 models để bắt đầu so sánh</p>
        </div>
      )}
    </div>
  )
}

export async function getStaticProps() {
  const index = getIndexData()
  const allModels = getAllModels()

  // Merge index data with full model data
  const models = index.models.map(m => {
    const full = allModels.find(fm => fm.id === m.id)
    return { ...m, ...full }
  })

  return {
    props: {
      models
    }
  }
}
