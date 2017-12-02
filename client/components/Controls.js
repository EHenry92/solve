import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchEquation, postStep, createStep, destroySteps} from './index';


export class Controls extends Component{
    constructor (props) {
      super(props);
      this.operation = 'multiply';
      this.singleClick = this.singleClick.bind(this);
      this.submitHandler = this.submitHandler.bind(this);
      this.changeHandler = this.changeHandler.bind(this);
      this.resetHandler = this.resetHandler.bind(this);
    }
    componentWillMount()  {
    //   $(document).ready(function() {
    //     $('select').material_select();
    //   });
      const eqId = this.props.id;
      this.props.fetchEquation(eqId);
      this.props.createStep(eqId);
    //   $(document).ready(function() {
    //     $('select').material_select();
    //   });
    }
    singleClick(evt)  {
      evt.preventDefault();
      const operation = evt.target.value.slice(0, 3);
      const column = evt.target.value.slice(3);
      this.props.postStep(column, operation, 1)
    }
    submitHandler(evt)  {
      evt.preventDefault();
      const operation = evt.target.multiplyOrDivide.value;
      const amount = evt.target.amount.value;
      const side = evt.target.name;
      this.props.postStep(side, operation, amount);
    }
    changeHandler(evt)  {
      evt.preventDefault();
            console.log('the change')

      if (this.operation === 'multiply') {this.operation = 'divide'}
      else {this.operation = 'multiply'}
    }
    resetHandler(evt) {
      evt.preventDefault();
      this.props.createStep(this.props.id);
    }

    render () {
      return (
      <div id="controls">
          <div>
          <table>
          <thead>
              <tr >
              <th className = "right-align">Equation</th>
              <th className = "left-align">Controls</th>
              </tr>
              <tr>
              <th className = "center-align">Left Expression</th>
              <th className = "center-align">Right Expression</th>
              </tr>
          </thead>
              <tbody>
                  <tr>
                    <td className = "center-align">
                      <button
                          className="waves-effect waves-light #2196f3 blue"
                          onClick={this.singleClick}
                          value={'addlCo'}
                          >+{this.props.equation.var}</button>
                          <span>Variable:</span>
                      <button
                          className="waves-effect waves-light #2196f3 blue"
                          onClick={this.singleClick}
                          value={'sublCo'}
                          >-{this.props.equation.var}</button>
                    </td>
                    <td className = "center-align">
                      <button
                          className="waves-effect waves-light #2196f3 blue"
                          onClick={this.singleClick}
                          value={'addrCo'}
                          >+{this.props.equation.var}</button>
                          <span>Variable:</span>
                      <button
                          className="waves-effect waves-light #2196f3 blue"
                          onClick={this.singleClick}
                          value={'subrCo'}
                          >-{this.props.equation.var}</button>
                    </td>
                  </tr>
                  <tr>
                    <td className = "center-align">
                        <button
                            className="waves-effect waves-light #2196f3 blue"
                            onClick={this.singleClick}
                            value={'addlConst'}
                            >+1</button>
                            <span>Constant:</span>
                        <button
                            className="waves-effect waves-light #2196f3 blue"
                            onClick={this.singleClick}
                            value={'sublConst'}
                            >-1</button>
                    </td>
                    <td className = "center-align">

                        <button
                            className="waves-effect waves-light #2196f3 blue"
                            onClick={this.singleClick}
                            value={'addrConst'}
                            >+1</button>
                            <span>Constant:</span>
                        <button
                          className="waves-effect waves-light #2196f3 blue"
                            onClick={this.singleClick}
                            value={'subrConst'}
                            >-1</button>
                    </td>
                  </tr>
                  <tr>
                    <td className = "center-align">
                      <form
                          name= "left"
                          onSubmit = {this.submitHandler}>

                          <input
                            id="multiplyLeft"
                            type="radio"
                            name="multiplyOrDivide"
                            value = "multiply"
                            defaultChecked = {true}
                            onChange = {this.changeHandler}
                          />
                          <label htmlFor="multiplyLeft" > multiply
                        </label>

                          <input
                            id="divideLeft"
                            type="radio"
                            name="multiplyOrDivide"
                            value="divide"
                            defaultChecked = {false}
                            onChange = {this.changeHandler}
                          />
                          <label htmlFor="divideLeft"> divide
                        </label>
                        <label>
                          <input
                            style={{width: 30}}
                            name="amount"
                            type= "number" />
                      </label>
                      <button>Go</button>
                      </form>
                    </td>
                    <td className = "center-align">
                    <form
                          name= "right"
                          onSubmit = {this.submitHandler}>

                          <input
                            id="multiplyRight"
                            type="radio"
                            name="multiplyOrDivide"
                            value = "multiply"
                            defaultChecked = {true}
                            onChange = {this.changeHandler}
                          />
                           <label htmlFor="multiplyRight"> multiply
                        </label>

                          <input
                            id="divideRight"
                            type="radio"
                            name="multiplyOrDivide"
                            value="divide"
                            defaultChecked = {false}
                            onChange = {this.changeHandler}
                          />
                          <label htmlFor="divideRight"> divide
                        </label>
                        <label>
                          <input
                            style={{width: 30}}
                            name="amount"
                            type= "number" />
                      </label>
                      <button>Go</button>
                      </form>
                    </td>
                  </tr>
          </tbody>
      </table>
          </div>
          <div>
              <button onClick={this.resetHandler}>Reset</button>
              <button>Solution</button>
          </div>
      </div>
      )
  }
}

const mapStateToProps = ({equations, steps}) => ({equation: equations.selected, lastStep: steps.lastStep});
const mapDispatchToProps = {fetchEquation, postStep, createStep, destroySteps};
export default connect(mapStateToProps, mapDispatchToProps)(Controls);
