import React, { Component } from 'react';

export default class Splash extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div className = "background">
        <div className = "displayCenter">
          Let's compile a list of anecdotes that show students how mathematics applies in our world.
          <br /> <br />
          Click to continue
        </div>
      </div>
    );
  }
}
