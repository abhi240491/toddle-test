import React from "react";
import { Link } from "react-router-dom";
// redux
import { useDispatch } from "react-redux";
import { deleteAssignment } from "../redux/actions/assignmentActions";

const Card = ({ assignment }) => {
  
  const dispatch = useDispatch();
  console.log("Inside CARD",assignment);
  console.log("Students:",assignment.students);
  return (
    <div className = 'row'>
    <div className ="col-md-12">
    <div className ="card-body">
      <h5 className ="card-title">Title: {assignment.title}</h5>
      <p className ="card-text">Description {assignment.description}</p>
      <p className ="card-text">Publish Date{assignment.createdAt}</p>
      <p className ="card-text">Deadline {assignment.deadline}</p>
      <p className ="card-text">Status: {assignment.status}</p>      
      {assignment.students.map((student) => (
        <>
        <p className ="card-text">Name: {student?.studName}</p>
        <p className ="card-text">Email: {student?.studMail}</p>
        <p className ="card-text">SumbissionStatus {student?.submissionStatus?'submitted':'false'}</p>
        {student.submission?<p className ="card-text">Submission: {student?.submission}</p>:<></>}
        </>
      ))}

      <a href="#" className ="btn btn-primary"></a>
    </div>
    <div className='card-body text-center h-10'>
					<Link 
						to ={`/tutor/edit/assignment/${assignment._id}`}
						type='button'
						className='btn btn-secondary btn-sm mr-1 my-1'
					>
						<i className='far fa-edit pr-1'></i>
						Edit
					</Link>
					<button type = 'button' className = 'btn btn-danger btn-sm' onClick={() => dispatch(deleteAssignment(assignment._id))}>
						<i className = 'far fa-trash-alt pr-1'></i>
						Delete
					</button>
					</div>
    </div>
  </div>
 );
};

          {/*<div className Name="card-body text-center h-20">
            <p>
              {assignment.students}
            </p>
          </div>
          
          <div className Name="card-body text-center h-10">
            <Link
              to={`/admin/edit/assignment/${assignment._id}`}
              type="button"
              className Name="btn btn-secondary btn-sm mr-1 my-1"
            >
              <i className Name="far fa-edit pr-1"></i>
              Edit
            </Link>
            <button
              type="button"
              className Name="btn btn-danger btn-sm"
              onClick={() => dispatch(deleteAssignment(assignment._id))}
            >
              <i className Name="far fa-trash-alt pr-1"></i>
              Delete
            </button>
          </div>
           */}
        
 
export default Card;
