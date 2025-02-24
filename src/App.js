import React from "react";
import Login from "./screens/Login";
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SigninProcessScreen from "./screens/SigninProcessScreen";
import PaymentSuccess, { PaymentFailed } from "./screens/SigninProcess/PaymentStatus";
import { SigninProvider } from "./context/signinContext";
import Dashboard from "./screens/Dashboard";
import MenuScreen from "./screens/MenuScreen";
import AddMenuItem from "./controllers/MenuController";
import OrderScreen from "./screens/OrderScreen";
import AdsScreen from "./screens/AdsScreen";
import OutletInfoScreen from "./screens/OutletInfo";
import HelpCenterScreen from "./screens/HelpCenterScreen";
import CreateAds from "./controllers/AdController";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <ToastContainer position="bottom-center" limit={1} />
        <SigninProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signinProcess" element={<SigninProcessScreen />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-failure" element={<PaymentFailed />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/restaurant/menu" element={<MenuScreen />} />
            <Route path="/restaurant/add-menu-item" element={<AddMenuItem />} />
            <Route path="/restaurant/orders" element={<OrderScreen />} />
            <Route path="/restaurant/ads" element={<AdsScreen />} />
            <Route path="/restaurant/create-ads" element={<CreateAds />} />
            <Route path="/restaurant/info" element={<OutletInfoScreen />} />
            <Route path="/restaurant/help" element={<HelpCenterScreen />} />
          </Routes>
        </SigninProvider>
      </div>
    </BrowserRouter>
  );
};

export default App;