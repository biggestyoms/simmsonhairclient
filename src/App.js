import './App.css';
import Landing from './pages/Landing';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Barbing from './pages/barbing';
import Shop from "./pages/shop"
import Braiding from './pages/braiding';
import Cart from './pages/cart';
import { CartProvider } from './cartContext';
import Login from './pages/login';
import Signup from './pages/signup';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddProduct from './admin/addProduct';
import EditProduct from './admin/editProduct';
import AllProduct from './admin/allProduct';
import AdminHome from './admin/adminHome';
import Checkout from './pages/checkout';
import Confirmation from './pages/confirmation';


function App() {
  return (
    
  <>
  <ToastContainer />
   <div className="body">
      <CartProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Landing />}/>  
        <Route path="/barbing" element={<Barbing />}/>  
        <Route path="/shop" element={<Shop />}/>  
        <Route path="/braiding" element={<Braiding />}/>  
        <Route path="/cart" element={<Cart />}/>  
        <Route path="/login" element={<Login />}/>  
        <Route path="/signup" element={<Signup />}/>  
        <Route path="/add-product" element={<AddProduct />}/>  
        <Route path="/product/edit/:productId" element={<EditProduct/>}/>
        <Route path="/all-products" element={<AllProduct/>}/>
        <Route path="/admin" element={<AdminHome/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/confirmation" element={<Confirmation/>}/>



  
      </Routes>
    </Router>
    </CartProvider>
  </div>
  </>
   
  );
}

export default App;

