// import logo from './logo.svg';
import { Routes, Route } from "react-router-dom";
import { HomePage, Register, PageNotFound, Contact, About, Policy } from './pages';




function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />


        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>

  );
}

export default App;
