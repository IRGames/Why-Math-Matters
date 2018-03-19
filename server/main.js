import { Meteor } from 'meteor/meteor';
import '../imports/misc/Collection.js';
import '../imports/misc/UserLikes.js';
import GlobalVars from '../imports/misc/GlobalVars.js';

var smtp = {
  username: 'postmaster@sandboxd8bf6d97361f499c9553291711102f50.mailgun.org',
  password: '2',
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
    appId: '2',
    secret: '2'
});
