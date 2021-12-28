import { Route, Routes } from "react-router";
import Login from "./components/Login";
import Home from "./container/Home";
export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
}
