import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import App from '../imports/ui/App.js';

Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'));
});

window.fbAsyncInit = function() {
  FB.init({
    appId      : '2410241845668819',
    cookie     : true,
    xfbml      : true,
    version    : 'v2.10'
  });

  FB.AppEvents.logPageView();
};
