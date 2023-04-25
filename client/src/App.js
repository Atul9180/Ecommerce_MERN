import { Routes, Route } from "react-router-dom";
import { HomePage, Register,Login ,ForgotPassword,PageNotFound, Contact, About, Policy,Dashboard,AdminDashboard } from './pages';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from "./components/Routes/PrivateRoute";
import AdminRoute from "./components/Routes/AdminRoute";





function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />


        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>

  );
}

export default App;

//To protect routes we are creating nested routes where root route will be protected auth if authenticated then only can access inner routes
