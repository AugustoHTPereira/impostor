import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "./components/theme-provider"
import { Router } from "./Router"

export function App() {
  const queryClient = new QueryClient()

  return (
    <div className="mx-auto w-full max-w-sm">
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <Router />
        </ThemeProvider>
      </QueryClientProvider>
    </div>
  )
}

export default App
