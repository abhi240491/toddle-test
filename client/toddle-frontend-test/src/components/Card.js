import React from "react";
import { Link } from "react-router-dom";
// redux
import { useDispatch } from "react-redux";
import { deleteAssignment } from "../redux/actions/assignmentActions";

const Card = ({ assignment }) => {
  const dispatch = useDispatch();
  console.log("Inside CARD");
  return (
    <div className="col-md-4 my-3">
      <div className="card h-100">
        <div className="card-body text-center h-10">
          <h5>{assignment.title}</h5>
          <hr />
          <h6 className="mb-3">
            <span className="text-secondary mr-2">
              {assignment.productPrice.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </span>
          </h6>
          <div className="card-body text-center h-20">
            <p>
              {assignment.description}
            </p>
          </div>
          <div className="card-body text-center h-10">
            <Link
              to={`/admin/edit/assignment/${assignment._id}`}
              type="button"
              className="btn btn-secondary btn-sm mr-1 my-1"
            >
              <i className="far fa-edit pr-1"></i>
              Edit
            </Link>
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => dispatch(deleteAssignment(assignment._id))}
            >
              <i className="far fa-trash-alt pr-1"></i>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
