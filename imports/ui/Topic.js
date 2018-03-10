import React, { Component } from 'react';
import { Transition } from 'react-transition-group';
import Example from './Example.js';
import { Collections } from '../misc/Collection.js';
// App component - represents the whole app
export default class Topic extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.expandWithTransition = this.expandWithTransition.bind(this);
    this.state = {
      collapsed: true,
      inputValue: '',
    };
  }

  handleClick(){
    this.setState({collapsed: !this.state.collapsed});
  }

  handleImageClick(event){
    event.preventDefault();
  }

  handleSubmit(event){
    event.preventDefault();
    var name1 = this.props.name;
    var text1 = this.state.text;

    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        console.log('connected');
        Collections.insert({
          name: name1,
          text: text1,
        });
        //Meteor.call('sendEmail', this.state.inputValue);
      }else{
        alert('You must be logged into Facebook to submit new examples!');
      }
    });

    console.log('text is ' + Collections.find({})[0]);
  }

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  expandWithTransition(){
    return (
      <Transition in = {!this.state.collapsed} timeout = {{
        enter: 0,
        exit: duration
      }}>
      {(state) => {
        if(state ==='exited'){
          return null
        }else{
          return(
            <div style = {{
              ...defaultStyle,
              ...transitionStyles[state]
            }}>
            {this.handleCollapseContent()}
            </div>
          )
        }
      }}
      </Transition>
    );
  }

  handleCollapseContent(){
    return (
      <div className = 'submission'>
      <Example />
      <form>
      <textarea value = {this.state.inputValue} onChange={evt => this.updateInputValue(evt)} type="text" name="text" placeholder="If you have an example of this topic, please share!" />
      <br/>
      <button onClick = {evt => this.handleImageClick(evt)}> Upload an image</button>
      <button onClick = {evt => this.handleSubmit(evt)}>Submit</button>
      </form>
      </div>
    );
  }

  render(){
    return(
      <div>
      <li onClick = {this.handleClick}>
      {this.props.name}
      </li>
      {this.expandWithTransition()}
      </div>
    );
  }
}
/*
Template.body.events({
'click button': function(event) {
console.log('called');
event.preventDefault();
}
});
*/
