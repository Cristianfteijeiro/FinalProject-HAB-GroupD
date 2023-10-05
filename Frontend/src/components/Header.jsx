import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import { PopUp } from "./PopUp";
import { AuthContext } from "../context/AuthContext";
import { SearchBar } from "./BarraBusqueda";

import "../Styles/Header.css";

const baseURL = import.meta.env.VITE_API_URL;

export const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const location = useLocation();
  const [query, setQuery] = useState("");

  const handleSearch = (searchQuery) => {
    window.location.href = `/busqueda?query=${searchQuery}`;
  };

  useEffect(() => {
    const searchQuery = new URLSearchParams(location.search).get("query");
    setQuery(searchQuery || "");
  }, [location]);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <header>
      <span className="logo">
        <Link to={"/"}>
          <img src="/HAT3.png" alt="Logo" />
        </Link>
      </span>

      <SearchBar className="search-bar" query={query} onSearch={handleSearch} />

      <nav>
        <ul>
          <li className="recom">
            <Link className="recomButton" to={"/recomendaciones"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="logo-recomendaciones"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                />
              </svg>
            </Link>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </li>
          {user ? (
            <section className="log">
              {user.avatar ? (
                <Link to={`/usuarios/${user.id}/recomendaciones`}>
                  <img
                    className="user-avatar"
                    src={`${baseURL}/uploads/avatarUser/${user.avatar}`}
                    alt={user.nombre}
                  />
                </Link>
              ) : (
                <Link to={`/usuarios/${user.id}/recomendaciones`}>
                  <img
                    className="user-avatar"
                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    alt="Avatar"
                  />
                </Link>
              )}

              <Link className="logout" onClick={() => logout()} to="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                  />
                </svg>
              </Link>
            </section>
          ) : (
            <li className="moñeco">
              <Link onClick={togglePopup}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </Link>
            </li>
          )}{" "}
        </ul>
        {isPopupOpen && <PopUp onClose={togglePopup} />}
      </nav>
    </header>
  );
};
