import React from 'react';
import './css/NewProject.css';
import './css/Inputs.css';
import { NewProjectInputs, inputNames } from '../globals/static';
import Input from './Input';
import Loader from './Loader';

export default class NewProject extends React.Component {
  inputValues = {};
  errorNames = {};
  state = { errors: false };
  ipfsFile(files, name) {
    let fileReader = new FileReader();
    fileReader.onload = () => {
      window.ipfsNode.add(Buffer.from(fileReader.result)).then((res) => {
        this.handleInput(name)(res, true);
        return res;
      });
    }
    fileReader.readAsArrayBuffer(files);
  }
  handleInput = (inputName) => (value, setAsyncValue = false) => {
    if (inputName === 'headerHash') {
      if (setAsyncValue) {
        this.inputValues = {
          ...this.inputValues,
          [inputName]: value[0].hash
        }
        this.clearErrors();
      } else this.ipfsFile(value[0], inputName);
      return;
    }
    if (inputName === 'gallery') {
      if (setAsyncValue) {
        this.inputValues = {
          ...this.inputValues,
          gallery: this.inputValues.gallery ? [
            ...this.inputValues.gallery,
            value[0].hash
          ] : [value[0].hash]
        }
        this.clearErrors();
      } else Array.from(value).forEach(file => this.ipfsFile(file, inputName));
      return;
    }
    this.inputValues = {
      ...this.inputValues,
      [inputName]: value
    }
    this.clearErrors();
  }
  clearErrors() {
    if (this.state.errors) {
      this.errorNames = {};
      this.setState({ errors: false });
    }
  }
  componentDidUpdate({ success: prevSuccess }) {
    const { success } = this.props;
    if (success !== prevSuccess && success) {
      this.redirect()
    }
  }
  renderInputs() {
    return (
      <div className='inputs-container flex wrap full-width'>
        {
          NewProjectInputs.map((inputProps, index) => {
            return <Input {...inputProps}
              key={`input-${index}`}
              error={this.errorNames[inputProps.name]}
              onChange={this.handleInput(inputProps.name)}
            />
          })
        }
      </div>
    )
  }
  redirect() {
    return this.props.history.push('/my-projects');
  }
  async triggerErrors() {
    let arraysWithErrors = await inputNames().filter((inputName) => !this.inputValues[inputName]);
    arraysWithErrors.forEach(input => this.errorNames[input] = 'This field is required');
    if (!this.state.errors) this.setState({ errors: true });
  }
  publish = () => {
    if (Object.keys(this.inputValues).length < 6) {
      return this.triggerErrors();
    }
    const { postNewProject, contract, address } = this.props;
    postNewProject(this.inputValues, contract, address);
  }
  render() {
    const { loading, error } = this.props;
    return (
      <div className='new-project-wrapper full-width flex-center wrap max-width'>
        <div className='new-project-view-container third-background flex wrap'>
          <p className='title main-color full-width'>New Project</p>
          {this.renderInputs()}
          <div className='button-wrapper flex full-width'>
            <button
              onClick={this.publish}
              className='main-background third-color primary-button light'
            >PUBLISH</button>
          </div>
          {
            loading && <Loader />
          }
          {
            error && <p className='txt-error-message full-width five-color light'>{error}</p>
          }
        </div>
      </div>
    )
  }
}
