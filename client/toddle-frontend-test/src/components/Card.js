import React from "react";
import { Link } from "react-router-dom";
// redux
import { useDispatch } from "react-redux";
import { deleteAssignment } from "../redux/actions/assignmentActions";

const Card = ({ assignment }) => {
  console.log(assignment);
  const dispatch = useDispatch();
  console.log("Inside CARD");
  return (
    <div className = 'row'>
    <div className ="col-md-12">
    <div className ="card-body">
      <h5 className ="card-title">{assignment.title}</h5>
      <p className ="card-text">{assignment.description}</p>
      <a href="#" className ="btn btn-primary">Go somewhere</a>
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
