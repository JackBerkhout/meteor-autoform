Router.configure({
  layoutTemplate: 'layout',
  waitOn: function() { return Meteor.subscribe("StudentData"); },
  loadingTemplate: 'loading'
});

Router.route('/add', {
  name: 'AddStudentData'
});

Router.route('/edit/:_id', {
  name: 'UpdateStudentData',
  data: function() { return StudentData.findOne(this.params._id); }
});

Router.route('/view/:_id', {
  name: 'ViewStudentData',
  data: function() { return StudentData.findOne(this.params._id); }
});

Router.route('/', {
  name: 'ListStudentData',
  data: function() { return StudentData.find({}, {sort: {name: 1}}).fetch(); }
});
