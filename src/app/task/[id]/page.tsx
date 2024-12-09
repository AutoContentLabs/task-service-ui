"use client"; // This ensures that the component is a Client Component
import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Import useParams from next/navigation
import { fetchTaskById } from "../../../utils/api";

type Task = {
  _id: string;
  name: string;
  description: string;
  status: string;
  state: string;
};

export default function TaskDetail() {
  const { id } = useParams(); // Use useParams to get the dynamic `id` from the URL
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    if (id) {
      const loadTask = async () => {
        try {
          const data = await fetchTaskById(id as string); // Fetch task by id
          setTask(data);
        } catch (error) {
          console.error("Failed to load task:", error);
        }
      };
      loadTask();
    }
  }, [id]); // Fetch the task whenever `id` changes

  if (!task) return <div>Loading...</div>; // Show loading if task is not yet available

  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-3xl font-semibold mb-4">{task.name}</h1>
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-semibold">Description</h2>
        <p>{task.description}</p>
        <h3 className="mt-4">Status: {task.status}</h3>
        <h3 className="mt-4">State: {task.state}</h3>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Start Task
        </button>
      </div>
    </div>
  );
}
