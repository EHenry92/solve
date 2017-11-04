// import React, {Component} from 'react';
// import store from '../store';

// export default class Algebra extends Component {
//     constructor (props) {
//         super(props);
//         this.state = store.getState();
//     }
//     componentWillMount () {
//       this.unsubscribe = store.subscribe(() => this.setState(store.getState()))
//     }
//     coponentWillUnmount () {
//       this.unsubscribe();
//     }

//     render ()   {
//         return (
//         <div id="algebra">
//                 {/* {
//                   this.state.steps.map((step, idx) => {
//                   return (
//                     <div key={'step'+idx}> {step}
//                       </div>
//                   )
//                 })
//               } */}
//         </div>
//         )
//     }
// }

// //place an actions on this state that keeps track of the actions performed, and dispalys a list
// //if changed, change the color to red?
