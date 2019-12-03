export function getProjectGoal(projectValuation, finishCriteria) {
  let projectval = parseInt(projectValuation);
  let finishCrit = parseInt(finishCriteria) / 100;
  let goal = Math.round(projectval * finishCrit);
  return goal;
}

export function getProgressBarPercentaje(projectValuation, finishCriteria, balance) {
  let goal = getProjectGoal(projectValuation, finishCriteria);
  let percentaje = Math.round(parseInt(balance) * 100 / goal);
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
export function toEther(weiAmount) {
  return parseInt(weiAmount) * 10 ** 18;
}
