import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { Rec } from "../components/Recomendacion";
import { MensajeError } from "../components/MensajeError";
import { Loading } from "../components/Loading";

import { getAllRecsService } from "../services";
import useRecs from "../hooks/useRecs";

export const RecSearchPage = () => {
  const { removeRec } = useRecs();
  const [recs, setRecs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const location = useLocation();
  const initialQuery = new URLSearchParams(location.search).get("query");
  const [query, setQuery] = useState(initialQuery || "");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAllRecsService(query);
        await new Promise((resolve) => setTimeout(resolve, 750));
        setRecs(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);
  if (loading) return <Loading />;

  const filteredRecs = recs.filter(
    (rec) =>
      rec.titulo.toLowerCase().includes(query.toLowerCase()) ||
      rec.categoria.toLowerCase().includes(query.toLowerCase()) ||
      rec.entradilla.toLowerCase().includes(query.toLowerCase()) ||
      rec.lugar.toLowerCase().includes(query.toLowerCase()) ||
      rec.texto.toLowerCase().includes(query.toLowerCase())
  );

  if (loading) return <Loading />;
  if (error) return <MensajeError message={error} />;

  return (
    <section className="recomendaciones">
      <h1>Recomendaciones</h1>
      {/* <RecSearchBar query={query} onSearch={handleSearch} /> */}
      <ul className="rec-list">
        {filteredRecs.map((rec) => {
          return (
            <li key={rec.id} className="rec-list-items">
              <Rec rec={rec} removeRec={removeRec} />
            </li>
          );
        })}
      </ul>
    </section>
  );
};
