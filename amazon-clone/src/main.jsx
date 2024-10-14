import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { DataProvider } from './dataProvider/DataProvider.jsx'
import { initialState, reducer } from './Utilities/Reducer.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataProvider
      reducer={reducer} initialState={initialState}>
      <App />
    </DataProvider>
  </StrictMode>,
)
