Template.ListStudentData.helpers({
    /**
     * List Student Data records.
     */
    listStudentData: function() {
        console.log("Listing");
        return StudentData.find({}, {sort: {name: 1}});
    }
});

Template.ListStudentData.events({
    'click .delete': function(event){
        console.log("delete _id: " + this._id);
        Meteor.call('deleteStudentData', this._id, function(err, result){
            if(err) {
                sAlert.error(err.reason || 'There was an error.', {effect: 'jelly'});
            }
            else {
                sAlert.success('Recipe deleted.', {effect: 'jelly'});
            }
        });
    },
    'click .edit': function(event){
        console.log("edit _id: " + this._id);
        Router.go('/edit/' + this._id);
    },
    'click .view': function(event){
        console.log("edit _id: " + this._id);
        Router.go('/view/' + this._id);
    },
    'click .populate': function(event){
        console.log("populate");
        Meteor.call('populateStudentData', function(err, result){
            if(err) {
                sAlert.error(err.reason || 'There was an error.', {effect: 'jelly'});
            }
            else {
                sAlert.success('Populated.', {effect: 'jelly'});
            }
        });
    },
    'click .add': function(event){
        console.log("add");
        Router.go('/add');
    }
});

Template.AddStudentData.events({
    'click .back': function(event){
        console.log("back");
        Router.go('/');
    }
});

Template.UpdateStudentData.events({
    'click .back': function(event){
        console.log("back");
        Router.go('/');
    }
});

Template.ViewStudentData.events({
    'click .back': function(event){
        console.log("back");
        Router.go('/');
    }
});
