import React from 'react';
import { ReactComponent as Arrow } from '../assets/icons/arrow-down.svg';
import './css/DropDown.css';

export default class DropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showList: false,
      selected: `${props.maxVal}%`
    }
    this.generateListItems();
  }

  generateListItems() {
    let { maxVal } = this.props;
    this.dropDownElements = [];
    while (maxVal >= 1) {
      this.dropDownElements = [
        ...this.dropDownElements,
        {
          list: `${maxVal}%`,
          value: maxVal
        }
      ];
      maxVal--;
    }
    return this.dropDownElements;
  }

  handleList = () => {
    this.setState((state) => {
      return { showList: !state.showList }
    })
  }

  selectStake = ({ list, value }) => () => {
    if (this.state.selected !== list) {
      this.setState({ selected: list, showList: false });
      this.props.onChange(value);
    }
  }

  renderList() {
    const { selected } = this.state;
    let elementsToRender = this.dropDownElements.filter(({ list }) => list !== selected);
    return (
      <div className='list-container third-background flex'>
        <div className='scroll-container flex wrap'>
          {
            elementsToRender.map(({ list, value }, index) => {
              return (
                <div
                  key={`dropdown-list-item-${index}`}
                  className='dropdown-list-item'
                  onClick={this.selectStake({ list, value })}
                >
                  <p className='label'>{list}</p>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }

  render() {
    const { showList, selected } = this.state;
    return (
      <div className='site-dropdown-container'>
        <div className='dropdown-header flex' onClick={this.handleList}>
          <p className='dropdrown-title five-color light'>% to invest</p>
          <p className='current-site-label'>{selected}</p>
          <Arrow className={`dropdown-arrow ${showList ? 'open' : 'close'}`} />
        </div>
        {
          showList && this.renderList()
        }
      </div>
    );
  }
}
