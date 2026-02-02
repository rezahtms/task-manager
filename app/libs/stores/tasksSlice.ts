import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task, TaskStatus } from "../types/task";

export interface TasksState {
  tasks: Task[];
  columns: Record<TaskStatus, string[]>;
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  columns: {
    "todo": [],
    "in-development": [],
    "validation": [],
    "done": []
  },
  loading: false,
  error: null
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    initializeTasks: (state, action: PayloadAction<{ tasks: Task[] }>) => {
      state.tasks = action.payload.tasks;

      state.columns = {
        "todo": [],
        "in-development": [],
        "validation": [],
        "done": []
      };

      action.payload.tasks.forEach(task => {
        state.columns[task.status].push(task.id);
      });
    },

    moveTask: (
      state,
      action: PayloadAction<{
        taskId: string;
        sourceStatus: TaskStatus;
        destinationStatus: TaskStatus;
        destinationIndex?: number;
      }>
    ) => {
      const { taskId, sourceStatus, destinationStatus, destinationIndex } = action.payload;

      if (sourceStatus === destinationStatus) {
        const sourceColumn = state.columns[sourceStatus];
        const taskIndex = sourceColumn.findIndex(id => id === taskId);

        if (taskIndex !== -1) {
          sourceColumn.splice(taskIndex, 1);

          if (destinationIndex !== undefined) {
            sourceColumn.splice(destinationIndex, 0, taskId);
          } else {
            sourceColumn.push(taskId);
          }
        }
      } else {
        const sourceColumn = state.columns[sourceStatus];
        const destinationColumn = state.columns[destinationStatus];

        const sourceIndex = sourceColumn.findIndex(id => id === taskId);
        if (sourceIndex !== -1) {
          sourceColumn.splice(sourceIndex, 1);
        }


        if (destinationIndex !== undefined) {
          destinationColumn.splice(destinationIndex, 0, taskId);
        } else {
          destinationColumn.push(taskId);
        }

        const taskToUpdate = state.tasks.find(task => task.id === taskId);
        if (taskToUpdate) {
          taskToUpdate.status = destinationStatus;
        }
      }
    },

    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      state.columns[action.payload.status].push(action.payload.id);
    },

    updateTask: (state, action: PayloadAction<Partial<Task> & { id: string }>) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = { ...state.tasks[index], ...action.payload };
      }
    },

    deleteTask: (state, action: PayloadAction<{ taskId: string; status: TaskStatus }>) => {
      const { taskId, status } = action.payload;

      state.tasks = state.tasks.filter(task => task.id !== taskId);

      state.columns[status] = state.columns[status].filter(id => id !== taskId);
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const {
  initializeTasks,
  moveTask,
  addTask,
  updateTask,
  deleteTask,
  setLoading,
  setError
} = tasksSlice.actions;

export default tasksSlice.reducer;
