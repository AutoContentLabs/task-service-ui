// src\app\task\[id]\page.tsx
"use client"; // This ensures that the component is a Client Component
import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Import useParams from next/navigation
import {
  fetchTaskById,
  startTask,
  stopTask,
  pauseTask,
  resumeTask,
  restartTask,
} from "../../../utils/api";

import { Task } from "../../../types";

export default function TaskDetail() {
  const { id } = useParams(); // Get the dynamic `id` from the URL
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    if (id) {
      const loadTask = async () => {
        try {
          const data = await fetchTaskById(typeof id === "string" ? id : id[0]); // Fetch task by id
          setTask(data);
        } catch (error) {
          console.error("Failed to load task:", error);
        }
      };
      loadTask();
    }
  }, [id]); // Fetch the task whenever `id` changes

  const handleAction = async (action: string) => {
    if (id) {
      try {
        const taskId = typeof id === "string" ? id : id[0]; // Make sure it's a string
        if (action === "start") await startTask(taskId);
        if (action === "stop") await stopTask(taskId);
        if (action === "pause") await pauseTask(taskId);
        if (action === "resume") await resumeTask(taskId);
        if (action === "restart") await restartTask(taskId);
        // Refresh task after action
        const updatedTask = await fetchTaskById(taskId);
        setTask(updatedTask);
      } catch (error) {
        console.error(`Error performing ${action} on task:`, error);
      }
    }
  };

  if (!task) return <div>Loading...</div>; // Show loading if task is not yet available

  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-3xl font-semibold mb-4">{task.name}</h1>
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-semibold">Description</h2>
        <p>{task.description}</p>
        <h3 className="mt-4">Status: {task.status}</h3>
        <h3 className="mt-4">State: {task.state}</h3>
        <div className="mt-4 space-x-2">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => handleAction("start")}
          >
            Start Task
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={() => handleAction("stop")}
          >
            Stop Task
          </button>
          <button
            className="px-4 py-2 bg-yellow-500 text-white rounded"
            onClick={() => handleAction("pause")}
          >
            Pause Task
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={() => handleAction("resume")}
          >
            Resume Task
          </button>
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded"
            onClick={() => handleAction("restart")}
          >
            Restart Task
          </button>
        </div>
      </div>
    </div>
  );
}
