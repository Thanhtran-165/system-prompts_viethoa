import { useState } from 'react'
import Link from 'next/link'
import { getAllFunctions, getQuizzesByFunctionCategory } from '../../lib/data'

export default function FunctionPage({ func, quizzes }) {
  const [lang, setLang] = useState('vi')

  if (!func) {
    return <div>Function không tồn tại</div>
  }

  const implementations = Object.entries(func.implementations)

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500">
        <Link href="/functions" className="hover:text-primary-600">Functions</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{func.name}</span>
      </nav>

      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-mono">{func.name}</h1>
          <p className="text-gray-500 mt-1">
            Category: <span className="font-medium">{func.category}</span>
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

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary-600">{implementations.length}</div>
          <div className="text-sm text-gray-500">AI Models</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary-600">{func.category}</div>
          <div className="text-sm text-gray-500">Category</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary-600">{quizzes.length}</div>
          <div className="text-sm text-gray-500">Quizzes</div>
        </div>
      </div>

      {/* Description */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-2">Mô tả</h2>
        <p className="text-gray-600">{func.description}</p>
      </div>

      {/* Implementations Comparison */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">
          So sánh giữa các Models
        </h2>
        <div className="space-y-6">
          {implementations.map(([modelId, impl]) => (
            <div key={modelId} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <Link
                  href={`/models/${modelId}`}
                  className="font-semibold text-primary-600 hover:text-primary-700"
                >
                  {impl.model}
                </Link>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  {modelId}
                </span>
              </div>

              <div className="text-sm text-gray-600 mb-3 whitespace-pre-wrap">
                {impl.description.substring(0, 300)}
                {impl.description.length > 300 && '...'}
              </div>

              {impl.parameters && impl.parameters.properties && (
                <details>
                  <summary className="text-sm text-primary-600 cursor-pointer">
                    Xem Parameters ({Object.keys(impl.parameters.properties).length})
                  </summary>
                  <pre className="mt-2 text-xs bg-gray-50 p-3 rounded overflow-x-auto">
                    {JSON.stringify(impl.parameters, null, 2)}
                  </pre>
                </details>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quiz Section */}
      {quizzes.length > 0 && (
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">📝 Quiz</h2>
          {quizzes.map(quiz => (
            <div key={quiz.id} className="mb-6 last:mb-0">
              <h3 className="font-medium mb-3">{quiz.title}</h3>
              <div className="space-y-4">
                {quiz.questions.map((q, idx) => (
                  <div key={q.id} className="border-l-4 border-primary-200 pl-4">
                    <p className="font-medium text-gray-900">
                      Câu {idx + 1}: {q.question}
                    </p>
                    <p className="mt-2 text-sm text-gray-500 italic">
                      💡 {q.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export async function getStaticPaths() {
  const functions = getAllFunctions()
  const paths = functions.map(f => ({
    params: { id: f.id }
  }))
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const functions = getAllFunctions()
  const func = functions.find(f => f.id === params.id)
  const quizzes = func ? getQuizzesByFunctionCategory(func.category) : []
  return {
    props: {
      func,
      quizzes
    }
  }
}
