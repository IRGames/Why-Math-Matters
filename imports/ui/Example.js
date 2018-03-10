import React, { Component } from 'react';
import { Transition } from 'react-transition-group';
import { withTracker } from 'meteor/react-meteor-data';
import { Collections } from '../misc/Collection.js';


// App component - represents the whole app
export default class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: '',
    };
  }

  collection(){
    return (
      <div>

      </div>
    );
  }

  render() {
    return(
      <div>
      butts
      {this.collection()}
      </div>
    );
  }
}

/*
Template.body.helpers({
collection() {
return Examples.find({});
},
});
*/
