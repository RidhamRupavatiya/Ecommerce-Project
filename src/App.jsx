import './App.css';
import {BrowserRouter, Navigate, Route, Routes, json} from 'react-router-dom';
import Order from './pages/order/Order';
import Cart from './pages/cart/Cart';
import Dashboard from './pages/admin/dashboard/Dashboard';
import NoPage from './pages/nopage/NoPage';
import Home from './pages/home/Home';
import MyState from './context/data/myState';
import LogIn from './pages/registration/LogIn';
import SignUp from './pages/registration/SignUp';
import ProductInfo from './pages/productInfo/ProductInfo';
import AddProduct from './pages/admin/crud/AddProduct';
import EditProduct from './pages/admin/crud/EditProduct';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AllProducts from './componetns/allProduct/AllProducts';

function App() {
  return (
    <MyState>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/login' element={<LogIn/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/allproducts' element={<AllProducts/>}/>
          <Route path='/productinfo/:id' element={<ProductInfo/>}/>
          <Route path='/order' element={
            <ProtectedRoute>
              <Order/>
            </ProtectedRoute>
          }/>
          <Route path='/dashboard' element={
            <ProtectedRouteForAdmin>
              <Dashboard/>
            </ProtectedRouteForAdmin>
          }/>
          <Route path='/addproduct' element={
            <ProtectedRouteForAdmin>
              <AddProduct/>
            </ProtectedRouteForAdmin>
          }/>
          <Route path='/editproduct' element={
            <ProtectedRouteForAdmin>
              <EditProduct/>
            </ProtectedRouteForAdmin>
          }/>
          <Route path='/*' element={<NoPage/>}/>
        </Routes>
        <ToastContainer/>
      </BrowserRouter>
    </MyState>
  )
}

export default App

// user

export const ProtectedRoute = ({children}) => {
  const user = localStorage?.getItem('user');
  
  if(user){
    return children
  }
  else{
    return <Navigate to={'/login'}/>
  }
}

// admin
export const ProtectedRouteForAdmin = ({children}) => {

  const admin = JSON.parse(localStorage?.getItem('user'));

  if(admin?.user?.email === 'ridham77@gmail.com'){
    return children
  }
  else{
    return <Navigate to={'/'} />
  }
}