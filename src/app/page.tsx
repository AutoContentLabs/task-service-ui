// src\app\page.tsx
"use client"; // 

import { useEffect, useState } from "react";
import { fetchTasks, deleteTask } from "../utils/api";  // deleteTask fonksiyonunu import ettik
import Link from "next/link";
import { Task } from "../types";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (error) {
        console.error("Failed to load tasks:", error);
      }
    };
    loadTasks();
  }, []);

  const statusColors: Record<string, string> = {
    STARTED: "bg-blue-500 text-white",
    RESTARTED: "bg-gray-500 text-white",
    IDLE: "bg-green-500 text-white",
    FAILED: "bg-red-500 text-white",
    DEFAULT: "bg-yellow-500 text-white",
  };

  const getStatusColor = (status: string) => statusColors[status] || statusColors.DEFAULT;

  const handleDelete = async (taskId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      try {
        await deleteTask(taskId); // deleteTask API fonksiyonu çağrılıyor
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId)); // Silinen görevi güncelliyoruz
      } catch (error) {
        console.error("Failed to delete task:", error);
        alert("Failed to delete task. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-4xl font-semibold text-center mb-8 text-gray-800">Task List</h1>

      {/* Yeni Görev Ekle Butonu */}
      <div className="mb-6 text-center">
        <Link
          href="/task/create"  // "/task/create" sayfasına yönlendirecek
          className="text-white bg-blue-500 hover:bg-blue-600 rounded px-4 py-2 inline-block transition-colors"
        >
          Create New Task
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div
            key={task._id}
            className={`p-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 ${getStatusColor(task.status)}`}
          >
            <h2 className="text-2xl font-semibold">{task.name}</h2>
            <p className="text-sm opacity-80 mt-2">{task.description}</p>
            <p className="mt-4 font-medium">
              <strong>Status:</strong> {task.status}
            </p>
            <div className="mt-4">
              <Link
                href={`/task/${task._id}`}
                className="text-white bg-blue-700 hover:bg-blue-800 rounded px-4 py-2 inline-block transition-colors"
              >
                View Details
              </Link>
            </div>
            {/* Silme Butonu */}
            <div className="mt-4">
              <button
                onClick={() => handleDelete(task._id)}
                className="text-white bg-red-500 hover:bg-red-600 rounded px-4 py-2 inline-block transition-colors"
              >
                Delete Task
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
