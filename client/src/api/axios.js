import axios from "axios";

// Since all our requests/responses will be from the same URL, We will create a special instance of axios.
//  so that we don't have to keep manually redefining it over and over in all our code.

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// We will create Interceptors for both the requests and responses
// They work before the req or res are sent or received
// To either inject the token in requests or remove it if we have to.

api.interceptors.request.use();
