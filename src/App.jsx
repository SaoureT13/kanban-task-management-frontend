import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/Root'

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root/>
    }
  ])
  return (
    <RouterProvider router={router} />
  )
}

export default App
