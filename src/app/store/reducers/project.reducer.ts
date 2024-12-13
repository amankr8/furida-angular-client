import { createReducer, on } from '@ngrx/store';
import { initialProjectsState } from '../project.state';
import {
  addProject,
  addProjectFail,
  addProjectSuccess,
  deleteProject,
  deleteProjectFail,
  deleteProjectSuccess,
  loadProjects,
  loadProjectsFail,
  loadProjectsSuccess,
  updateProject,
  updateProjectFail,
  updateProjectSuccess,
} from '../../store/actions/project.actions';

export const projectReducer = createReducer(
  initialProjectsState,
  on(loadProjects, (state) => ({
    ...state,
    error: null,
    loading: true,
  })),

  on(loadProjectsSuccess, (state, { projects }) => ({
    ...state,
    projects,
    loading: false,
  })),

  on(loadProjectsFail, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(addProject, (state) => ({
    ...state,
    error: null,
    loading: true,
  })),

  on(addProjectSuccess, (state, { project }) => ({
    ...state,
    projects: [...state.projects, project],
    loading: false,
  })),

  on(addProjectFail, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(updateProject, (state) => ({
    ...state,
    error: null,
    loading: true,
  })),

  on(updateProjectSuccess, (state, { project }) => ({
    ...state,
    projects: state.projects.map((p) => (p.id === project.id ? project : p)),
    loading: false,
  })),

  on(updateProjectFail, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(deleteProject, (state) => ({
    ...state,
    error: null,
    loading: true,
  })),

  on(deleteProjectSuccess, (state, { projectId }) => ({
    ...state,
    projects: state.projects.filter((project) => project.id !== projectId),
    loading: false,
  })),

  on(deleteProjectFail, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);