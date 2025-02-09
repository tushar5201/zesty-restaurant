import React from "react";
import Login from "./screens/Login";
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SigninProcessScreen from "./screens/SigninProcessScreen";
import PaymentSuccess, { PaymentFailed } from "./screens/SigninProcess/PaymentStatus";
import { SigninProvider } from "./context/signinContext";

const App = () => {
  // const [step, setStep] = useState(1);
  // const [user, setUser] = useState(null);

  // const handleNext = (data) => {
  //   setUser({ ...user, ...data });
  //   setStep(step + 1);
  // };

  return (
    <BrowserRouter>
      <div>
        <ToastContainer position="bottom-center" limit={1} />

        {/* {step === 1 && <Login onNext={handleNext} />}
        {step === 2 && <OTP phone={user} onNext={handleNext} />}
        {step === 3 && <Dashboard />} */}
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