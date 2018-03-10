import { Meteor } from 'meteor/meteor';
import '../imports/misc/Collection.js';

var smtp = {
  username: 'postmaster@sandboxd8bf6d97361f499c9553291711102f50.mailgun.org',
  password: 'fe24d4a92e9fc5bed2186b7f48abcbfa-2b4c5a6c-3a6e1e94',
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
    appId: '1581525701943620',
    secret: '1cccd3a30818fcad1f53a5469cd2e205'
});
