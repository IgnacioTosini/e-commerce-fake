import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { EcommerceApp } from './EcommerceApp'
import { BrowserRouter } from 'react-router'
import { Provider } from 'react-redux'
import { store } from './store/store'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <EcommerceApp />
      </BrowserRouter>
    </Provider>
  </StrictMode>
)
