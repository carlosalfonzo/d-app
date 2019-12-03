// action types
export const PROJECTS_COUNT = 'PROJECTS_COUNT';
export const GET_PROJECT = 'GET_PROJECT';
export const INVEST_IN_PROJECT = 'INVEST_IN_PROJECT';

// actions creators
export const getProjectsCount = (contract, accounts) => {
  return {
    type: PROJECTS_COUNT,
    payload: contract.getProjectsCount().call({
      from: accounts[0]
    })
  }
}

export const investInProject = (contract, account, projectIndex, stake, transferVal) => {
  return {
    type: INVEST_IN_PROJECT,
    payload: contract.investInProject(projectIndex, stake).send({
      from: account,
      value: transferVal
    }),
    meta: projectIndex
  }
}

export const postNewProject = (contract, account, projectIndex, stake, transferVal) => {
  return {
    type: INVEST_IN_PROJECT,
    payload: contract.investInProject(projectIndex, stake).send({
      from: account,
      value: transferVal
    }),
    meta: projectIndex
  }
}

export const getProject = (contract, account, projectIndex) => {
  return {
    type: GET_PROJECT,
    payload: contract.getProject(projectIndex).call({
      from: account
    }),
    meta: projectIndex
  }
}