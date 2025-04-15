import { useState } from "react";

const useFetch = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  /**
   * Function to start request and configure corresponding states on response/error.
   *
   * @param {string} url URL for the request
   * @param {string} method HTTP method. GET by default
   * @param {any} body HTTP body. Null by default
   * @param {Array} headers HTTP headers. An Array of objects with the form {name: "headerName", value: "value"}
   */
  const fetchData = async (url, method = "GET", body = null, headers = []) => {
    try {
      if (
        !["GET", "POST", "PUT", "DELETE", "OPTIONS"].includes(
          method.toUpperCase()
        )
      ) {
        throw new Error("Unsupported method");
      }
      if (method === "GET" && body) {
        throw new Error("GET Requests can't have a body");
      }

      const finalHeaders = new Headers();
      headers.forEach((header) =>
        finalHeaders.append(header.name, header.value)
      );

      const options = {
        method,
        headers: finalHeaders,
      };
      if (body) {
        options[body] = JSON.stringify(body);
      }

      setIsLoading(true);

      const response = await fetch(url, options);
      if (!response.ok) {
        const message = await response.text();
        throw new Error(`CODE ${response.status}: ${message}`);
      }

      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error(`Error on request ${method} ${url}:`, error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, fetchData };
};

export default useFetch;
