// src\utils\api.ts
import axios from "axios";

const apiUrl = "http://localhost:53100/api/tasks";
import { Task } from "../types";

// api.ts - Hata yönetimi
const handleApiError = (error: any) => {
  if (error.response) {
    console.error('API error response:', error.response.data);
  } else {
    console.error('Unexpected error:', error);
  }
  // Burada kullanıcıya gösterilebilecek bir mesaj dönebilirsiniz
};


// Fetch all tasks
export const fetchTasks = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

// Fetch task by id
export const fetchTaskById = async (id: string) => {
  try {
    const response = await axios.get(`${apiUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching task with id ${id}:`, error);
    throw error;
  }
};

// Create a task
export const createTask = async (task: Task) => {
  try {
    const response = await axios.post(apiUrl, task);
    console.log("Task created successfully:", response.data); // Başarıyla oluşturulan veriyi logla
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    if (error.response) {
      console.error('API error response:', error.response.data); // API yanıtını logla
    }
    throw error;
  }
};


// Update a task
export const updateTask = async (id: string, task: Task) => {
  try {
    const response = await axios.put(`${apiUrl}/${id}`, task);
    return response.data;
  } catch (error) {
    console.error(`Error updating task with id ${id}:`, error);
    throw error;
  }
};

// Delete a task
export const deleteTask = async (id: string) => {
  try {
    const response = await axios.delete(`${apiUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting task with id ${id}:`, error);
    throw error;
  }
};

// Start a task
export const startTask = async (id: string) => {
  try {
    const response = await axios.post(`${apiUrl}/${id}/start`);
    return response.data;
  } catch (error) {
    console.error(`Error starting task with id ${id}:`, error);
    throw error;
  }
};

// Stop a task
export const stopTask = async (id: string) => {
  try {
    const response = await axios.post(`${apiUrl}/${id}/stop`);
    return response.data;
  } catch (error) {
    console.error(`Error stopping task with id ${id}:`, error);
    throw error;
  }
};

// Pause a task
export const pauseTask = async (id: string) => {
  try {
    const response = await axios.post(`${apiUrl}/${id}/pause`);
    return response.data;
  } catch (error) {
    console.error(`Error pausing task with id ${id}:`, error);
    throw error;
  }
};

// Resume a task
export const resumeTask = async (id: string) => {
  try {
    const response = await axios.post(`${apiUrl}/${id}/resume`);
    return response.data;
  } catch (error) {
    console.error(`Error resuming task with id ${id}:`, error);
    throw error;
  }
};

// Restart a task
export const restartTask = async (id: string) => {
  try {
    const response = await axios.post(`${apiUrl}/${id}/restart`);
    return response.data;
  } catch (error) {
    console.error(`Error restarting task with id ${id}:`, error);
    throw error;
  }
};
