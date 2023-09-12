import "./App.css";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";

import { Home } from "./pages/Home";
import { Post } from "./pages/Post";
import { Header } from "./components/Header";
import { Register } from "./pages/Register";
import { Buscador } from "./pages/Buscador";
import { MisPosts } from "./pages/MisPosts";
import { Recomendaciones } from "./pages/Recomendaciones";
import { Footer } from "./components/Footer";
import { NotFound } from "./pages/NotFound";

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
        <Route path="/recomendaciones" element={<Recomendaciones />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
