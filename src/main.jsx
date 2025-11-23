import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { Router } from './Routes/Router'
import AuthProvider from './Context/AuthProvider'
import {
  QueryClient,
  QueryClientProvider,
  // useQuery,
} from '@tanstack/react-query'
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient} >
      <AuthProvider>
        <RouterProvider router={Router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
)
