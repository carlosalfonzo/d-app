import { toWei } from '../globals/utils';
// action types
export const PROJECTS_COUNT = 'PROJECTS_COUNT';
export const MY_PROJECTS_COUNT = 'MY_PROJECTS_COUNT';
export const GET_PROJECT = 'GET_PROJECT';
export const NEW_PROJECT = 'NEW_PROJECT';
export const INVEST_IN_PROJECT = 'INVEST_IN_PROJECT';
export const WITHDRAW = 'WITHDRAW';
export const CLEAR_SUCCESS = 'CLEAR_SUCCESS';
export const PAUSE = 'PAUSE';

// actions creators
export const getProjectsCount = (contract, accounts) => {
  return {
    type: PROJECTS_COUNT,
    payload: contract.getProjectsCount().call({
      from: accounts[0]
    })
  }
}
export const stopProject = (contract, account, id) => {
  return {
    type: PAUSE,
    payload: contract.stopProjectInvestmentRound(id).call({
      from: account
    }),
    meta: id
  }
}
export const getMyProjectsCount = (contract, account) => {
  return {
    type: MY_PROJECTS_COUNT,
    payload: contract.getAddressProjectsIndexes().call({
      from: account
    })
  }
}
export const withDraw = (contract, account, projectIndex) => {
  return {
    type: WITHDRAW,
    payload: contract.withdrawProjectBalance(projectIndex).send({
      from: account
    }),
    meta: projectIndex
  }
}
export const clearReducer = () => {
  return {
    type: CLEAR_SUCCESS
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

export const postNewProject = (data, contract, account) => {
  return {
    type: NEW_PROJECT,
    payload: contract.addProject(
      data.name,
      data.description,
      parseInt(data.stakeToSell),
      toWei(data.projectValuation),
      parseInt(data.finishCriteria),
      data.headerHash
    ).send({
      from: account
    })
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