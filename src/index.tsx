import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./index.css";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import HomePage from "./pages/homePage";
import ProfilePage from "./pages/profilePage";
import AdminPage from "./pages/adminPage";
import CheckoutPage from "./pages/checkoutPage";
import PaymentPage from "./pages/PaymentPage";
import TicketPage from "./pages/TicketPage";
import ValidTicket from "./pages/ValidTicket";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Router basename="/mbs">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/profilePage" element={<ProfilePage />} />
        <Route path="/adminPage" element={<AdminPage />} />
        <Route path="/checkoutPage/:movieId" element={<CheckoutPage />} />
        <Route path="/PaymentPage" element={<PaymentPage />} />
        <Route path="/ticket" element={<TicketPage />} />
        <Route path="/valid-ticket" element={<ValidTicket />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
