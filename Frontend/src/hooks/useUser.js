import { useEffect, useState, useContext } from "react";

import { getUserDataService } from "../services";
import { AuthContext } from "../context/AuthContext";

const useUser = (id) => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { token } = useContext(AuthContext);

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const data = await getUserDataService(id, token);
        console.log(data);
        setUser(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id, token]);

  return { user, error, loading };
};

export default useUser;
