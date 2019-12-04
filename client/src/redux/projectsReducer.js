import {
  PROJECTS_COUNT,
  GET_PROJECT,
  MY_PROJECTS_COUNT,
  INVEST_IN_PROJECT,
  WITHDRAW,
  NEW_PROJECT,
  CLEAR_SUCCESS,
  PAUSE
} from './projectsActions';
import { actions_suffix } from '../globals/configs';
import { dispatch } from '../App';
const {
  START,
  SUCCESS,
  ERROR,
} = actions_suffix;

const initialState = {
  loading: false,
  projectsCount: null,
  message: null,
  error: null,
  success: null,
  myProjectsIndexes: [],
  projectsLoader: {},
  projects: {}
};

function parseNewProject(projectResponse, index) {
  let project = {};
  Object.keys(projectResponse).map(async key => {
    if (isNaN(key)) {
      if (key === 'headerHash') {
        await window.ipfsNode.get(projectResponse[key]).then(async files => {
          dispatch((() => {
            let file = new window.Blob([files[0].content], { type: 'application/octet-binary' })
            return {
              type: 'IMAGE',
              index: index,
              url: window.URL.createObjectURL(file)
            }
          })())
        })
      } else {
        project[key] = projectResponse[key];
      }
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
    case 'IMAGE': {
      return {
        ...state,
        projects: {
          ...state.projects,
          [action.index]: {
            ...state.projects[action.index],
            headerHash: action.url
          }
        }
      }
    }
    case PROJECTS_COUNT + SUCCESS:
      return {
        ...state,
        loading: false,
        projectsCount: parseInt(action.payload)
      }
    case MY_PROJECTS_COUNT + START:
      return {
        ...state,
        loading: true
      }
    case MY_PROJECTS_COUNT + ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case MY_PROJECTS_COUNT + SUCCESS:
      return {
        ...state,
        loading: false,
        myProjectsIndexes: action.payload
      }
    case GET_PROJECT + START:
      return {
        ...state,
        projectsLoader: {
          ...state.projectsLoader,
          [action.meta]: true
        }
      }
    case GET_PROJECT + ERROR:
      return {
        ...state,
        projectsLoader: {
          ...state.projectsLoader,
          [action.meta]: false
        },
        error: action.payload
      }
    case GET_PROJECT + SUCCESS:
      return {
        ...state,
        loading: false,
        projectsLoader: {
          ...state.projectsLoader,
          [action.meta]: false
        },
        projects: {
          ...state.projects,
          [action.meta]: parseNewProject(action.payload, action.meta)
        }
      }
    case INVEST_IN_PROJECT + START:
      return {
        ...state,
        loading: true,
        error: null
      }
    case INVEST_IN_PROJECT + ERROR:
      console.log(action.payload)
      return {
        ...state,
        loading: false,
        error: action.payload.message
      }
    case INVEST_IN_PROJECT + SUCCESS:
      console.log(action.payload)
      return {
        ...state,
        loading: false
      }
    case NEW_PROJECT + START:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      }
    case NEW_PROJECT + ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.message
      }
    case NEW_PROJECT + SUCCESS:
      return {
        ...state,
        loading: false,
        success: true
      }
    case CLEAR_SUCCESS: {
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      }
    }
    case WITHDRAW + START:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      }
    case WITHDRAW + ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.message
      }
    case WITHDRAW + SUCCESS:
      return {
        ...state,
        loading: false,
        // projects: {
        //   ...state.projects,
        //   [action.meta] : {
        //     ...state.projects[action.meta],
        //   }
        // },
        success: true
      }
    case PAUSE + START:
      console.log('foo');
      return {
        ...state,
        projectsLoader: {
          ...state.projectsLoader,
          [action.meta]: true
        }
      }
    case PAUSE + ERROR:
      return {
        ...state,
        ...state,
        projectsLoader: {
          ...state.projectsLoader,
          [action.meta]: false
        },
        error: action.payload.message
      }
    case PAUSE + SUCCESS:
      return {
        ...state,
        loading: false,
        projectsLoader: {
          ...state.projectsLoader,
          [action.meta]: false
        },
        projects: {
          ...state.projects,
          [action.meta]: {
            ...state.projects[action.meta],
            availableToInvest: false
          }
        },
        success: true
      }
    default:
      return state;
  }
}