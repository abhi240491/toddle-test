const Assignment = require('../models/Assignment');
//const fs = require('fs')
exports.readAll = async (req, res) => {
	try {
		const assignments = await Assignment.find({})
		res.json({ assignments });
	} catch (err) {
		console.log(err, 'productController.readAll error');
		res.status(500).json({
			errorMessage: 'Please try again later',
		});
	}
}
exports.update = async(req,res) => {
    const assignmentId = req.params.assignmentId;
    //how to get assignmentId
    const assignment = await Assignment.findById(assignmentId);
    console.log(assignment);
    try{
        for (let i = 0; i<assignment.students.length; i++){
            if(assignment.students[i].studMail === req.body.studMail){
                //check for pre-existing submission
                if(assignment.students[i].submissionStatus){
                    return res.status(400).json({
                        errorServerMsg: 'Only one submission allowed. Already submitted',
                    })
                }
                assignment.students[i].submission = req.body.submission;
                assignment.students[i].submissionStatus = true;
                assignment.students[i].delayed = (req.body.date>assignment.date);
            }
            break;
        }
        await assignment.save();
        res.json({
            successServerMsg:`${title} was created`,
            assignment 
        })

    } catch(err){
        console.log(err,'Assignment.Create Error')
        
    res.status(500).json({
        errorServerMsg: "Please try again later",
    });
    }
}