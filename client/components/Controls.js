import React, {Component} from 'react';
import store from '../store';
import {connect} from 'react-redux';
import {fetchEquation, postStep} from '../store/reducer';


export class Controls extends Component{
    constructor (props) {
      super(props);
      this.variableClick = this.variableClick.bind(this);
      this.constClick = this.constClick.bind(this)
    }
    componentWillMount()    {
      const eqId = this.props.id;
      this.props.fetchEquation(eqId);
    }

    variableClick(evt)   {
      evt.preventDefault();
      const dir = evt.target.value;
      switch (dir) {
          case 'addVarRight':
              this.props.postStep('rCo', 1);
              break;
          case 'subVarRight':
              this.props.postStep('rCo', -1);
              break;
          case 'addVarLeft':
              this.props.postStep('lCo', 1);
              break;
          case 'subVarLeft':
              this.props.postStep('lCo', -1);
              break;
          default:
            break;
      }
    }
    constClick(evt)   {
      evt.preventDefault();
      const dir = evt.target.value;
      switch (dir) {
          case 'addConstRight':
              return this.props.postStep('rConst', 1);
          case 'subConstRight':
              return this.props.postStep('rConst', -1);
          case 'addConstLeft':
              return this.props.postStep('lConst', 1);
          case 'subConstLeft':
              return this.props.postStep('lConst', -1);
          default:
      }
    }

    render () {
      return (
      <div id="controls">
          <div>
          <table>
          <thead>
              <tr>
                  <th>Controls</th>
              </tr>
              <tr>
              <th>Left Expression</th>
              <th>Right Expression</th>
              </tr>
          </thead>
              <tbody>
                  <tr>
                    <td>
                      <span>Variable:</span>
                      <button
                          onClick={this.variableClick}
                          value={'addVarLeft'}
                          >+</button>
                      <span className ="variable">{this.props.equation.var}</span>
                      <button
                          onClick={this.variableClick}
                          value={'subVarLeft'}
                          >-</button>
                    </td>
                    <td>
                      <span>Variable:</span>
                      <button
                          onClick={this.variableClick}
                          value={'addVarRight'}
                          >+</button>
                      <span className ="variable">{this.props.equation.var}</span>
                      <button
                          onClick={this.variableClick}
                          value={'subVarRight'}
                          >-</button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                        <span>Constant:</span>
                        <button
                            onClick={this.constClick}
                            value={'addConstLeft'}
                            >+</button>
                        <span className = "Constant">1</span>
                        <button
                            onClick={this.constClick}
                            value={'subConstLeft'}
                            >-</button>
                        </td>
                    <td>
                        <span>Constant:</span>
                        <button
                            onClick={this.constClick}
                            value={'addConstRight'}
                            >+</button>
                        <span className = "Constant">1</span>
                        <button
                            onClick={this.constClick}
                            value={'subConstRight'}
                            >-</button>
                    </td>
                  </tr>
          </tbody>
      </table>
          </div>
          <div>
              <button>Reset</button>
              <button>Solution</button>
          </div>
      </div>
      )
  }
}

const mapStateToProps = ({selected, lastStep}) => ({equation: selected, lastStep});
const mapDispatchToProps = {fetchEquation, postStep};
export default connect(mapStateToProps, mapDispatchToProps)(Controls);
