import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { NotificationContextProvider } from './NotificationContext'

import App from './App'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2*1000,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
    <App />
    </NotificationContextProvider>
  </QueryClientProvider>
)