const Assignment = require('../models/Assignment');
exports.create = async(req,res) => {
    try{
        let assignment = new Assignment()
        assignment.title = req.body.title;
        assignment.description = req.body.description;
        assignment.students = [...req.body.assignedStudents];
        assignment.pusblishDate = req.body.pusblishDate;
        assignment.deadlineDate = req.body.deadlineDate;
        assignment.status = req.body.status;

        await assignment.save();
        res.json({
            successServerMsg:`${title} was created`,
            assignment 
        })

    } catch(err){
        console.log(err,'Assignment.Create Error')
        
    res.status(500).json({
        errorMessage: "Please try again later",
    });
    }
}
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
exports.update = async (req, res) => {
	//
    try{
    const assignmentId = req.params.assignmentId;
    const prevAssignment = await Assignment.findByIdAndUpdate(assignmentId,req.body);
    res.json({ 
        successServerMsg: 'Successfully updated product'
    })
} catch(err){
    console.log(err,"Assignment update error");
        res.status(500).json({
            errorServerMsg: 'Please try again later',
        })
}
}

exports.delete = async (req,res) => {
    try{
        const assignmentId = req.params.assignmentId;
        const deleteProduct = await Product.findByIdAndDelete(assignmentId);
        res.json(deleteProduct);

    } catch(err){
        console.log(err,"Assignment delete error");
        res.status(500).json({
            errorServerMsg: 'Please try again later',
        })
    }

}