import React, { useEffect, useState } from "react";
import { getAssignment } from "../redux/actions/assignmentActions";
//import { getCategories } from "../redux/actions/categoryActions";
import { useDispatch, useSelector } from "react-redux";
import TutorHeader from "./TutorHeader";
import { Link } from "react-router-dom";
import axios from 'axios';

function TutorEditAssignment({ match, history }) {
//title, description, students, publishDate, deadline, status
   const assignmentId = match.params.assignmentId;
  const { assignment } = useSelector((state) => state.assignments);
  //const { categories } = useSelector((state) => state.categories);
  //console.log(categories[0].category);
  console.log(assignment);
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [assignmentDescription, setAssignmentDescription] = useState("");
  const [assignmentStudents, setAssignmentStudents] = useState([]);         //studMail, submission, submissionStatus, delay,
  const [assignmentPublishDate, setAssignmentPublishDate] = useState(0);
  const [assignmentDeadline, setAssignmentDeadline] = useState("");
  const [assignmentStatus, setAssignmentStatus] = useState('');

  const dispatch = useDispatch();
  useEffect(() => {
    console.log("Assignment", assignment);
    if (!assignment) {
      dispatch(getAssignment(assignment));
      //dispatch(getCategories());
      console.log("Assignment after getAssignment", assignment);
    } else {
      setAssignmentTitle(assignment.title);
      setAssignmentDescription(assignment.description);
      setAssignmentStudents(assignment.students);
      setAssignmentPublishDate(assignment.publishDate);
      setAssignmentDeadline(assignment.deadline);
      setAssignmentStatus(assignment.status);
    }
  }, [assignmentId, dispatch, assignment]);
  
  /* const handleImageUpload = (e) => {
    const image = e.target.files[0];
    setProductImage(image);
    console.log("PRODUCT IMAGE:",image, typeof(image), productImage, typeof(productImage));
  }; */
  const handleAssignmentSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    //formData.append("productImage", productImage);
    formData.append("productName", assignmentTitle);
    formData.append("productDescription", assignmentDescription);
    formData.append("productPrice", assignmentStudents);
    formData.append("productCategory", assignmentPublishDate);
    formData.append("productQuantity", assignmentDeadline);
    //Turn this part into redux format: task
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    await axios.put(`/api/assignment/${assignmentId}`,formData,config)
    .then(
        res => {
            console.log('Success assignment update:', res);
            history.push('/tutor/dashboard')
    }) 
    .catch(err => {
        console.log("Error in assignment update:", err );
    })
  };

  return (
    <>
      <TutorHeader />
      <div className="container my-3">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <Link to="/tutor/dashboard">
              <span className="fas fa-arrow-left">Go Back</span>
            </Link>
            <div>
              <br />
              <div className="modal-content">
                <form onSubmit={handleAssignmentSubmit}>
                  <div className="modal-header bg-warning text-white">
                    <h5 className="modal-title">Update Food</h5>
                  </div>
                  <div className="modal-body my-2">
                    <>
                      <div className="form-group">
                        <label className="text-secondary">Title</label>
                        <input
                          type="text"
                          className="form-control"
                          name="assignmentTitle"
                          value={assignmentTitle}
                          onChange={(e) => setAssignmentTitle(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label className="text-secondary">Description</label>
                        <textarea
                          className="form-control"
                          rows="3"
                          name="assignmentDescription"
                          value={assignmentDescription}
                          onChange={(e) => setAssignmentDescription(e.targetElement.value)}
                        ></textarea>
                      </div>
                      {/*section to add students detail}
                      <div className="form-group">
                        <label className="text-secondary">Assigned Students</label>
                        <input
                          type="text"
                          className="form-control"
                          name="assignmentPrice"
                          value={productPrice}
                          onChange={(e) => setProductPrice(e.target.value)}
                        />
                      </div>
                      {section to add students detail*/}
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label className="text-secondary">Publish Date</label>
                          <select
                            className="custom-select mr-sm-2"
                            name="publishDate"
                            value={assignmentPublishDate}
                            onChange={(e) => setAssignmentPublishDate(e.target.value)}
                          >
                            {/*ADD A DATE PICKER*/}
                            {/* <option value="">Choose one...</option>
                            {categories &&
                              categories.map((c) => (
                                <option key={c._id} value={c._id}>
                                  {c.category}
                                </option> 
                              ))}*/}
                          </select>
                        </div>
          
                        <div className="form-group col-md-6">
                          <label className="text-secondary">Last Submission Date</label>
                          <input
                            type="number"
                            className="form-control"
                            min="0"
                            max="1000"
                            name="deadline"
                            value={assignmentDeadline}
                            onChange={(e) => setAssignmentDeadline(e.target.value)}
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label className="text-secondary">Status:{assignmentStatus||"not assigned"}</label>
                        </div>
                      </div>
                    </>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="submit"
                      className="btn btn-warning text-white"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TutorEditAssignment;
