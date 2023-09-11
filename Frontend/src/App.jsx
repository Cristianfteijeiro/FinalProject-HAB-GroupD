import "./App.css";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";

import { Home } from "./pages/Home";
import { Post } from "./pages/Post";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Register } from "./pages/Register";
import { Buscador } from "./pages/Buscador";
import { MisPosts } from "./pages/MisPosts";

function App() {
  return (
    <main className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post" element={<Post />} />
        <Route path="/buscador" element={<Buscador />} />
        <Route path="/misposts" element={<MisPosts />} />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
