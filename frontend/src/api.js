import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api";

export const fetchFighters = async () => {
  try {
    const response = await axios.get(`${API_URL}/fighters`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar lutadores:", error);
    throw error;
  }
};
