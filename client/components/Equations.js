import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import {fetchEquations} from './index';
import {expand} from '../../public/function.js';
import {connect} from 'react-redux';


export class Equations extends Component {
    componentWillMount()  {
      this.props.fetchEquations();
    }

    render ()   {
        return (
            <div>
              <ul className="collection">
              {
                this.props.equations.map(equation => {
                  return (
                      <li className = "collection-item"key={equation.id}>
                      <NavLink to={`equation/${equation.id}`}>
                      {expand(equation)}</NavLink>
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
