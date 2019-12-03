export const NewProjectInputs = [
  {
    title: 'Name',
    name: 'name',
    placeholder: 'My New Project',
    type: 'text',
    className: 'full-width'
  },
  {
    title: 'Description',
    name: 'description',
    placeholder: 'My Project is about smart contracts',
    type: 'textarea',
    className: 'full-width text-area'
  },
  {
    title: 'Company Value',
    name: 'companyValue',
    placeholder: '1 ether',
    className: 'half-width-input',
    rule: 'number',
    type: 'text'
  },
  {
    title: 'Stake To Sell',
    name: 'stakeToSell',
    placeholder: '10%',
    className: 'half-width-input',
    rule: 'percentage',
    type: 'text'
  },
  {
    title: 'Finish Criteria',
    name: 'finishCriteria',
    className: 'full-width',
    placeholder: '100%',
    rule: 'percentage',
    type: 'text'
  }
];
export default NewProjectInputs;