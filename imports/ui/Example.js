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

    FB.getLoginStatus(function(response) {
      //Is there even a facebook user connected?  If not, alert the user
      if(response.status==='connected'){
        var userVote = UserLikes.findOne({"user": response.authResponse.userID, "id": objCollectionsID});
        //If there's already a userVote, try to update the entry
        if(userVote){
          //If they haven't upvoted yet, let 'em
          if(isPos && userVote.votes < 1){
            increaseVote();
          }//Or, if they haven't downvoted yet, let 'em
          else if (!isPos && userVote.votes > -1){
            decreaseVote();
          }
          else{
            alert("Either one thumbs up or one thumbs down, please!");
          }
        }
        else{
          createNewUserLikesEntry();
        }
      }//Close the "connected" conditional
      else{
        alert("please log in!");
      }

      function increaseVote(){
        UserLikes.update({"_id" : userVote._id},{$inc :{"votes": 1}});
        Collections.update({"_id" : objCollectionsID}, {$inc :{"votes": 1}});
      }

      function decreaseVote(){
        UserLikes.update({"_id" : userVote._id},{$inc :{"votes": -1}});
        Collections.update({"_id" : objCollectionsID}, {$inc :{"votes": -1}});
      }

      function createNewUserLikesEntry(){
        var increment = 0;
        if(isPos){
          increment = 1;
        }else{
          increment = -1;
        }
        UserLikes.insert({user: response.authResponse.userID, id: objCollectionsID, votes: increment,});
        Collections.update({"_id" : objCollectionsID}, {$inc :{"votes": increment}});
      }
    });//Close FB.getLoginStatus

    this.setState({votes: Collections.findOne( {"_id" :objCollectionsID}).votes,});
  }


  render() {
    return(
      <div>
      <img src = {this.props.src} alt = "Image not available"/>
      <br />
      {this.props.text}
      <br />
      <img src = "down.png" className = 'smallIcons' onClick = {() => this.handleClick(false)}/>
      {this.state.votes}
      <img src = "up.png" className = 'smallIcons' onClick = {() => this.handleClick(true)}/>
      </div>
    );
  }
}
