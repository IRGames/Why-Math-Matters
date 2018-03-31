import React, { Component } from 'react';
import { Transition } from 'react-transition-group';
import { withTracker } from 'meteor/react-meteor-data';
import { Collections } from '../misc/Collection.js';
import { UserLikes } from '../misc/UserLikes.js';


// App component - represents the whole app
export default class Example extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      img: '',
      votes: Collections.findOne( {"_id" :this.props.objID}).votes,
      upvote: false,
      downvote: false,
      voteLimit: 0,
    };
  }

  handleClick(isPos){
    event.preventDefault();

    var objCollectionsID = this.props.objID;

      if(idToken !=''){
        var userVote = UserLikes.findOne({"user": idToken, "id": objCollectionsID});
        //If there's already a userVote, try to update the entry
        if(userVote){
          //If they haven't upvoted yet, let 'em
          if(isPos && userVote.votes < 1){
            this.increaseVote(userVote, objCollectionsID);
          }//Or, if they haven't downvoted yet, let 'em
          else if (!isPos && userVote.votes > -1){
            this.decreaseVote(userVote, objCollectionsID);
          }
          else{
            alert("Either one thumbs up or one thumbs down, please!");
          }
        }
        else{
          this.createNewUserLikesEntry(userVote, objCollectionsID);
        }
      }//Close the "connected" conditional
      else{
        alert("please log in!");
      }

    this.setState({votes: Collections.findOne( {"_id" :objCollectionsID}).votes,});
  }

  increaseVote(userVote, objCollectionsID){
    UserLikes.update({"_id" : userVote._id},{$inc :{"votes": 1}});
    Collections.update({"_id" : objCollectionsID}, {$inc :{"votes": 1}});
  }

  decreaseVote(userVote, objCollectionsID){
    UserLikes.update({"_id" : userVote._id},{$inc :{"votes": -1}});
    Collections.update({"_id" : objCollectionsID}, {$inc :{"votes": -1}});
  }

  createNewUserLikesEntry(userVote, objCollectionsID){
    var increment = 0;
    if(isPos){
      increment = 1;
    }else{
      increment = -1;
    }
    UserLikes.insert({user: idToken, id: objCollectionsID, votes: increment,});
    Collections.update({"_id" : objCollectionsID}, {$inc :{"votes": increment}});
  }

  setNewLines(){
    var text = this.props.text.split("\n");
    return (
      text.map(function (paragraph, index){
        return <div key = {index}>{paragraph}<br/></div>;
      })
    );
  }

  render() {
    return(
      <div>
      <img src = {this.props.src} alt = "Image not available"/>
      <br />
      {this.setNewLines()}
      <br />
      <img src = "down.png" className = 'smallIcons' onClick = {() => this.handleClick(false)}/>
      {this.state.votes}
      <img src = "up.png" className = 'smallIcons' onClick = {() => this.handleClick(true)}/>
      </div>
    );
  }
}
