"use client";

import { useState } from "react";
import { createTask } from "../../../utils/api";
import { useRouter } from "next/navigation";

export default function CreateTask() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "TASK",
    dependencies: [{ type: "", name: "" }],
    onStart: [{
      type: "CONFIG",
      name: "",
      parameters: { parallel: false, timeout: 0, retries: 0 },
      input: { storage: { database: "", collection: "", flow: "" } },
      output: { format: "json", data: [] },
    }],
    onFailure: [{ type: "FUNCTION", name: "" }],
    onSuccess: [{ type: "STATUS", name: "" }],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field, index, key, value) => {
    setFormData((prev) => {
      const updatedArray = [...prev[field]];
      updatedArray[index][key] = value;
      return { ...prev, [field]: updatedArray };
    });
  };

  const addEntry = (field) => {
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], { type: "", name: "" }] }));
  };

  const removeEntry = (field, index) => {
    setFormData((prev) => {
      const updatedArray = prev[field].filter((_, i) => i !== index);
      return { ...prev, [field]: updatedArray };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const task = {
        ...formData,
        status: "IDLE",
        state: "IDLE",
        version: 1,
      };
      await createTask(task);
      router.push("/");
    } catch (error) {
      setErrorMessage("Failed to create task. Please try again.");
      console.error("Failed to create task:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderInputSection = (title, field, options) => (
    <div className="mb-4">
      <label className="block text-sm font-semibold mb-2">{title}</label>
      {formData[field].map((entry, index) => (
        <div key={index} className="border p-4 mb-2 rounded">
          <select
            value={entry.type}
            onChange={(e) => handleArrayChange(field, index, 'type', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-2"
          >
            {options.map(option => <option key={option} value={option}>{option}</option>)}
          </select>
          <input
            type="text"
            value={entry.name}
            onChange={(e) => handleArrayChange(field, index, 'name', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-2"
            placeholder="Name"
          />
          <button
            type="button"
            onClick={() => removeEntry(field, index)}
            className="text-red-500"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => addEntry(field)}
        className="text-blue-500"
      >
        Add Entry
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-4xl font-semibold text-center mb-8 text-gray-800">Create a New Task</h1>
      {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-semibold mb-2">Task Name</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-semibold mb-2">Description</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            rows={4}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="type" className="block text-sm font-semibold mb-2">Task Type</label>
          <select
            id="type"
            value={formData.type}
            onChange={(e) => handleChange('type', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            {['TASK', 'WORKFLOW', 'PIPELINE', 'DAG', 'LINEAR', 'SERVICE', 'FUNCTION', 'ACTION'].map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        {renderInputSection("Dependencies", 'dependencies', ['STEP', 'TASK', 'WORKFLOW', 'PIPELINE', 'DAG', 'LINEAR'])}
        {renderInputSection("On Start", 'onStart', ['CONFIG', 'SERVICE', 'TASK', 'SCRIPT'])}
        {renderInputSection("On Failure", 'onFailure', ['FUNCTION', 'ROLLBACK'])}
        {renderInputSection("On Success", 'onSuccess', ['STATUS', 'ACTION', 'STEP'])}

        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white p-2 rounded mt-4" 
          disabled={isLoading}
        >
          {isLoading ? 'Creating Task...' : 'Create Task'}
        </button>
      </form>
    </div>
  );
}
