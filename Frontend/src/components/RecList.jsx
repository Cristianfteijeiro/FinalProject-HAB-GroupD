import "../Styles/RecList.css";

import React from "react";
import { Rec } from "./Rec";
import { Link } from "react-router-dom";

export const RecList = ({ recs, removeRec }) => {
  /*   return recs.length ? (
    <>
      <h1 className="rec-list-title">Últimas recomendaciones.</h1>
      <ul className="rec-list">
        {recs.map((rec) => {
          return (
            <li className="rec-list-items" key={rec.id}>
              <Rec rec={rec} removeRec={removeRec} />
            </li>
          );
        })}
      </ul>
    </>
  ) : (
    <h1 className="rec-list-title">No hay recomendaciones...</h1>
  ); */

  return (
    <>
      <h1 className="rec-list-title">Últimas recomendaciones.</h1>
      <Link to="/post">
        <button className="post-button">Crear una recomendación</button>
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
    </>
  );
};