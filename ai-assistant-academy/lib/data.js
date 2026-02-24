// Data loader for static site generation
// Uses require for JSON files (works in both server and build)

let _cache = {
  index: null,
  models: null,
  functions: null,
  quizzes: null
}

function loadData(type) {
  if (_cache[type]) return _cache[type]

  try {
    // Try to load from public data folder first
    const data = require(`../public/data/${type}.json`)
    _cache[type] = data
    return data
  } catch (e) {
    // Fallback: try from data folder
    try {
      const data = require(`../data/${type}.json`)
      _cache[type] = data
      return data
    } catch (e2) {
      console.error(`Cannot load ${type}.json:`, e2.message)
      return null
    }
  }
}

export function getIndexData() {
  return loadData('index') || { stats: {}, categories: {}, models: [] }
}

export function getAllModels() {
  return loadData('models') || []
}

export function getModelById(id) {
  const models = getAllModels()
  return models.find(m => m.id === id)
}

export function getAllFunctions() {
  return loadData('functions') || []
}

export function getFunctionsByCategory(category) {
  const functions = getAllFunctions()
  return functions.filter(f => f.category === category)
}

export function getAllQuizzes() {
  return loadData('quizzes') || []
}

export function getQuizById(id) {
  const quizzes = getAllQuizzes()
  return quizzes.find(q => q.id === id)
}

export function getQuizzesByModel(modelId) {
  const quizzes = getAllQuizzes()
  return quizzes.filter(q => q.type === 'model' && q.modelId === modelId)
}

export function getQuizzesByFunctionCategory(category) {
  const quizzes = getAllQuizzes()
  return quizzes.filter(q => q.type === 'function' && q.category === category)
}

export function getModelsByCategory(category) {
  const models = getAllModels()
  return models.filter(m => m.category === category)
}

export function getCategories() {
  const index = getIndexData()
  return index.categories || {}
}

export function getFunctionCategories() {
  const index = getIndexData()
  return Object.keys(index.functionCategories || {})
}
