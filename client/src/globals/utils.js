export function getProjectGoal(projectValuation, projectStakeToSell) {
  let projectval = parseInt(projectValuation);
  let stakeToSell = parseInt(projectStakeToSell) / 100;
  let goal = Math.round(projectval * stakeToSell);
  return `${toEther(goal)} Eth`;
}

export function getProgressBarPercentaje(projectValuation, finishCriteria, balance, stakeToSell) {
  let goal = getProjectGoal(projectValuation, stakeToSell);
  goal = parseFloat(goal.replace(' Eth', ''));
  let percentaje = parseFloat(toEther(balance)) * 100 / goal;
  return `${percentaje}%`;
}
// change the documuent title element
export function changeDocumentTitle(title, isHome = false) {
  if (isHome) {
    if (document.title !== `:.:. ${title} .:.:`) {
      document.title = `:.:. ${title} .:.:`;
    }
  }
  else if (document.title !== `TrustMe ~ ${title}`) {
    document.title = `TrustMe ~ ${title}`;
  }
}
export function toWei(ether) {
  return `${parseInt(ether) * 10 ** 18}`;
}
export function toEther(weiAmount) {
  if (parseInt(weiAmount)) return `${parseInt(weiAmount) / 10 ** 18}`;
  return weiAmount;
}
