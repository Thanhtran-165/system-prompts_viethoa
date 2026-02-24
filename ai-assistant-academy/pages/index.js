import Link from 'next/link'
import { getIndexData } from '../lib/data'

export default function Home({ stats, categories }) {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          🎓 AI Assistant Academy
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Học cách sử dụng và hiểu sâu về các AI Coding Assistants thông qua System Prompts & Tools
        </p>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <div className="text-3xl font-bold text-primary-600">{stats.totalModels}</div>
          <div className="text-gray-500">AI Models</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-primary-600">{stats.totalFunctions}</div>
          <div className="text-gray-500">Functions</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-primary-600">{stats.totalQuizzes}</div>
          <div className="text-gray-500">Quizzes</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-primary-600">VI/EN</div>
          <div className="text-gray-500">Song ngữ</div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="grid md:grid-cols-2 gap-6">
        <Link href="/models" className="card-hover group">
          <div className="flex items-start space-x-4">
            <div className="text-4xl">📚</div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600">
                Học theo Model
              </h2>
              <p className="text-gray-600 mt-1">
                Đi sâu vào từng AI assistant: Claude Code, Cursor, Devin, v0...
              </p>
              <ul className="mt-3 text-sm text-gray-500 space-y-1">
                {Object.keys(categories).slice(0, 4).map(cat => (
                  <li key={cat}>• {cat}</li>
                ))}
              </ul>
            </div>
          </div>
        </Link>

        <Link href="/functions" className="card-hover group">
          <div className="flex items-start space-x-4">
            <div className="text-4xl">🔧</div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600">
                Học theo Chức năng
              </h2>
              <p className="text-gray-600 mt-1">
                So sánh cách các AI implement cùng một chức năng
              </p>
              <ul className="mt-3 text-sm text-gray-500 space-y-1">
                <li>• File Operations: read, write, edit</li>
                <li>• Code Search: grep, semantic search</li>
                <li>• Terminal: bash, process</li>
                <li>• Web & Browser: search, navigate</li>
              </ul>
            </div>
          </div>
        </Link>
      </section>

      {/* Features */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">✨ Tính năng</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="card">
            <div className="text-2xl mb-2">📖</div>
            <h3 className="font-semibold">System Prompts</h3>
            <p className="text-sm text-gray-600 mt-1">
              Xem và học từ system prompts gốc của các AI assistants
            </p>
          </div>
          <div className="card">
            <div className="text-2xl mb-2">🛠️</div>
            <h3 className="font-semibold">Tools & Functions</h3>
            <p className="text-sm text-gray-600 mt-1">
              Khám phá 287+ tools với mô tả chi tiết tiếng Việt
            </p>
          </div>
          <div className="card">
            <div className="text-2xl mb-2">📝</div>
            <h3 className="font-semibold">Quiz theo Module</h3>
            <p className="text-sm text-gray-600 mt-1">
              Kiểm tra kiến thức với quiz cho từng model và chức năng
            </p>
          </div>
          <div className="card">
            <div className="text-2xl mb-2">⚖️</div>
            <h3 className="font-semibold">So sánh Side-by-Side</h3>
            <p className="text-sm text-gray-600 mt-1">
              Đặt 2-3 models cạnh nhau để so sánh
            </p>
          </div>
          <div className="card">
            <div className="text-2xl mb-2">🇻🇳</div>
            <h3 className="font-semibold">Song ngữ</h3>
            <p className="text-sm text-gray-600 mt-1">
              Chuyển đổi dễ dàng giữa tiếng Anh và tiếng Việt
            </p>
          </div>
          <div className="card">
            <div className="text-2xl mb-2">🌙</div>
            <h3 className="font-semibold">Offline Ready</h3>
            <p className="text-sm text-gray-600 mt-1">
              Static site - hoạt động offline sau khi load
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export async function getStaticProps() {
  const data = getIndexData()
  return {
    props: {
      stats: data.stats,
      categories: data.categories
    }
  }
}
