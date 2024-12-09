"use client"; // Bunu ekleyin

import { useEffect, useState } from "react";
import { fetchTasks } from "../utils/api";
import Link from "next/link";

// Task type
type Task = {
  _id: string;
  name: string;
  description: string;
  status: string;
};

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

  // Duruma göre farklı renkler seçmek
  const getStatusColor = (status: string) => {
    switch (status) {
      case "STARTED":
        return "bg-blue-500 text-white";  // Metin beyaz olacak
      case "RESTARTED":
        return "bg-gray-500 text-white"; // Metin beyaz olacak
      case "IDLE":
        return "bg-green-500 text-white"; // Metin beyaz olacak
      case "FAILED":
        return "bg-red-500 text-white";   // Metin beyaz olacak
      default:
        return "bg-yellow-500 text-white"; // Metin beyaz olacak
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-4xl font-semibold text-center mb-8 text-gray-800">
        Task List
      </h1>
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
          </div>
        ))}
      </div>
    </div>
  );
}
