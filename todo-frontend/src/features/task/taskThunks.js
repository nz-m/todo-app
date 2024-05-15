import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance.js";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const TASKS_URL = `${API_BASE_URL}/task`;

export const createTask = createAsyncThunk(
    "tasks/create",
    async (taskData, thunkAPI) => {
        try {
            const response = await axiosInstance.post(TASKS_URL, taskData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || { message: "An unexpected error occurred" }
            );
        }
    }
);

export const fetchTasks = createAsyncThunk(
    "tasks/fetchAll",
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.get(TASKS_URL);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || { message: "An unexpected error occurred" }
            );
        }
    }
);

export const fetchTaskById = createAsyncThunk(
    "tasks/fetchById",
    async (taskId, thunkAPI) => {
        try {
            const response = await axiosInstance.get(`${TASKS_URL}/${taskId}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || { message: "An unexpected error occurred" }
            );
        }
    }
);

export const updateTask = createAsyncThunk(
    "tasks/update",
    // eslint-disable-next-line no-unused-vars
    async ({ taskId, taskData }, thunkAPI) => {
        try {
            const response = await axiosInstance.patch(`${TASKS_URL}/${taskId}`, {isCompleted: true});
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || { message: "An unexpected error occurred" }
            );
        }
    }
);

export const deleteTask = createAsyncThunk(
    "tasks/delete",
    async (taskId, thunkAPI) => {
        try {
            await axiosInstance.delete(`${TASKS_URL}/${taskId}`);
            return taskId; // Return the deleted task ID
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || { message: "An unexpected error occurred" }
            );
        }
    }
);
