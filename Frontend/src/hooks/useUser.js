// import { useEffect, useState, useContext } from "react";

// import { getUserDataService } from "../services";
// import { AuthContext } from "../context/AuthContext";

// const useUser = (id) => {
//   const [user, setUser] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const { token } = useContext(AuthContext);

//   useEffect(() => {
//     const loadUser = async () => {
//       try {
//         setLoading(true);
//         const data = await getUserDataService(id, token);

//         setUser(data);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadUser();
//   }, [id, token]);

//   return { user, error, loading };
// };

// export default useUser;

import { useEffect, useState, useContext } from "react";
import { getUserDataService } from "../services";
import { AuthContext } from "../context/AuthContext";

const useUser = (id) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { token } = useContext(AuthContext);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await getUserDataService(id, token);

        await new Promise((resolve) => setTimeout(resolve, 2000));
        setUser(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    loadUser();
  }, [id, token]);

  return { user, error, loading };
};

export default useUser;
