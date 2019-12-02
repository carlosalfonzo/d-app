import {
  PROJECTS_COUNT,
  GET_PROJECT
} from './projectsActions';
import { actions_suffix } from '../globals/configs';
const {
  START,
  SUCCESS,
  ERROR
} = actions_suffix;

const initialState = {
  loading: false,
  projectsCount: null,
  message: null,
  projectsLoader: {},
  projects: {}
};
function parseNewProject(projectResponse) {
  let project = {};
  Object.keys(projectResponse).map(key => {
    if (isNaN(key)) {
      project[key] = projectResponse[key];
    }
  })
  return project;
}
export default function projectsReducer(state = initialState, action) {
  switch (action.type) {
    case PROJECTS_COUNT + START:
      return {
        ...state,
        loading: true
      }
    case PROJECTS_COUNT + ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case PROJECTS_COUNT + SUCCESS:
      return {
        ...state,
        loading: false,
        projectsCount: action.payload
      }
    case GET_PROJECT + START:
      return {
        ...state,
        projectsLoader: {
          [action.meta]: true
        }
      }
    case GET_PROJECT + ERROR:
      return {
        ...state,
        projectsLoader: {
          [action.meta]: false
        },
        error: action.payload
      }
    case GET_PROJECT + SUCCESS:
      return {
        ...state,
        loading: false,
        projectsLoader: {
          [action.meta]: false
        },
        projects: {
          ...state.projects,
          [action.meta]: parseNewProject(action.payload)
        }
      }
    default:
      return state;
  }
}