import { Meteor } from 'meteor/meteor';
import '../imports/misc/Collection.js';
import '../imports/misc/UserLikes.js';
import GlobalVars from '../imports/misc/GlobalVars.js';

var smtp = {
  username: process.env.MAILGUN_USERNAME,
  password: process.env.MAILGUN_PASSWORD,
  server: 'smtp.mailgun.org',
  port: 587
};

Meteor.startup(() => {
  process.env.MAIL_URL = "smtp://" + encodeURIComponent(smtp.username) + ":" +
  encodeURIComponent(smtp.password) + "@" + encodeURIComponent(smtp.server) +
  ":" + smtp.port;
});

Meteor.methods({
  getTopics(courseName){
    var topicsList = JSON.parse(Assets.getText('Topics.json'));
    return topicsList;
    //return topicsList[courseName].topics;
  },
  sendEmail(texts) {
    var d = new Date();
    this.unblock();
    Email.send({
      to: "Reviews <lolmathstinks123@gmail.com>",
      from: "Reviews <lolmathstinks123@gmail.com>",
      subject: d.toString(),
      text: texts
    });
  },
});

ServiceConfiguration.configurations.remove({
    service: "facebook"
});

ServiceConfiguration.configurations.insert({
    service: "facebook",
    appId: process.env.FACEBOOK_APP_ID,
    secret: process.env.FACEBOOK_APP_SECRET
});
