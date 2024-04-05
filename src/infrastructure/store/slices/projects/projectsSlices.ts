import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { DirectusProjectsRepository } from "../../../repositories/DirectusProjectsRepository";
import { Project } from "@/domain/entities/Project";

interface ProjectsState {
  list: Project[];
  loading: boolean;
}

const initialState: ProjectsState = {
  list: [],
  loading: false,
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
export const updateProjectList = createAsyncThunk<Project, Project>(
  "projects/updateProject",
  async (updatedProject) => {
    const projectRepository = new DirectusProjectsRepository();
    const response = await projectRepository.updateProjectList(updatedProject);
    return response;
  },
);
export const removeFromProjectList = createAsyncThunk<Project["id"], string>(
  "projects/removeProject",
  async (projectId) => {
    const projectRepository = new DirectusProjectsRepository();
    const response = await projectRepository.removeFromProjectList(projectId);
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
        state.list = [...state.list, action.payload];
      })
      .addCase(updateProjectList.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProjectList.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (project) => project.id === action.payload.id,
        );
        if (index !== -1) state.list[index] = action.payload;
        state.loading = false;
      })
      .addCase(removeFromProjectList.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromProjectList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = [
          ...state.list.filter((project) => project.id != action.payload),
        ];
      });
  },
});

export default projectsSlice.reducer;
