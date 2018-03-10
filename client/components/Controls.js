import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchEquation, postStep, createStep, destroySteps} from '../store';
import {ThisOrThat, PopOverlay} from './Common/index';
import {expand} from '../../public/function.js';
import Algebra from './Algebra';
import history from '../history';


export class Controls extends Component{
    constructor (props) {
      super(props);
      this.state = {
       operation: 'multiply',
       showEnd: true
      }
      this.singleClick = this.singleClick.bind(this);
      this.MulOrDivHandler = this.MulOrDivHandler.bind(this);
    }
    componentWillMount()  {
      const eqId = this.props.id;
      this.props.fetchEquation(eqId);
      this.props.createStep(eqId);
    }
    singleClick(evt)  {
      evt.preventDefault();
      const {name, value} = evt.target;
      let pos = name === 'x' ? 'Co' : 'Const';
      let operation = value === '+' ? 'add' : 'sub';
      this.props.postStep(operation, 1, this.props.equation.solution,  pos);
    }
    MulOrDivHandler(evt)  {
      evt.preventDefault();
      this.props.postStep(this.state.operation, evt.target.amount.value, this.props.equation.solution)
    }


    render () {
      const {equation, id} = this.props;
      return (
      <div id="controls">
        {
          (this.props.complete && this.state.showEnd) &&
          <PopOverlay
              closeText={'Close'}
              onClose={() => {history.push('/equations')}}
              headerText={'Solve'}
              >
              <div>{expand(this.props.equation)}</div>
              <Algebra />
          </PopOverlay>
        }
        {
          !this.props.complete &&
        <div>
          <div style={{display: 'flex', flexDirection: 'row'}}>
          {
            [`${equation.var}`, '1'].map(term => (
                <div key={term}>
                  <ThisOrThat
                    text= {term}
                    onClick={this.singleClick}
                    type={'button'}
                    leftButton={{
                        value: `+`,
                        name: term
                      }}
                    rightButton={{
                      value: `-`,
                      name: term
                    }}
                  />
                </div>
            ))
          }
          </div>
          <form
            name= "operation"
            onSubmit = {this.MulOrDivHandler}>
              <ThisOrThat
                text={''}
                onClick={(evt) => {this.setState({operation: evt.target.value})}}
                type={'radio'}
                leftButton={{
                    text: 'multiply',
                    name: 'multiplyOrDivide',
                    value: 'multiply'
                  }}
                rightButton={{
                  text: 'divide',
                  name: 'multiplyOrDivide',
                  value: 'divide'
                }}
              />
              <label>
                <input
                  style={{width: 30}}
                  name="amount"
                  type= "number" />
              </label>
              <button
                className ="leftBtn"
                name="left"
                >Go</button>
          </form>
        </div>
        }
        <div>
            <button onClick={() => {
              this.props.createStep(id)
              }}
              >Reset</button>
            <button>Solution</button>
        </div>
      </div>
      )
  }
}

const mapStateToProps = ({equations, steps}) => ({equation: equations.selected, complete: steps.solved});
const mapDispatchToProps = {fetchEquation, postStep, createStep, destroySteps};
export default connect(mapStateToProps, mapDispatchToProps)(Controls);

