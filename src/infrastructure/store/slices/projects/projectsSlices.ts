import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { DirectusProjectsRepository } from "../../../repositories/DirectusProjectsRepository";
import { Project } from "@/domain/entities/Project";

interface ProjectsState {
  list: Project[];
  selected: Project | null;
  loading: boolean;
}

const initialState: ProjectsState = {
  list: [],
  loading: false,
  selected: null,
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
export const getSelectedProjectById = createAsyncThunk<Project, Project["id"]>(
  "projects/getProjectById",
  async (projectId) => {
    const projectRepository = new DirectusProjectsRepository();
    const response = await projectRepository.getProjectById(projectId);

    return response;
  },
);

export const setSelectedProject = createAction<Project>("project/setProject");

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setSelectedProject, (state, action) => {
        console.log(action.payload)
        state.selected = action.payload;
      })
      .addCase(getSelectedProjectById.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getSelectedProjectById.fulfilled, (state, action) => {
        state.selected = action.payload;
        state.loading = false;
      })
      .addCase(getSelectedProjectById.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getProjectsList.pending, (state) => {
        state.list = [];
        state.loading = true;
      })
      .addCase(getProjectsList.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(getProjectsList.rejected, (state) => {
        state.list = [];
        state.loading = false;
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
