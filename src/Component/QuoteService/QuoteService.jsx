import axios from "axios";
export default function QuoteService() {
  const http = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const getQuotes = () => http.get("quotes");

  return {
    getQuotes,
  };
}
