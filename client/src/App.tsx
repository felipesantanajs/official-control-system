import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import {Home} from "./Pages/Home"
import { Registration } from "./Pages/Registration"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from "./service/react-query";

function App() {
  return (
    
      <QueryClientProvider client={queryClient} >
        <Router>
          <Routes>
            <Route path="/"  element={<Home />}/>
            <Route path="/register"  element={<Registration />}/>
          </Routes>
        </Router>
      </QueryClientProvider>
    
  )
}

export default App 
