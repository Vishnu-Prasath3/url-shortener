import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import Login from "./Routes/Login";

import Register from "./Routes/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ActivateAccount from "./Routes/ActivateAccount";
import Dashboard from "./Routes/Dashboard";
import Passwordreset from "./Routes/Passwordreset";
import ResetPasswordPage from "./Routes/ResetPasswordPage";
import EnterURL from "./Routes/EnterURL";



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/activate-account" element={<ActivateAccount />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/resetpassword" element={<Passwordreset />} />
          <Route path="/reset-password-page" element={<ResetPasswordPage />} />
          <Route path="/enterurl" element={<EnterURL/>}/>
          <Route path="/:shortURL"/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;