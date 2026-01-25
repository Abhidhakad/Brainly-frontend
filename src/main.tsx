import { createRoot } from 'react-dom/client'
import './index.css'
import App  from './App'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from './theme/ThemeProvider'

createRoot(document.getElementById('root')!).render(

  <>
    <ThemeProvider>
      <App />
      <Toaster position="top-right" />
    </ThemeProvider>
  </>
)
