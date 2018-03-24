import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Course from './Course.js';
import Splash from './Splash.js';
import { Transition } from 'react-transition-group';
import GlobalVars from '../misc/GlobalVars.js';
import { Accounts } from 'meteor/accounts-base';



export default class App extends Component {
  constructor(props) {
    super(props);

    this.splashDecision = this.splashDecision.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      splash: true,
    }
  }

  courses(){
    var defaultCourses = [
      'Algebra 1',
      'Algebra 2',
      'Geometry/Trig',
      'Precalculus',
      'Calculus'
    ];

    return defaultCourses.map ((course) => (
      <Course key = {course} name = {course} />
    ));
  }

  handleClick(){
    this.setState({
      splash: false,
    });
  }

  splashDecision(){
    //document.querySelector('meta[name="google-signin-scope"]').setAttribute("content", process.env.GOOGLE_CLIENT_ID);
    if(this.state.splash){
      return(this.animateSplash());
    }else{
      return (this.mainAppDesign());
    }
  }

  animateSplash(){
    return(
      <Transition in = {this.state.splash} timeout = {{
          enter: 0,
          exit: duration
        }}>
        {(state) => {
          if(state === 'exited'){
            return null
          } else{
            return(
              <div style = {{
                  ...defaultStyle,
                  ...transitionStyles[state]
                }}>

                <Splash />

              </div>
            )
          }
        }}
      </Transition>
    );
  }

  mainAppDesign(){
    return(
    <div className="container">
      <header>
        <h1>Examples of Mathematics</h1>
      </header>
      <p>Select a course and topic to explore how others have used the mathematical idea!</p>
      <ul className = 'courses'>
        {this.courses()}
      </ul>
    </div>
  );}

  render() {
    return (
      <div>
        <div onClick = {this.handleClick}>
          {this.splashDecision()}
        </div>
      </div>
    );
  }
}
