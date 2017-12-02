import React, {Component} from 'react';
import {fetchEquation} from './index';
import postStep from '../store/reducer';
import Controls from './Controls';
import Visual from './Visual';
import Algebra from './Algebra';
import {expand} from '../../public/function.js';
import {connect} from 'react-redux';

export class SingleEquation extends Component {

    // componentWillMount()    {
    //     const eqId = this.props.match.params.id;
    //     this.props.fetchEquation(eqId);
    // }
    render ()   {
        const equation = this.props.selected;
        let expanded, warning;
        if (Object.keys(equation).length !== 0)  {
            expanded = expand(equation);
        }
        return (
        <div id="singleEquation">
            <div>
                <div className = "center-align">
                   <h3> {expanded} </h3>
                </div>
                <div>Messages:
                  <span> {warning}
                    </span>
                  </div>
                <Controls
                  id = {this.props.match.params.id}
                />
            </div>
            <div>
             <div id="box">
                        <Visual />
                        <Algebra />
                     </div>

            </div>
        </div>
        )
    }
}

const mapStateToProps = ({equations, steps}) => ({selected: equations.selected, steps: steps.list, lastStep: steps.lastStep});
const mapDispatchToProps = {fetchEquation, postStep};
export default connect(mapStateToProps, mapDispatchToProps)(SingleEquation);
