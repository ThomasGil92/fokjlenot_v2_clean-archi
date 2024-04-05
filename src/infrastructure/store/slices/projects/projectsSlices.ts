import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { DirectusProjectsRepository } from "../../../repositories/DirectusProjectsRepository";
import { Project } from "@/domain/entities/Project";

interface ProjectsState {
  list: Project[];
  loading:boolean
}

const initialState: ProjectsState = {
  list: [],loading:false
};

export const getProjectsList = createAsyncThunk<Project[]>(
  "projects/getProjects",
  async () => {
    const projectRepository = new DirectusProjectsRepository();
    const response = await projectRepository.getProjectsList();
    return response;
  },
);
export const addToProjectList = createAsyncThunk<Project, Project>(
  "projects/addProject",
  async (newProject) => {
    const projectRepository = new DirectusProjectsRepository();
    const response = await projectRepository.addToProjectsList(newProject);
    return response;
  },
);

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProjectsList.pending, (state) => {
        state.list = [];
      })
      .addCase(getProjectsList.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(getProjectsList.rejected, (state) => {
        state.list = [];
      })
      .addCase(addToProjectList.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToProjectList.fulfilled, (state, action) => {
        state.loading = false;
        state.list=[...state.list,action.payload ]
      })
      
  },
});

export default projectsSlice.reducer;
