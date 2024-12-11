"use client";

import { useState } from "react";
import { createTask } from "../../../utils/api";
import { useRouter } from "next/navigation";
import { Task } from "../../../types";

export default function CreateTask() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("TASK");
  const [dependencies, setDependencies] = useState([]); // Initially empty
  const [onStart, setOnStart] = useState([]); // Initially empty
  const [onFailure, setOnFailure] = useState([]); // Initially empty
  const [onSuccess, setOnSuccess] = useState([]); // Initially empty
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Handle adding a new entry for dependencies, on_start, on_failure, on_success
  const addEntry = (setSection: Function, section: any[]) => {
    setSection([...section, { type: "", name: "" }]);
  };

  // Handle removing an entry from a section
  const removeEntry = (setSection: Function, section: any[], index: number) => {
    setSection(section.filter((_, i) => i !== index));
  };

  // Handle submitting the form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const task: Task = {
        name,
        description,
        type,
        status: "IDLE", // Defaulting to "IDLE" if not provided
        dependencies,
        on_start: onStart,
        on_failure: onFailure,
        on_success: onSuccess,
        state: "IDLE",
        version: 1,
      };
      await createTask(task);
      router.push("/"); // Redirect to home page after successful creation
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
        {/* Task Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-semibold mb-2">
            Task Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Task Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-semibold mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            rows={4}
          />
        </div>

        {/* Task Type */}
        <div className="mb-4">
          <label htmlFor="type" className="block text-sm font-semibold mb-2">
            Task Type
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="TASK">TASK</option>
            <option value="WORKFLOW">WORKFLOW</option>
            <option value="PIPELINE">PIPELINE</option>
            <option value="DAG">DAG</option>
            <option value="LINEAR">LINEAR</option>
            <option value="SERVICE">SERVICE</option>
            <option value="FUNCTION">FUNCTION</option>
            <option value="ACTION">ACTION</option>
          </select>
        </div>

        {/* Dependencies Section */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Dependencies
          </label>
          {dependencies.map((entry, index) => (
            <div key={index} className="border p-4 mb-2 rounded">
              <div className="mb-2">
                <select
                  value={entry.type}
                  onChange={(e) => {
                    const updated = [...dependencies];
                    updated[index].type = e.target.value;
                    setDependencies(updated);
                  }}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="STEP">STEP</option>
                  <option value="TASK">TASK</option>
                  <option value="WORKFLOW">WORKFLOW</option>
                  <option value="PIPELINE">PIPELINE</option>
                  <option value="DAG">DAG</option>
                  <option value="LINEAR">LINEAR</option>
                  <option value="SERVICE">SERVICE</option>
                  <option value="FUNCTION">FUNCTION</option>
                  <option value="ACTION">ACTION</option>
                </select>
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  value={entry.name}
                  onChange={(e) => {
                    const updated = [...dependencies];
                    updated[index].name = e.target.value;
                    setDependencies(updated);
                  }}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Name"
                />
              </div>
              <button
                type="button"
                onClick={() =>
                  removeEntry(setDependencies, dependencies, index)
                }
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addEntry(setDependencies, dependencies)}
            className="text-blue-500"
          >
            Add Dependency
          </button>
        </div>

        {/* On Start Section */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">On Start</label>
          {onStart.map((entry, index) => (
            <div key={index} className="border p-4 mb-2 rounded">
              <div className="mb-2">
                <select
                  value={entry.type}
                  onChange={(e) => {
                    const updated = [...onStart];
                    updated[index].type = e.target.value;
                    setOnStart(updated);
                  }}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="CONFIG">CONFIG</option>
                  <option value="SERVICE">SERVICE</option>
                  <option value="TASK">TASK</option>
                  <option value="SCRIPT">SCRIPT</option>
                </select>
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  value={entry.name}
                  onChange={(e) => {
                    const updated = [...onStart];
                    updated[index].name = e.target.value;
                    setOnStart(updated);
                  }}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Name"
                />
              </div>
              <button
                type="button"
                onClick={() => removeEntry(setOnStart, onStart, index)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addEntry(setOnStart, onStart)}
            className="text-blue-500"
          >
            Add On Start Entry
          </button>
        </div>

        {/* On Failure Section */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">On Failure</label>
          {onFailure.map((entry, index) => (
            <div key={index} className="border p-4 mb-2 rounded">
              <div className="mb-2">
                <select
                  value={entry.type}
                  onChange={(e) => {
                    const updated = [...onFailure];
                    updated[index].type = e.target.value;
                    setOnFailure(updated);
                  }}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="FUNCTION">FUNCTION</option>
                  <option value="ROLLBACK">ROLLBACK</option>
                </select>
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  value={entry.name}
                  onChange={(e) => {
                    const updated = [...onFailure];
                    updated[index].name = e.target.value;
                    setOnFailure(updated);
                  }}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Name"
                />
              </div>
              <button
                type="button"
                onClick={() => removeEntry(setOnFailure, onFailure, index)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addEntry(setOnFailure, onFailure)}
            className="text-blue-500"
          >
            Add On Failure Entry
          </button>
        </div>

        {/* On Success Section */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">On Success</label>
          {onSuccess.map((entry, index) => (
            <div key={index} className="border p-4 mb-2 rounded">
              <div className="mb-2">
                <select
                  value={entry.type}
                  onChange={(e) => {
                    const updated = [...onSuccess];
                    updated[index].type = e.target.value;
                    setOnSuccess(updated);
                  }}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="STATUS">STATUS</option>
                  <option value="ACTION">ACTION</option>
                  <option value="STEP">STEP</option>
                </select>
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  value={entry.name}
                  onChange={(e) => {
                    const updated = [...onSuccess];
                    updated[index].name = e.target.value;
                    setOnSuccess(updated);
                  }}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Name"
                />
              </div>
              <button
                type="button"
                onClick={() => removeEntry(setOnSuccess, onSuccess, index)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addEntry(setOnSuccess, onSuccess)}
            className="text-blue-500"
          >
            Add On Success Entry
          </button>
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={isLoading}
            className="py-2 px-4 bg-blue-600 text-white rounded"
          >
            {isLoading ? "Creating..." : "Create Task"}
          </button>
        </div>
      </form>
    </div>
  );
}
