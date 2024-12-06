import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";

const useDecodeToken = (token) => {
  const [decodedToken, setDecodedToken] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token); // Decode the token
        setDecodedToken(decoded);
        setError(null); // Clear any previous error
      } catch (err) {
        setError("Invalid token");
        setDecodedToken(null); // Clear any previous decoded data
      }
    }
  }, [token]);

  return { decodedToken, error };
};

export default useDecodeToken;
