import { Routes, Route } from "react-router-dom";
import { HomePage, Register,Login ,ForgotPassword,Cart,PageNotFound, Contact, About, Policy,Dashboard,AdminDashboard ,CreateCategory,CreateProduct,UpdateProduct,Products, Users,Categories, CategoryProducts} from './pages';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from "./components/Routes/PrivateRoute";
import AdminRoute from "./components/Routes/AdminRoute";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";





function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:slug" element={<CategoryProducts />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/search" element={<Search />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<Orders />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/update-product/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/users" element={<Users />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
                <Route path="/cart" element={<Cart />} />


        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>

  );
}

export default App;

//To protect routes we are creating nested routes where root route will be protected auth if authenticated then only can access inner routes
