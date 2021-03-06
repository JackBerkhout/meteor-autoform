studentData = "StudentData";  // avoid typos, this string occurs many times.

StudentData = new Mongo.Collection(studentData);

Meteor.methods({
    /**
     * Invoked by autoform to add a new Student Data record.
     * @param doc The StudentData document.
     */
    addStudentData: function (doc) {
        console.log("Adding", doc);
        check(doc, StudentData.simpleSchema());
        StudentData.insert(doc, function (err, docID) {
            console.log("DocID: ", docID);
        });
        Router.go('/');
    },
    /**
     * Invoked by autoform to update a Student Data record.
     * @param doc The StudentData document.
     * @param docID It's ID.
     */
    updateStudentData: function (doc, docID) {
        console.log("Updating", doc);
        check(doc, StudentData.simpleSchema());
        StudentData.update({_id: docID}, doc);
        Router.go('/');
    },
    /**
     * Invoked by clicking the Delete key in the Student list.
     * @param docID It's ID.
     */
    deleteStudentData: function (docID) {
        console.log("Deleting docID: " + docID);
        StudentData.remove({_id: docID});
    },
    populateStudentData: function (docID) {
        console.log("Populating");
        var studentData = [
            {
                name: "Mary Foo",
                bio: "I like biology.",
                hobbies: ["Surfing", "Running"],
                level: "Freshman",
                gpa: 1,
                majors: ["Biology"]
            },
            {
                name: "Jack Bar",
                bio: "I like meteorjs.",
                hobbies: ["Biking", "Paddling"],
                level: "Senior",
                gpa: 2,
                majors: ["Physics", "Math"]
            },
            {
                name: "Theuy",
                bio: "Talented Professional",
                hobbies: ["Surfing", "Running", "Biking", "Paddling"],
                level: "Senior",
                gpa: 4,
                majors: ["Physics", "Math", "Biology"]
            }
        ];

        /**
         * Initialize the StudentData collection if empty.
         */
        // if (StudentData.find().count() === 0) {
            _.each(studentData, function (student) {
                var count = StudentData.find({name: student.name}).count();
                // console.log(count);
                if (count == 0) {
                    console.log("Inserting: " + student.name);
                    StudentData.insert(student);
                }
            });
        // }
    }

// ,
    /**
     * List Student Data records.
     */
    // listStudentData: function() {
    //   // console.log("Listing");
    //   return StudentData.find({}, {sort: {name: 1}}).fetch();
    // }
});

// Publish the entire Collection.  Subscription performed in the router.
if (Meteor.isServer) {
    Meteor.publish(studentData, function () {
        return StudentData.find();
    });
}


/**
 * Create the schema for Student Data.
 * See: https://github.com/aldeed/meteor-autoform#common-questions
 * See: https://github.com/aldeed/meteor-autoform#affieldinput
 */
StudentData.attachSchema(new SimpleSchema({
    name: {
        label: "Name",
        type: String,
        optional: false,
        max: 20,
        autoform: {
            group: studentData,
            placeholder: "John Doe"
        }
    },
    bio: {
        label: "Bio",
        type: String,
        optional: true,
        max: 1000,
        autoform: {
            group: studentData,
            placeholder: 'Short (less than 1000 characters) biographical statement.',
            rows: 5
        }
    },
    hobbies: {
        label: "Hobbies",
        type: [String],
        optional: true,
        allowedValues: ['Surfing', 'Running', 'Biking', 'Paddling'],
        autoform: {
            group: studentData,
            type: "select-checkbox-inline"
        }
    },
    level: {
        label: "Level",
        type: String,
        optional: false,
        allowedValues: ['Freshman', 'Sophomore', 'Junior', 'Senior'],
        autoform: {
            group: studentData,
            type: 'select-radio-inline'
        }
    },
    gpa: {
        label: "GPA",
        type: Number,
        optional: false,
        allowedValues: [0, 1, 2, 3, 4],
        autoform: {
            group: studentData,
            options: [
                {label: "0.0 - 0.99 GPA", value: 0},
                {label: "1.0 - 1.99 GPA", value: 1},
                {label: "2.0 - 2.99 GPA", value: 2},
                {label: "3.0 - 3.99 GPA", value: 3},
                {label: "4.0 (or greater) GPA", value: 4}
            ]
        }
    },
    majors: {
        label: "Majors",
        type: [String],
        optional: true,
        allowedValues: ['Physics', 'Math', 'Biology', 'Chemistry'],
        autoform: {
            group: studentData,
            type: 'select-multiple'

        }
    }
}));
