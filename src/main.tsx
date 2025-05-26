import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { EcommerceApp } from './EcommerceApp'
import { BrowserRouter } from 'react-router'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <EcommerceApp />
    </StrictMode>
  </BrowserRouter>
)
