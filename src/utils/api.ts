// src/utils/api.ts

import axios from "axios";

const apiUrl = "http://localhost:53100/api/tasks";

// Tüm task'ları almak
export const fetchTasks = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

// Belirli bir task'ı almak
export const fetchTaskById = async (id: string) => {
  try {
    const response = await axios.get(`${apiUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching task with id ${id}:`, error);
    throw error;
  }
};
