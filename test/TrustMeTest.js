const TrustMe = artifacts.require("TrustMe");
const truffleAssert = require("truffle-assertions");

contract("TrustMe", (accounts) => {
  let trustMe;

  beforeEach(async () => {
    trustMe = await TrustMe.new({ from: accounts[0] });
  })

  it('add a new project', async () => {
    let myProject = await trustMe.addProject('new project', 'foo', 12, 10, 100, '0x.' + '0'.repeat(64));
    truffleAssert.eventEmitted(myProject, 'newProject', (event) => {
      return (event.name == 'new project' && event.description == 'foo' && event.stakeToSell == 12 && event.projectValuation == 10 && event.finishCriteria == 100)
    })
  })
  it('get projects count', async () => {
    assert.equal(await trustMe.getProjectsCount.call(), 0);
  })
  it('get address projects indexes', async () => {
    assert.equal(await trustMe.getAddressProjectsIndexes.call(), 0)
  })
  it('get project', async () => {
    await trustMe.addProject('new project', 'foo', 12, 10, 100, '0x.' + '0'.repeat(64));
    truffleAssert.passes(trustMe.getProject(0));
  })
  it('invest in project', async () => {
    await trustMe.addProject('new project', 'foo', 1, 120, 100, '0x.' + '0'.repeat(64));
    truffleAssert.passes(trustMe.investInProject(0, 2, { from: accounts[1], value: 1 }));
  })
  it('throw invest in project like owner', async () => {
    await trustMe.addProject('new project', 'foo', 1, 120, 100, '0x.' + '0'.repeat(64));
    truffleAssert.fails(trustMe.investInProject(0, 2, { from: accounts[0], value: 1 }));
  })
  it('throw invest in project with higher value than available', async () => {
    await trustMe.addProject('new project', 'foo', 12, 10, 10, '0x.' + '0'.repeat(64));
    truffleAssert.fails(trustMe.investInProject(0, 2, { from: accounts[1], value: 10 }));
  })
  it('stop project investment round', async () => {
    await trustMe.addProject('new project', 'foo', 1, 120, 10, '0x.' + '0'.repeat(64));
    trustMe.investInProject(0, 2, { from: accounts[1], value: 10 })
    truffleAssert.passes(trustMe.stopProjectInvestmentRound(0))
  })
})