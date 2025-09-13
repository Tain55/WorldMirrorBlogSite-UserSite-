import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

export const searchService = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/search`, {
      params: { q: query },
    });
    return response.data; // { titleBlogs: [], contentBlogs: [], users: [] }
  } catch (error) {
    console.error("Search API Error:", error);
    throw error;
  }
};
