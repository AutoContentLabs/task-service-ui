// src/app/page.tsx

"use client"; // Bunu ekleyin

import { useEffect, useState } from "react";
import { fetchTasks } from "../utils/api";
import Link from "next/link";

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

  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-3xl font-semibold mb-4">Task List</h1>
      <div className="grid grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-white p-4 rounded shadow-lg hover:shadow-xl transition-all"
          >
            <h2 className="text-xl font-semibold">{task.name}</h2>
            <p className="text-sm text-gray-500">{task.description}</p>
            <p className="mt-2">
              <strong>Status:</strong> {task.status}
            </p>
            <Link
              href={`/task/${task._id}`}
              className="text-blue-500 hover:underline mt-2 block"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
