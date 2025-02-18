import React from "react";
import Login from "./screens/Login";
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SigninProcessScreen from "./screens/SigninProcessScreen";
import PaymentSuccess, { PaymentFailed } from "./screens/SigninProcess/PaymentStatus";
import { SigninProvider } from "./context/signinContext";

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
          </Routes>
        </SigninProvider>
      </div>
    </BrowserRouter>
  );
};

export default App;