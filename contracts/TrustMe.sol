pragma solidity ^0.5.0;

contract TrustMe {
  // TrustMe events
  event newProject(string name, string description, uint stakeToSell, uint projectValuation, uint finishCriteria);
  event investment(address investor, string projectName, uint amount, uint stakeBuyed);
  event projectWithdraw(string name, uint balance);
  // PROJECT STRUCTURE MODEL
  struct Project {
    string name;
    string description;
    uint stakeToSell;
    uint availableStake;
    uint projectValuation;
    uint finishCriteria;
    bool availableToInvest;
    bool validProject;
  }
  // projects storage
  mapping(address => Project[]) private projects; //projects storage
  mapping(address => uint[]) private projectsBalances; //project balances
  address[] private projectsIndexes; //projects order by address
  // ask only for investor
  modifier onlyInvestor(uint projectAddressIndex) {
    require(
      msg.sender != projectsIndexes[projectAddressIndex],
      "The investor can't be the same person who published the project"
    );
    _;
  }
  // ask if the project is available to invest
  modifier availableToBuy(uint projectAddressIndex,uint projectIndex){
    require(
      projects[projectsIndexes[projectAddressIndex]][projectIndex].availableToInvest,
      "This project is stopped by his owner"
    );
    require(
      projects[projectsIndexes[projectAddressIndex]][projectIndex].availableStake <= msg.value,
      "You can't buy a higher value than available"
    );
    _;
  }
  // ask if the project has founds
  modifier withFounds(uint projectIndex) {
    require(projectsBalances[msg.sender][projectIndex] != 0, 'You have no founds in that project');
    _;
  }
  // ask if msg address has project
  modifier entrepeurWithProjects(uint projectIndex) {
    require(projects[msg.sender][projectIndex].validProject,'This Project does not exist');
    _;
  }
  // adding a new project
  function addProject (
    string memory name,
    string memory description,
    uint stakeToSell,
    uint projectValuation,
    uint finishCriteria
  ) public {
    projects[msg.sender].push(
      Project({
        name: name,
        description: description,
        stakeToSell: stakeToSell,
        availableStake: stakeToSell,
        projectValuation: projectValuation,
        finishCriteria: finishCriteria,
        availableToInvest: true,
        validProject: true
      })
    );
    projectsBalances[msg.sender].push(0);
    projectsIndexes.push(msg.sender);
    emit newProject(name, description, stakeToSell, projectValuation, finishCriteria);
  }
  // get all projects count
  function getProjectsCount() public view returns (uint){
    return projectsIndexes.length;
  }
  // get all address projects count
  function getAddressProjectsCount (
    uint projectIndex
  ) public view returns (
    uint addressProjectsLength
  ) {
    return projects[projectsIndexes[projectIndex]].length;
  }
  // get specific project
  function getProject (
    uint projectAddressIndex,
    uint projectIndex
  ) public view returns (
    string memory name,
    string memory description,
    uint stakeToSell,
    uint availableStake,
    uint projectValuation,
    uint finishCriteria
  ) {
    return (
      projects[projectsIndexes[projectAddressIndex]][projectIndex].name,
      projects[projectsIndexes[projectAddressIndex]][projectIndex].description,
      projects[projectsIndexes[projectAddressIndex]][projectIndex].stakeToSell,
      projects[projectsIndexes[projectAddressIndex]][projectIndex].availableStake,
      projects[projectsIndexes[projectAddressIndex]][projectIndex].projectValuation,
      projects[projectsIndexes[projectAddressIndex]][projectIndex].finishCriteria
    );
  }
  // get project balance
  function getProjectBalance(
    uint projectIndex
  ) public entrepeurWithProjects(projectIndex) view returns (uint balance) {
    return projectsBalances[msg.sender][projectIndex];
  }
  // invest in project
  function investInProject(
    uint projectAddressIndex,
    uint projectIndex,
    uint projectStakeVal
  ) public onlyInvestor(projectAddressIndex) availableToBuy(projectAddressIndex,projectIndex) payable returns (string memory message) {
    projects[projectsIndexes[projectAddressIndex]][projectIndex].availableStake -= projectStakeVal;
    projectsBalances[projectsIndexes[projectAddressIndex]][projectIndex] += msg.value;
    emit investment(msg.sender, projects[projectsIndexes[projectAddressIndex]][projectIndex].name, msg.value, projectStakeVal);
    return string(abi.encodePacked('You successfully invest in project: ',projects[projectsIndexes[projectAddressIndex]][projectIndex].name));
  }
  // stop project investment round
  function stopProjectInvestmentRound(
    uint projectIndex
  ) public entrepeurWithProjects(projectIndex) returns (string memory message, bool success) {
    Project memory projectToPause = projects[msg.sender][projectIndex];
    if (projectsBalances[msg.sender][projectIndex] >= ((projectToPause.stakeToSell * projectToPause.finishCriteria) / 100)) {
      if (projects[msg.sender][projectIndex].availableToInvest) {
        projects[msg.sender][projectIndex].availableToInvest = false;
        return ('Project successfully Stopped', true);
      } else {
        return ('Project already Stopped', false);
      }
    } else {
      return ('The project does not accomplish the finish criteria', false);
    }
  }
  // withdraw project balance
  function withdrawProjectBalance(
    uint projectIndex
  ) public withFounds(projectIndex) payable returns(string memory messsage){
    msg.sender.transfer(projectsBalances[msg.sender][projectIndex]);
    emit projectWithdraw(projects[msg.sender][projectIndex].name, projectsBalances[msg.sender][projectIndex]);
    projectsBalances[msg.sender][projectIndex] = 0;
    return ('Successfully withdraw your balance for this project');
  }
}