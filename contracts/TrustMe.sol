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
    string headerHash;
    uint stakeToSell;
    uint availableStake;
    uint projectValuation;
    uint finishCriteria;
    bool availableToInvest;
    address payable ownerAddress;
    uint balance;
    bool validProject;
  }
  mapping(address => uint[]) private projects; //projects storage
  Project[] private projectsStorage; //projects order by address
  // ask only for investor
  modifier onlyInvestor(uint projectIndex) {
    require(
      !contains(projectIndex,projects[msg.sender]),
      "The investor can't be the same person who published the project"
    );
    _;
  }
  // ask only for investor
  modifier accomplishFinishCriteria(uint projectIndex) {
    require(
      projectsStorage[projectIndex].balance >= ((projectsStorage[projectIndex].stakeToSell * projectsStorage[projectIndex].finishCriteria) / 100),
      "The project does not accomplish the finish criteria"
    );
    _;
  }
  // ask if the project is available to invest
  modifier availableToBuy(uint projectIndex){
    require(
      projectsStorage[projectIndex].availableToInvest,
      "This project is stopped by his owner"
    );
    require(
      projectsStorage[projectIndex].availableStake <= msg.value,
      "You can't buy a higher value than available"
    );
    _;
  }
  // ask if the project has founds
  modifier withFounds(uint projectIndex){
    require(projectsStorage[projectIndex].balance != 0, 'You have no founds in that project');
    _;
  }
  // ask if msg address has project
  modifier entrepeurWithProjects(uint projectIndex){
    require(contains(projectIndex,projects[msg.sender]),'This Project does not belongs to you!');
    require(projectsStorage[projectIndex].validProject,'This Project does not exist');
    _;
  }
  // check if elements exists in array
  function contains(
    uint element,
    uint[] memory arrayToSearch
  ) private pure returns(bool success) {
    for(uint i = 0; i<arrayToSearch.length; i++) {
      if(arrayToSearch[i] == element)return true;
    }
    return false;
  }
  // adding a new project
  function addProject (
    string memory name,
    string memory description,
    uint stakeToSell,
    uint projectValuation,
    uint finishCriteria,
    string memory headerHash
  ) public returns(
    string memory message
  ){
    projects[msg.sender].push(projectsStorage.length);
    projectsStorage.push(
      Project({
        name: name,
        description: description,
        stakeToSell: stakeToSell,
        availableStake: stakeToSell,
        projectValuation: projectValuation,
        finishCriteria: finishCriteria,
        headerHash: headerHash,
        availableToInvest: true,
        ownerAddress: msg.sender,
        balance: 0,
        validProject: true
      })
    );
    emit newProject(name, description, stakeToSell, projectValuation, finishCriteria);
    return("Successfully Added Project");
  }
  // get all projects count
  function getProjectsCount() public view returns (uint){
    return projectsStorage.length;
  }
  // get all address projects count
  function getAddressProjectsIndexes () public view returns (
    uint[] memory
  ) {
    return projects[msg.sender];
  }
  // get specific project
  function getProject (
    uint projectIndex
  ) public view returns (
    string memory name,
    string memory headerHash,
    string memory description,
    uint stakeToSell,
    uint availableStake,
    uint projectValuation,
    uint finishCriteria,
    bool availableToInvest,
    address owner,
    uint projectBalance
  ) {
    Project memory projectToReturn = projectsStorage[projectIndex];
    return (
      projectToReturn.name,
      projectToReturn.headerHash,
      projectToReturn.description,
      projectToReturn.stakeToSell,
      projectToReturn.availableStake,
      projectToReturn.projectValuation,
      projectToReturn.finishCriteria,
      projectToReturn.availableToInvest,
      projectToReturn.ownerAddress,
      projectToReturn.balance
    );
  }
  // invest in project
  function investInProject(
    uint projectIndex,
    uint projectStakeVal
  ) public onlyInvestor(projectIndex) availableToBuy(projectIndex) payable {
    projectsStorage[projectIndex].availableStake -= projectStakeVal;
    projectsStorage[projectIndex].balance += msg.value;
    emit investment(msg.sender, projectsStorage[projectIndex].name, msg.value, projectStakeVal);
  }
  // stop project investment round
  function stopProjectInvestmentRound(
    uint projectIndex
  ) public entrepeurWithProjects(projectIndex) accomplishFinishCriteria(projectIndex) returns (
    string memory message,
    bool success
  ) {
    if (projectsStorage[projectIndex].availableToInvest) {
      projectsStorage[projectIndex].availableToInvest = false;
      return ('Project successfully Stopped', true);
    } else {
      return ('Project already Stopped', false);
    }
  }
  // withdraw project balance
  function withdrawProjectBalance(
    uint projectIndex
  ) public withFounds(projectIndex) accomplishFinishCriteria(projectIndex) entrepeurWithProjects(projectIndex) payable{
    Project memory projectToWithdraw = projectsStorage[projectIndex];
    projectToWithdraw.ownerAddress.transfer(projectToWithdraw.balance);
    projectToWithdraw.balance = 0;
    emit projectWithdraw(projectToWithdraw.name, projectToWithdraw.balance);
  }
}