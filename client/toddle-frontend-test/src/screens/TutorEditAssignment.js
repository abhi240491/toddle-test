import React, { useEffect, useState } from "react";
import { getAssignment } from "../redux/actions/assignmentActions";
import { useDispatch, useSelector } from "react-redux";
import TutorHeader from "./TutorHeader";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import { parseISO} from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

function TutorEditAssignment({ match, history }) {
  //title, description, students, publishDate, deadline, status
  const assignmentId = match.params.assignmentId;

  const { assignment } = useSelector((state) => state.assignments);

  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [assignmentDescription, setAssignmentDescription] = useState("");
  const [assignmentStudents, setAssignmentStudents] = useState([{ studName: "", studMail: "" }]); //studMail, submission, submissionStatus, delay,
  const [assignmentPublishDate, setAssignmentPublishDate] = useState("");
  const [assignmentDeadline, setAssignmentDeadline] = useState("");
  const [assignmentStatus, setAssignmentStatus] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    if (!assignment) {
      dispatch(getAssignment(assignmentId));
    } else {
      setAssignmentTitle(assignment.title);
      setAssignmentDescription(assignment.description);      
      setAssignmentStudents(assignment.students);
      console.log("STUDENTS", assignmentStudents);
      setAssignmentPublishDate(parseISO(assignment.publishDate));
      setAssignmentDeadline(parseISO(assignment.deadline));
      setAssignmentStatus(assignment.status);
    }
  }, [assignmentId, dispatch, assignment]);

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
    if (publishedOn > tod) status = "Scheduled";
    else status = "Live";
    setAssignmentPublishDate(date);
    setAssignmentStatus(status);
  };

  const handleEndDateChange = (date) => {
    setAssignmentDeadline(date);
  };

  const handleStudentInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...assignmentStudents];
    list[index][name] = value;
      setAssignmentStudents(list);
    // console.log("List",list,inputList);
  };

  const handleStudentRemoveClick = (index) => {
    const list = [...assignmentStudents];
    console.log(list);
    list.splice(index, 1);
    setAssignmentStudents(list);
  };

  const handleAssignmentSubmit = async (e) => {
    e.preventDefault();
    let formData = {};
    formData["title"] = assignmentTitle;
    formData["description"] = assignmentDescription;
    formData["students"] = [...assignmentStudents];
    formData["publishDate"] = assignmentPublishDate;
    formData["deadline"] = assignmentDeadline;
    formData["status"] = assignmentStatus;
    //Turn this part into redux format: task
    await axios
      .put(`/api/assignment/${assignmentId}`, formData)
      .then((res) => {
        console.log("Success assignment update:", res);
        history.push("/tutor/dashboard");
      })
      .catch((err) => {
        console.log("Error in assignment update:", err);
      });
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
                    <h5 className="modal-title">Update Assignment</h5>
                  </div>
                  <div className="modal-body my-2">
                    <>
                      <div className="form-group">
                        <label className="text-primary font-weight-bold">
                          Title
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="assignmentTitle"
                          value={assignmentTitle}
                          onChange={(e) => setAssignmentTitle(e.target.value)}
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
                          onChange={(e) =>
                            setAssignmentDescription(e.target.value)
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label className="text-primary font-weight-bold">
                          Student Details
                        </label>
                        {assignmentStudents.map((x, i) => {
                          return (
                            <div className="row">
                              <div className="col-md-4 mx-auto">
                                <label className="text-secondary font-weight-bold">
                                  Name
                                </label>
                                <input
                                  className="ml-1"
                                  name="studName"
                                  placeholder="Enter Full Name"
                                  value={x.studName}
                                  onChange={(e) =>
                                    handleStudentInputChange(e, i)
                                  }
                                />
                              </div>
                              <div className="col-md-4 mx-auto">
                                <label className="text-secondary font-weight-bold">
                                  Email
                                </label>
                                <input
                                  className="ml-1"
                                  name="studMail"
                                  placeholder="Email"
                                  value={x.studMail}
                                  onChange={(e) =>
                                    handleStudentInputChange(e, i)
                                  }
                                />
                              </div>
                              <div className="col-md-2 btn-box mx-auto">
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
                                    onClick={()=>{setAssignmentStudents([...assignmentStudents, { studName: "", studMail: "" }])}}
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
                            Status:{" "}
                            <span className="text-primary">
                              {assignmentStatus}
                            </span>
                          </h5>
                        </div>
                      </div>
                    </>
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
        </div>
      </div>
    </>
  );
}

export default TutorEditAssignment;
