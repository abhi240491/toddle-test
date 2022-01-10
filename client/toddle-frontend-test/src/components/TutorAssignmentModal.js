import React, { useState } from "react";
import { showErrorMessage, showSuccessMessage } from "./helpers/message";
import isEmpty from "validator/lib/isEmpty";
import isEmail from "validator/lib/isEmail";
//import isDate from "validator/lib/isDate";
//import { getCategories } from "../api/category";
import { showLoading } from "./helpers/loading";

//redux
import { useSelector, useDispatch } from "react-redux";
import { clearMessages } from "../redux/actions/messageActions";
import { createAssignment } from "../redux/actions/assignmentActions";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TutorAssignmentModal = () => {
  const dispatch = useDispatch();
  const { successMsg, errorMsg } = useSelector((state) => state.messages);
  const { loading } = useSelector((state) => state.loading);
  const [clientError, setClientError] = useState("");

  const [assignmentData, setAssignmentData] = useState({
    //productImage: null,
    assignmentTitle: "",
    assignmentDescription: "",
    assignmentStudents: [{ name: "", email: "" }],
    assignmentPublishDate: "",
    assignmentDeadline: "",
    assignmentStatus: "",
  });

  const {
    assignmentTitle,
    assignmentDescription,
    assignmentStudents,
    assignmentPublishDate,
    assignmentDeadline,
    assignmentStatus,
  } = assignmentData;

  
  //student details area
  const handleStartDateChange = (date) => {
    let status;
    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();
    const tod = [todayYear, todayMonth, todayDate].join("");
    const publishedOn = [
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    ].join("");
    if (publishedOn > tod)
      status = "Scheduled"
    else 
      status = "Live"

      console.log(status)
    setAssignmentData({
      ...assignmentData,
      assignmentPublishDate: date,
      assignmentStatus: status,
  });
  console.log("Student Start Date",assignmentData, assignmentStatus);
  };

  const handleEndDateChange = (date) => {
    setAssignmentData({
      ...assignmentData,
      assignmentDeadline: date,
    });
    console.log("Student Start Date",assignmentData, assignmentStatus);
}
  const handleStudentInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...assignmentStudents];
    list[index][name] = value;
    setAssignmentData({
      ...assignmentData,
      assignmentStudents:list});
   // console.log("List",list,inputList);
  };
  const handleStudentRemoveClick = (index) => {
    const list = [...assignmentStudents];
    console.log(list);
    list.splice(index, 1);
    setAssignmentData({
      ...assignmentData,
      assignmentStudents:list
  });
}
  const handleStudentAddClick = () => {
    setAssignmentData({
      ...assignmentData, 
    assignmentStudents: [...assignmentStudents,{name: "", email: "" }]});
    console.log("Student Add",assignmentData)
    }
  const handleAssignmentChange = (evt) => {
    setAssignmentData({
      ...assignmentData,
      [evt.target.name]: evt.target.value,
    });
  };
  const handleMessages = (evt) => {
    dispatch(clearMessages);
    setClientError("");
  };
  const checkStudentInfo = (students) => {
    for (let i = 0; i < students.length; i++) {
      if (!isEmail(students[i].email)) {
        return true;
      }
    }
    return false;
  };
  const handleAssignmentSubmit = (evt) => {
    evt.preventDefault();
    if (
      isEmpty(assignmentDescription)) {
      setClientError("Description, Publishing Date are required");
    } else if (checkStudentInfo(assignmentStudents)) {
      setClientError("Student Email is required field");
    } else {
      let formData = new FormData();
      formData.append("title",assignmentTitle);
      formData.append("description",assignmentDescription);
      formData.append("students",assignmentStudents);
      formData.append("publishDate",assignmentPublishDate);
      formData.append("deadline",assignmentDeadline);
      formData.append("status",assignmentStatus);
      
      dispatch(createAssignment(formData));
      setAssignmentData({
        assignmentTitle: "",
        assignmentDescription: "",
        assignmentStudents: [],
        assignmentPublishDate: "",
        assignmentDeadline: "",
        assignmentStatus: "",
      });
    }
  };

  return (
    <div id="addAssignmentModal" className="modal" onClick={handleMessages}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          {/*FORM Food Add*/}
          <form onSubmit={handleAssignmentSubmit}>
            <div className="modal-header bg-warning text-white">
              <h5 className="modal-title">Add Assignment</h5>
              <button className="close" data-dismiss="modal">
                <span>
                  <i className="fas fa-times"></i>{" "}
                </span>
              </button>
            </div>
            <div className="modal-body my-2">
              {clientError && showErrorMessage(clientError)}
              {errorMsg && showErrorMessage(errorMsg) /*server side error*/}
              {successMsg && showSuccessMessage(successMsg)}
              {loading ? (
                <div className="text-center"> {showLoading()}</div>
              ) : (
                <>
                  {/*Title*/}
                  <div className="form-group">
                    <label className="text-primary font-weight-bold">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="assignmentTitle"
                      value={assignmentTitle}
                      onChange={handleAssignmentChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="text-primary font-weight-bold">
                      Description
                    </label>
                    <textarea
                      rows="3"
                      className="form-control"
                      name="assignmentDescription"
                      value={assignmentDescription}
                      onChange={handleAssignmentChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="text-primary font-weight-bold">
                      Student Details
                    </label>
                    {assignmentStudents.map((x, i) => {
                      return (
                        <div className="row">
                          <div className="col-md-5 mr-auto">
                            <label className="text-secondary font-weight-bold">
                              Name
                            </label>
                            <input
                              className="ml-1"
                              name="name"
                              placeholder="Enter Full Name"
                              value={x.name}
                              onChange={(e) => handleStudentInputChange(e, i)}
                            />
                          </div>
                          <div className="col-md-4 mr-auto">
                            <label className="text-secondary font-weight-bold">
                              Email
                            </label>
                            <input
                              className="ml-1"
                              name="email"
                              placeholder="Email"
                              value={x.email}
                              onChange={(e) => handleStudentInputChange(e, i)}
                            />
                          </div>
                          <div className="col-md-2 btn-box mr-auto">
                            {assignmentStudents.length !== 1 && (
                              <button
                                className="btn btn-outline-secondary"
                                onClick={() => handleStudentRemoveClick(i)}
                              >
                                Remove
                              </button>
                            )}
                            {assignmentStudents.length - 1 === i && (
                              <button
                                className="btn btn-outline-primary"
                                onClick={handleStudentAddClick}
                              >
                                Add
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-5 mr-auto">
                      <label className="text-secondary">Publish Date</label>
                      <DatePicker
                        selected={assignmentPublishDate}
                        dateFormat="dd-mm-yyyy"
                        onChange={handleStartDateChange}
                        selectsStart
                        startDate={assignmentPublishDate}
                        endDate={assignmentDeadline}
                        autofocus={true}
                        minDate={new Date()}
                      />
                    </div>
                    {/*Date picker*/}
                    <div className="form-group col-md-5 mr-auto">
                      <label className="text-secondary">Deadline!!</label>
                      <DatePicker
                        selected={assignmentDeadline}
                        dateFormat="dd-mm-yyyy"
                        onChange={handleEndDateChange}
                        selectsEnd
                        startDate={assignmentPublishDate}
                        endDate={assignmentDeadline}
                        minDate={assignmentPublishDate}
                        autofocus={true}
                      />
                    </div>
                    {/*Date picker*/}
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-5 ml-auto">
                      <h5>
                        Status: <span className="text-primary">{assignmentStatus}</span>
                      </h5>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-warning mr-auto">
                Submit
              </button>
              <button data-dismiss="modal" className="btn btn-secondary ">
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TutorAssignmentModal;
