"use client";

import { useState, useEffect } from "react";
import { createTask, fetchTasks } from "../../../utils/api"; // fetchTasks fonksiyonunu ekledik
import { useRouter } from "next/navigation";
import { Task } from "../../../types";

export default function CreateTask() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("TASK");
  const [dependencies, setDependencies] = useState([]);
  const [onStart, setOnStart] = useState([]);
  const [onFailure, setOnFailure] = useState([]);
  const [onSuccess, setOnSuccess] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allTasks, setAllTasks] = useState([]); // Tüm mevcut görevleri tutacak
  const router = useRouter();

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const tasks = await fetchTasks(); // Mevcut görevleri API'den çekiyoruz
        setAllTasks(tasks);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };
    loadTasks();
  }, []);

  const handleInputChange = (setFunction) => (e) => setFunction(e.target.value);

  const handleSectionChange = (setSection, section, index, field) => (e) => {
    const updated = [...section];
    updated[index][field] = e.target.value;
    setSection(updated);
  };

  const addEntry = (setSection, section) => {
    setSection([...section, { type: "", name: "" }]);
  };

  const removeEntry = (setSection, section, index) => {
    setSection(section.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const task = {
        name,
        description,
        type,
        status: "IDLE",
        dependencies,
        on_start: onStart,
        on_failure: onFailure,
        on_success: onSuccess,
        state: "IDLE",
        version: 1,
      };
      await createTask(task);
      router.push("/");
    } catch (error) {
      console.error("Failed to create task:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderSection = (section, setSection, sectionTitle, options) => (
    <div className="mb-4">
      <label className="block text-sm font-semibold mb-2">{sectionTitle}</label>
      {section.map((entry, index) => (
        <div key={index} className="border p-4 mb-2 rounded">
          <div className="mb-2">
            <select
              value={entry.type}
              onChange={handleSectionChange(setSection, section, index, "type")}
              className="w-full p-2 border border-gray-300 rounded"
            >
              {options.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <input
              type="text"
              value={entry.name}
              onChange={handleSectionChange(setSection, section, index, "name")}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Name"
            />
          </div>
          <button
            type="button"
            onClick={() => removeEntry(setSection, section, index)}
            className="text-red-500"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => addEntry(setSection, section)}
        className="text-blue-500"
      >
        Add Entry
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-4xl font-semibold text-center mb-8 text-gray-800">
        Create a New Task
      </h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-semibold mb-2">
            Task Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleInputChange(setName)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-semibold mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={handleInputChange(setDescription)}
            className="w-full p-2 border border-gray-300 rounded"
            rows={4}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="type" className="block text-sm font-semibold mb-2">
            Task Type
          </label>
          <select
            id="type"
            value={type}
            onChange={handleInputChange(setType)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            {["TASK", "WORKFLOW", "PIPELINE", "DAG", "LINEAR", "SERVICE", "FUNCTION", "ACTION"].map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Dependencies</label>
          <select
            multiple
            value={dependencies}
            onChange={(e) => setDependencies(Array.from(e.target.selectedOptions, option => option.value))}
            className="w-full p-2 border border-gray-300 rounded"
          >
            {allTasks.map((task) => (
              <option key={task._id} value={task._id}>
               {task.type} | {task.name}
              </option>
            ))}
          </select>
        </div>
        {renderSection(onStart, setOnStart, "On Start", ["CONFIG", "SERVICE", "TASK", "SCRIPT"])}
        {renderSection(onFailure, setOnFailure, "On Failure", ["FUNCTION", "ROLLBACK"])}
        {renderSection(onSuccess, setOnSuccess, "On Success", ["STATUS", "ACTION", "STEP"])}
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded mt-4"
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create Task"}
        </button>
      </form>
    </div>
  );
}
