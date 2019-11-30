const TrustMe = artifacts.require("./TrustMe.sol");
const truffleAssert = require("truffle-assertions");

contract("TrustMe", (accounts) => {
  let trustMe;
  let fristAccount = accounts[0];

  beforeEach(async () => {
    trustMe = await TrustMe.new();
  })
  it("Getting a projects count", async () => {
    assert.equal(await trustMe.getProjectsCount(), 0, 'its different to 0');
  });
  it("Setting a new Project", async () => {
    let myProject = {
      name: 'My New Project',
      description: 'My Project description',
      stakeToSell: 10,
      projectValuation: 1000,
      finishCriteria: 50
    }
    let post = await trustMe.addProject(
      myProject.name,
      myProject.description,
      myProject.stakeToSell,
      myProject.projectValuation,
      myProject.finishCriteria
    );
    truffleAssert.eventEmitted(post, 'newProject', ({ name, description, stakeToSell, projectValuation, finishCriteria }) => {
      return name == myProject.name
        && description == myProject.description
        && stakeToSell == myProject.stakeToSell
        && projectValuation == myProject.projectValuation
        && finishCriteria == myProject.finishCriteria;
    })
  });
  it("Setting a new Project and getting count", async () => {
    let myProject = {
      name: 'My New Project',
      description: 'My Project description',
      stakeToSell: 10,
      projectValuation: 1000,
      finishCriteria: 50
    }
    let post = await trustMe.addProject(
      myProject.name,
      myProject.description,
      myProject.stakeToSell,
      myProject.projectValuation,
      myProject.finishCriteria
    );
    truffleAssert.eventEmitted(post, 'newProject', ({ name, description, stakeToSell, projectValuation, finishCriteria }) => {
      return name == myProject.name
        && description == myProject.description
        && stakeToSell == myProject.stakeToSell
        && projectValuation == myProject.projectValuation
        && finishCriteria == myProject.finishCriteria;
    });
    assert.equal(await trustMe.getProjectsCount(), 1, 'its different to 1');
  });
  // it("get projects count", async () => {
  //   assert.equal(await trustMe.getProjects(), 0, "is different");
  // })
});
