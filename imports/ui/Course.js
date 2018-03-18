import React, { Component } from 'react';
import Topic from './Topic.js';
import { Transition } from 'react-transition-group';
import GlobalVars from '../misc/GlobalVars.js';

// App component - represents the whole app
export default class Course extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.expandWithTransition = this.expandWithTransition.bind(this);
    this.state = {
      collapsed: true,
      topicsList: []
    };

    if(this.state.topicsList.length == 0){
      Meteor.call('getTopics',(err,res) => this.setState({topicsList:res[this.props.name].topics}))
    }
  }

  handleClick(){
    this.setState({collapsed: !this.state.collapsed});
  }

  expandWithTransition(){
    return (
      <Transition in = {!this.state.collapsed} timeout = {{
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
            {this.handleCollapseContent()}
            </div>
          )
        }
      }}
      </Transition>
    );
  }

  handleCollapseContent(){
      return this.state.topicsList.map ((topic) => (
        <Topic key = {topic} name = {topic} />
      ))
  }

  render() {
    return(
      <div>
      <li onClick = {this.handleClick}>
      {this.props.name}
      </li>
      <ul>
      {this.expandWithTransition()}
      </ul>
      </div>
    );
  }
}
