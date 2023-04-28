import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/auth';
import {SearchProvider} from './context/search';
import 'antd/dist/reset.css';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
  <SearchProvider>
  <BrowserRouter>
    
      <App />
   
  </BrowserRouter>
  </SearchProvider>
  </AuthProvider>
);


//here binded app inside authProvider context and can use gobal custom hooks inside any page 

