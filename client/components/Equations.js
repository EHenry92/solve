import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import {fetchEquations} from './index';
import expand from '../../public/function.js';
import {connect} from 'react-redux';


export class Equations extends Component {
    componentWillMount()  {
      this.props.fetchEquations();
    }

    render ()   {
        return (
            <div>
              <ul>
              {
                this.props.equations.map(equation => {
                  return (
                      <li key={equation.id}>
                      <span><NavLink to={`equation/${equation.id}`}>*</NavLink></span>
                      <span>{expand(equation)}</span>
                      </li>
                  )
                })
              }
              </ul>
            </div>
        )
    }
}

const mapStateToProps = ({equations}) => ({equations: equations.list});
const mapDispatchToProps = {fetchEquations};
export default connect(mapStateToProps, mapDispatchToProps)(Equations);
