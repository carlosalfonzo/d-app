import React from 'react';

export default class Input extends React.Component {
  state = {
    value: undefined
  }
  handleValue = ({ target: { value, files } }) => {
    const { onChange, rule, type } = this.props;
    if (type === 'file') {
      this.setState({ value });
      return onChange(files);
    }
    if (rule === 'number') {
      value = value.replace(' Eth', '');
      value = value.trim();
      let regex = /^[0-9]*\.?[0-9]*$/;
      if (regex.test(value) || value === '') {
        this.setState({ value: `${value} Eth` });
      }
    }
    if (rule === 'percentage') {
      value = value.replace('%', '');
      let regex = /^[-+]?[1-9]\d*$/;
      if (regex.test(value) && value <= 100 || value === '') {
        this.setState({ value: `${value}%` });
      }
    }
    if (!rule) this.setState({ value });
    return onChange(value.trim());
  }
  render() {
    const {
      title,
      placeholder,
      type,
      className,
      error,
      multiple = false
    } = this.props;
    return (
      <div className={`single-input-container flex wrap${className ? ` ${className}` : ''}`}>
        <p className='input-title full-width five-color'>{title}</p>
        {
          type !== 'textarea' ? <input
            type={type}
            placeholder={placeholder}
            className={`${type}-input five-color`}
            onChange={this.handleValue}
            multiple={multiple}
            value={this.state.value ? this.state.value : ''}
          /> : <textarea
              placeholder={placeholder}
              className={`${type}-input five-color`}
              onChange={this.handleValue}
              value={this.state.value ? this.state.value : ''}
              maxLength={255}
              rows={10}
            />
        }
        {
          error !== undefined && <p className='full-width main-color light'>{error}</p>
        }
      </div>
    )
  }
}
