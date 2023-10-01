import React from "react";
import { Link } from "react-router-dom";

import { Rec } from "./Recomendacion";

import "../Styles/ListaRecomendacion.css";

export const RecList = ({ recs, removeRec }) => {
  return (
    <div className="recomendaciones">
      <h1 className="rec-list-title">Experiencias de nuestros usuarios.</h1>
      <Link to="/recomendar">
        <button className="recom">Cuéntanos tu experiencia.</button>
      </Link>
      {recs.length ? (
        <ul className="rec-list">
          {recs.map((rec) => {
            return (
              <li className="rec-list-items" key={rec.id}>
                <Rec rec={rec} removeRec={removeRec} />
              </li>
            );
          })}
        </ul>
      ) : (
        <h1 className="rec-list-title">No hay recomendaciones...</h1>
      )}
      <Link className="recom" onClick="navigate(/)">
        Volver arriba
      </Link>
    </div>
  );
};
