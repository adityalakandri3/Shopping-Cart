import React from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Root from './components/layout/Root'
import Product from './components/pages/Product'
import Cart from './components/pages/Cart'
import Single_Product from './components/pages/Single_Product'

const App = () => {
  const router = createBrowserRouter([
    {
      path:'/',
      element:<Root/>,
      children:[
        {
          path:'/',
          element:<Product/>
        },
        {
          path:'/:id',
          element:<Single_Product/>
        },
        {
          path:'/cart',
          element:<Cart/>
        }
      ]

    }
  ])
  
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
