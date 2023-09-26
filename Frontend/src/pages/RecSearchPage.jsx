import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Rec } from "../components/Rec";
import { MensajeError } from "../components/MensajeError";
import { Loading } from "../components/Loading";
import { getAllRecsService } from "../services";

export const RecSearchPage = () => {
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
        setRecs(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  const handleSearch = (newQuery) => {
    // Actualiza la URL cuando el usuario realiza una búsqueda
    setQuery(newQuery);
  };

  const filteredRecs = recs.filter((rec) =>
    rec.titulo.toLowerCase().includes(query.toLowerCase())
  );

  if (loading) return <Loading />;
  if (error) return <MensajeError message={error} />;

  return (
    <section>
      <h1>Recomendaciones</h1>
      {/* <RecSearchBar query={query} onSearch={handleSearch} /> */}
      {filteredRecs.map((rec) => (
        <Rec key={rec.id} rec={rec} />
      ))}
    </section>
  );
};
