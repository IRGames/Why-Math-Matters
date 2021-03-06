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
      textInputValue: '',
      linkInputValue: '',
    };
  }

  handleClick(){
    this.setState({collapsed: !this.state.collapsed});
  }

  handleSubmit(event){
    event.preventDefault();
    var d = new Date();
    d = d.toString();

    if(idToken == ''){
      alert("Please sign in before posting!")
    }else{
      if(Collections.find({author: idToken}).count() < 4){
        Collections.insert(
          {
            name: this.props.name,
            text: this.state.textInputValue,
            src: this.state.linkInputValue,
            author: idToken,
            date: d,
            votes: 0,
            approved: false,
          });
          alert('Thanks for your submission!  Your example will be reviewed.');
        }else{
          alert('In order to prevent spam, each user is limited to four contributions.');
        }
      }
    }

    updateTextInputValue(evt) {
      this.setState({
        textInputValue: evt.target.value
      });
    }

    updateLinkInputValue(evt) {
      this.setState({
        linkInputValue: evt.target.value
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
          {this.displayAllExamples()}
          <form>
            <textarea value = {this.state.textInputValue} onChange={evt => this.updateTextInputValue(evt)} type="text" name="text" placeholder="If you have an example of this topic, please share!" />
            <br/>
            <input type="text" value = {this.state.linkInputValue} onChange={evt => this.updateLinkInputValue(evt)} placeholder = "If you want to upload an image, paste a URL here!" />
            <br />
            <button onClick = {evt => this.handleSubmit(evt)}>Submit</button>
          </form>
        </div>
      );
    }

    displayAllExamples(){
      return (
        Collections.find({name: this.props.name, approved: true}, { sort: { votes: -1 } }).map( function(obj, index) {
          return(
            <div className = 'example' key = {index}>
              <Example key = {obj._id} src = {obj.src} text = {obj.text} objID = {obj._id}/>
            </div>
          )
        })
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

  //For later:
  //        <input onChange = {this.handleChange} name="files" id="files" type="file"/>
