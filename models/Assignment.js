const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
        required: true,
    },
    students:[{
        studName:{
            type:String,
        },
        studMail:{
            type: String,
            required: true,
        },
        submission:{
            type: String,
        },
        submissionStatus: {
            type: Boolean,
            default: false,
        },
        delay:{
            type: Boolean,
        }
    }],
    publishDate:{
        type: Date,
        required: true,
    },
    deadline:{
        type: Date
    },
    status:{
        type: String,
    }

}, 
{timestamps:true})

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;

//questionaire 
//(tutor create, read, update and delete questions)
//title,description,list of students, publishing(ongoing/scheduled) and deadline date.