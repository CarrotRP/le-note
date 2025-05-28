import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { NoteContextProvider } from './context/NoteContext.jsx'
import { UserContextProvider } from './context/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContextProvider>
      <NoteContextProvider>
        <App />
      </NoteContextProvider>
    </UserContextProvider>
  </StrictMode>,
)
