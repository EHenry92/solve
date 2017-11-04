import React, {Component} from 'react';
import {fetchEquation} from './index';
import postStep from '../store/reducer';
import Controls from './Controls';
import Visual from './Visual';
import Algebra from './Algebra';
import expand from '../../public/function.js';
import {connect} from 'react-redux';

export class SingleEquation extends Component {
    constructor () {
        super();
        this.clickHandlerVar = this.clickHandlerVar.bind(this);
        this.clickHandlerConst = this.clickHandlerConst.bind(this);

    }
    componentWillMount()    {
        const eqId = this.props.match.params.id;
        this.props.fetchEquation(eqId);
    }

    clickHandlerVar(evt)   {
        evt.preventDefault();
        const dir = evt.target.value;
        switch (dir) {
            case 'addVarRight':
                this.props.postStep('rCo', 1);
                break;
            case 'subVarRight':
                this.porps.postStep('rCo', -1);
                break;
            case 'addVarLeft':
                this.porps.postStep('lCo', 1);
                break;
            case 'subVarLeft':
                this.props.postStep('lCo', -1);
                break;
            default:
              break;
        }
    }
    clickHandlerConst(evt)   {
        evt.preventDefault();
        const dir = evt.target.value;
        switch (dir) {
            case 'addConstRight':
                return this.props.postStep('rConst', 1);
            case 'subConstRight':
                return this.props.postStep('rConst', -1);
            case 'addConstLeft':
                return this.porps.postStep('lConst', 1);
            case 'subConstLeft':
                return this.props.postStep('rConst', -1);
            default:
        }
    }

    render ()   {
        const equation = this.props.selected;
        const step = this.props.lastStep;
        let expanded;
        if (Object.keys(equation).length !== 0)  {
            expanded = expand(equation);
        }
        return (
        <div id="singleEquation">
            <div>
                <div>
                    {expanded}
                </div>
                <Controls
                  variableClick = {this.clickHandlerVar}
                  constClick = {this.clickHandlerConst}
                  var = {equation.var}
                />
            </div>
            <div>
             <div id="box">
                        <Visual />
                        {/* <Algebra equation ={equation} /> */}
                     </div>

            </div>
        </div>
        )
    }
}

const mapStateToProps = ({selected, steps, lastStep}) => ({selected, steps, lastStep});
const mapDispatchToProps = {fetchEquation, postStep};
export default connect(mapStateToProps, mapDispatchToProps)(SingleEquation);
