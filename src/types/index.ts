// src/types/index.ts
export type Task = {
  _id: string;
  name: string; // Task name (unique)
  description?: string; // Task description (optional)
  headers?: Record<string, any>; // correlationId, traceId gibi başlıklar (optional)
  type: 'TASK' | 'WORKFLOW' | 'PIPELINE' | 'DAG' | 'LINEAR' | 'SERVICE' | 'FUNCTION' | 'ACTION'; // Task type
  state: 'IDLE' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'STOPPED' | 'PAUSED' | 'RESTARTED' | 'CANCELLED' | 'WAITING' | 'SCHEDULED'; // Task state
  status: 'IDLE' | 'STARTED' | 'STOPPED' | 'PAUSED' | 'RESUMED' | 'RESTARTED' | 'CANCELLED' | 'SCHEDULED'; // Task status
  actions?: { // Actions taken on the task
    type: 'CREATE' | 'DELETE' | 'UPDATE' | 'GET' | 'GET_ALL' | 'START' | 'STOP' | 'PAUSE' | 'RESUME' | 'RESTART' | 'CANCEL' | 'SCHEDULE';
    timestamp: Date;
    details?: string; // Optional details for the action
  }[];
  dependencies?: string[]; // Dependencies (referenced task ids)
  on_start?: {
    type: 'CONFIG' | 'SERVICE' | 'TASK' | 'SCRIPT'; // Type of action to be executed
    name: string; // Name of the action
    parameters?: Record<string, any>; // Action parameters
    input?: Record<string, any>; // Input for the action
    output?: Record<string, any>; // Output for the action
    timestamp: Date | null;
  }[];
  on_failure?: {
    type: 'FUNCTION' | 'ROLLBACK'; // Type of failure handling
    name: string;
    timestamp: Date | null;
  }[];
  on_success?: {
    type: 'STATUS' | 'ACTION' | 'STEP'; // Type of success handling
    name: string;
    timestamp: Date | null;
  }[];
  error_log?: { // Error logs
    error_message: string;
    stack_trace: string;
    error_code: string;
    timestamp: Date;
  }[];
  version: number; // Version of the task
  createdAt?: Date; // Timestamp when the task was created
  updatedAt?: Date; // Timestamp when the task was last updated
};
