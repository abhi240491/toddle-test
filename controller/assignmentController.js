const Assignment = require('../models/Assignment');
exports.create = async(req,res) => {
    try{
        let assignment = new Assignment()
        assignment.title = req.body.title;
        assignment.description = req.body.description;
        for (let entry of req.body.students){
            assignment.students.push({studName: entry.name,studMail:entry.email})
        }     //error
        assignment.publishDate = req.body.publishDate;
        assignment.deadline = req.body.deadline;
        assignment.status = req.body.status;
        console.log(assignment)
        await assignment.save();
        res.json({
            successServerMsg:`Object was successfully created`,
            assignment 
        })

    } catch(err){
        console.log(err,'Assignment.Create Error')
        
    res.status(500).json({
        errorServerMsg: "Please try again later",
    });
    }
}
exports.readAll = async (req, res) => {
	try {
		const assignments = await Assignment.find({})
        res.json({ assignments });
	} catch (err) {
		console.log(err, 'assignmentController.readAll error');
		res.status(500).json({
			errorServerMsg: 'Please try again later',
		});
	}
}

exports.read = async (req, res) => {
	try {
		const assignmentId = req.params.assignmentId;
		const assignment = await Assignment.findById(assignmentId);
		res.json(assignment);
	} catch (err) {
		console.log(err, 'AssginmentController.read error');
		res.status(500).json({
			errorMessage: 'Please try again later',
		});	
    }
}

exports.update = async (req, res) => {
	//
    try{
    const assignmentId = req.params.assignmentId;
    const prevAssignment = await Assignment.findByIdAndUpdate(assignmentId,req.body);
    res.json({ 
        successServerMsg: 'Successfully updated assignment'
    })
} catch(err){
    console.log(err,"Assignment update error");
        res.status(500).json({
            errorServerMsg: 'Please try again later',
        })
}
}

exports.delete = async (req,res) => {
    console.log("assignmentController assignmentID",req.params.assignmentId);
    try{
        const assignmentId = req.params.assignmentId;
        const deleteAssignment = await Assignment.findByIdAndDelete(assignmentId);
        res.json(deleteAssignment);

    } catch(err){
        console.log(err,"Assignment delete error");
        res.status(500).json({
            errorServerMsg: 'Please try again later',
        })
    }

}