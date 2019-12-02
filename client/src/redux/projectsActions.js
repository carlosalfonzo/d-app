// action types
export const PROJECTS_COUNT = 'PROJECTS_COUNT';
export const GET_PROJECT = 'GET_PROJECT';

// actions creators
export const getProjectsCount = (contract, accounts) => {
  return {
    type: PROJECTS_COUNT,
    payload: contract.getProjectsCount().call({
      from: accounts[0]
    })
  }
}

export const getProject = (contract, account, projectIndex) => {
  return {
    type: GET_PROJECT,
    payload: contract.getProject(0, projectIndex).call({
      from: account
    }),
    meta: projectIndex
  }
}