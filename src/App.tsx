import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/user/Register";
import Login from "./pages/user/Login";
import ForgotPassword from "./pages/user/ForgotPassword";
import ResetPassword from "./pages/user/ResetPassword";
import { Provider } from "react-redux";
import store from "./store/store";
import Navbar from "./globals/components/Navbar";
import Home from "./pages/Home/Home";

import ProductFilters from "./pages/product/components/ProductFilters";
import ProductDetail from "./pages/singleProduct/ProductDetail";
import Collections from "./pages/product/Collection/Collections";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/register" element={<Register />} />
  <Route path="/login" element={<Login />} />
  <Route path="/forgot-password" element={<ForgotPassword />} />
  <Route path="/reset-password" element={<ResetPassword />} />

  {/* Men collection routes */}
  {/* <Route path="/:collection" element={<ProductFilters/>} />
  <Route path="/:collection/:brand" element={<ProductFilters/>} /> */}

  {/* Women collection routes */}
  {/* <Route path="/:collection" element={<ProductFilters />} /> */}
  {/* <Route path="/collection/:brand" element={<ProductFilters />} /> */}

  {/* Other routes */}
  <Route path="/:collection" element={<ProductFilters />} />
  <Route path="/:collection/:brand" element={<ProductFilters />} />


  <Route path="/:collection/:brand/:id" element={<ProductDetail />} />
  <Route path="/collection" element={<Collections />} />

  

</Routes>

      </BrowserRouter>
    </Provider>
  );
};

export default App;
