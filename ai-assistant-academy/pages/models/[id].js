import { useState } from 'react'
import Link from 'next/link'
import { getAllModels, getModelById, getQuizzesByModel } from '../../lib/data'

export default function ModelPage({ model, quizzes }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [lang, setLang] = useState('vi')

  if (!model) {
    return <div>Model không tồn tại</div>
  }

  const tools = model.tools?.[lang] || model.tools?.en || []
  const toolsArray = Array.isArray(tools) ? tools : (tools.tools || [])
  const prompt = model.prompts?.[lang] || model.prompts?.en || ''

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500">
        <Link href="/models" className="hover:text-primary-600">Models</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{model.name}</span>
      </nav>

      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{model.name}</h1>
          <p className="text-gray-500 mt-1">
            Category: <span className="font-medium">{model.category}</span>
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-4">
          {/* Language Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setLang('vi')}
              className={`px-3 py-1 text-sm rounded ${lang === 'vi' ? 'bg-white shadow text-primary-600' : 'text-gray-600'}`}
            >
              🇻🇳 VI
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-3 py-1 text-sm rounded ${lang === 'en' ? 'bg-white shadow text-primary-600' : 'text-gray-600'}`}
            >
              🇺🇸 EN
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Tổng quan' },
            { id: 'prompt', label: 'System Prompt' },
            { id: 'tools', label: `Tools (${toolsArray.length})` },
            { id: 'quiz', label: `Quiz (${quizzes.length})` },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="py-4">
        {activeTab === 'overview' && (
          <OverviewTab model={model} tools={toolsArray} />
        )}

        {activeTab === 'prompt' && (
          <PromptTab prompt={prompt} />
        )}

        {activeTab === 'tools' && (
          <ToolsTab tools={toolsArray} />
        )}

        {activeTab === 'quiz' && (
          <QuizTab quizzes={quizzes} />
        )}
      </div>
    </div>
  )
}

function OverviewTab({ model, tools }) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Giới thiệu</h2>
          <p className="text-gray-600">
            {model.name} là một AI Coding Assistant thuộc category {model.category}.
          </p>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Thống kê</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-primary-600">{tools.length}</div>
              <div className="text-sm text-gray-500">Tools</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-primary-600">
                {model.prompts?.en ? '✅' : '❌'}
              </div>
              <div className="text-sm text-gray-500">System Prompt</div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Files</h2>
          <ul className="space-y-2 text-sm">
            {model.files.map((file, idx) => (
              <li key={idx} className="flex items-center text-gray-600">
                <span className="mr-2">
                  {file.type === '.json' ? '📋' : file.type === '.md' ? '📄' : '📝'}
                </span>
                {file.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function PromptTab({ prompt }) {
  if (!prompt) {
    return <div className="text-gray-500">Không có system prompt</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">System Prompt</h2>
        <button
          onClick={() => navigator.clipboard.writeText(prompt)}
          className="text-sm text-primary-600 hover:text-primary-700"
        >
          📋 Copy
        </button>
      </div>
      <pre className="whitespace-pre-wrap text-sm leading-relaxed max-h-[600px] overflow-y-auto">
        {prompt}
      </pre>
    </div>
  )
}

function ToolsTab({ tools }) {
  const [search, setSearch] = useState('')

  const filteredTools = tools.filter(tool => {
    const name = tool.name || tool.function?.name || ''
    const desc = tool.description || tool.function?.description || ''
    return name.toLowerCase().includes(search.toLowerCase()) ||
           desc.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Danh sách Tools</h2>
        <input
          type="text"
          placeholder="Tìm kiếm tool..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm w-64"
        />
      </div>

      <div className="space-y-4">
        {filteredTools.map((tool, idx) => {
          const name = tool.name || tool.function?.name || 'Unknown'
          const desc = tool.description || tool.function?.description || ''

          return (
            <div key={idx} className="card">
              <h3 className="font-semibold text-gray-900">{name}</h3>
              <p className="text-sm text-gray-600 mt-2 whitespace-pre-wrap">
                {desc}
              </p>
              {tool.parameters && (
                <details className="mt-3">
                  <summary className="text-sm text-primary-600 cursor-pointer">
                    Xem Parameters
                  </summary>
                  <pre className="mt-2 text-xs bg-gray-50 p-3 rounded overflow-x-auto">
                    {JSON.stringify(tool.parameters, null, 2)}
                  </pre>
                </details>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function QuizTab({ quizzes }) {
  if (quizzes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">📝</div>
        <p className="text-gray-500">Chưa có quiz cho model này</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {quizzes.map(quiz => (
        <div key={quiz.id} className="card">
          <h3 className="font-semibold text-lg mb-4">{quiz.title}</h3>
          <div className="space-y-6">
            {quiz.questions.map((q, idx) => (
              <div key={q.id} className="border-l-4 border-primary-200 pl-4">
                <p className="font-medium text-gray-900">
                  Câu {idx + 1}: {q.question}
                </p>
                <div className="mt-3 space-y-2">
                  {q.options.map((opt, optIdx) => (
                    <div
                      key={optIdx}
                      className="flex items-center space-x-3 p-2 rounded hover:bg-gray-50"
                    >
                      <span className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full text-sm">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="text-sm">{opt.text}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-sm text-gray-500 italic">
                  💡 {q.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export async function getStaticPaths() {
  const models = getAllModels()
  const paths = models.map(model => ({
    params: { id: model.id }
  }))
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const model = getModelById(params.id)
  const quizzes = getQuizzesByModel(params.id)
  return {
    props: {
      model,
      quizzes
    }
  }
}
