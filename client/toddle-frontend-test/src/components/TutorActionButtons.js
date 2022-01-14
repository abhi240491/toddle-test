import React from 'react';

const TutorActionButtons = () => {
    return(
    <div className="bg-light my-5">
      <div className="container">
        <div className="row pb-3">
          <div className="col-md-4 my-1 mr-auto">
            <button
              className="btn btn-outline-warning btn-block"
              data-toggle="modal"
              data-target="#addAssignmentModal"
            >
              <i className="fas fa-plus"> </i> Add Assignments
            </button>
          </div>
        </div>
      </div>
    </div>
  )
};

  export default TutorActionButtons;