import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

console.log('App mounting...')
try {
  createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
  console.log('App mounted successfully')
} catch (error) {
  console.error('Error mounting app:', error)
  document.getElementById('root').innerHTML = `<p>Error: ${error.message}</p>`
}
