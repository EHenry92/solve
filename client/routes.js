import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Router} from 'react-router'
import {Route, Switch} from 'react-router-dom'
import history from './history'
// import {Main, Login, Signup, UserHome} from './components'
import Home from './components/Home';
import SingleEquation from './components/SingleEquation';
import Equations from './components/Equations';
import NavBar from './components/NavBar';
/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
  }

  render () {

    return (
      <Router history={history}>
      <div>
        <NavBar />
          <Switch>
            {/* Displays our Login component as a fallback */}
            <Route exact path="/" component={Home} />
              <Route exact path="/equations" component={Equations} />
              <Route path="/equation/:id" component={SingleEquation} />
              <Route component={Home} />
          </Switch>
        </div>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    // isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {


  }
}

export default connect(mapState, mapDispatch)(Routes)


