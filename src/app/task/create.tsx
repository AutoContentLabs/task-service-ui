// src\app\task\create.tsx
"use client";

import { useState } from "react";
import { createTask } from "../../utils/api";
import { useRouter } from "next/navigation";
import { Task } from "../../types";

export default function CreateTask() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("IDLE");
  const [type, setType] = useState("TASK");  // 'TASK' varsayılan
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const task: Task = { name, description, status, type, state: 'IDLE', version: 1 };
      await createTask(task);
      router.push("/");  // Başarıyla yönlendir
    } catch (error) {
      console.error("Failed to create task:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-4xl font-semibold text-center mb-8 text-gray-800">
        Create a New Task
      </h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-semibold mb-2">Task Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-semibold mb-2">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            rows={4}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-semibold mb-2">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="IDLE">Idle</option>
            <option value="STARTED">Started</option>
            <option value="RESTARTED">Restarted</option>
            <option value="FAILED">Failed</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="type" className="block text-sm font-semibold mb-2">Task Type</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="TASK">Task</option>
            <option value="WORKFLOW">Workflow</option>
            <option value="PIPELINE">Pipeline</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isLoading ? "Creating..." : "Create Task"}
        </button>
      </form>
    </div>
  );
}
