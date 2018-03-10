import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Course from './Course.js';
import { Accounts } from 'meteor/accounts-base';



export default class App extends Component {
  constructor(props) {
    super(props);
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


  render() {
    return (
      <div className="container">
        <header>
          <h1>Examples of Mathematics</h1>
        </header>
        <p>Select a course and topic to explore how others have used the mathematical idea!</p>
        <ul className = 'courses'>
        {this.courses()}
        </ul>
      </div>
    );
  }
}
