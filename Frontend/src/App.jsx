import "./App.css";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";

import { Home } from "./pages/Home";
import { Header } from "./components/Header";
import { Register } from "./pages/Register";

function App() {
  return (
    <main className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </main>
  );
}

export default App;
