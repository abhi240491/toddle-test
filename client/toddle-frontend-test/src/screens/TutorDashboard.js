import React, { useEffect } from "react";
import TutorHeader from "./TutorHeader";
import TutorActionButtons from "../components/TutorActionButtons";
import TutorAssignmentModal from "../components/TutorAssignmentModal";
import TutorBody from "../components/TutorBody";
import { useDispatch } from "react-redux";
//import {getCategories} from '../redux/actions/categoryActions';
import { getAssignments } from "../redux/actions/assignmentActions";
const TutorDashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAssignments());
  }, [dispatch]);

  return (
    <section>
      <TutorHeader/>
      <TutorActionButtons />
      <TutorAssignmentModal/>
      <TutorBody />
    </section>
  );
};

export default TutorDashboard;
