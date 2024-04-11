import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { DirectusProjectsRepository } from "../../../repositories/DirectusProjectsRepository";
import { Project } from "@/domain/entities/Project";
import { AuthState } from "../user/authSlice";

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

export const getProjectsList = createAsyncThunk<Project[], AuthState["token"]>(
  "projects/getProjects",
  async (token, { rejectWithValue }) => {
    try {
      const projectRepository = new DirectusProjectsRepository();
      const response = await projectRepository.getProjectsList(token);
      return response;
    } catch (error:any) {
      return rejectWithValue({ errorMessage: error.message, error });
    }
  },
);
export const addToProjectList = createAsyncThunk<
  Project,
  { newProject: Project; token: AuthState["token"] }
>("projects/addProject", async ({ newProject, token }) => {
  const projectRepository = new DirectusProjectsRepository();
  const response = await projectRepository.addToProjectsList(newProject, token);
  return response;
});
export const updateProjectList = createAsyncThunk<
  Project,
  { updatedProject: Project; token: AuthState["token"] }
>("projects/updateProject", async ({ updatedProject, token }) => {
  const projectRepository = new DirectusProjectsRepository();
  const response = await projectRepository.updateProjectList(
    updatedProject,
    token,
  );
  return response;
});
export const removeFromProjectList = createAsyncThunk<
  Project["id"],
  { projectId: string; token: AuthState["token"] }
>("projects/removeProject", async ({ projectId, token }) => {
  const projectRepository = new DirectusProjectsRepository();
  const response = await projectRepository.removeFromProjectList(
    projectId,
    token,
  );
  return response;
});
export const getSelectedProjectById = createAsyncThunk<
  Project,
  { projectId: Project["id"]; token: AuthState["token"] }
>("projects/getProjectById", async ({ projectId, token }) => {
  const projectRepository = new DirectusProjectsRepository();
  const response = await projectRepository.getProjectById(projectId, token);

  return response;
});

export const setSelectedProject = createAction<Project>("project/setProject");

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setSelectedProject, (state, action) => {
        state.selected = action.payload;
      })
      .addCase(getSelectedProjectById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSelectedProjectById.fulfilled, (state, action) => {
        state.selected = action.payload;
        state.loading = false;
      })
      .addCase(getSelectedProjectById.rejected, (state) => {
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
