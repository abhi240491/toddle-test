import axios from "axios";
import { START_LOADING, STOP_LOADING } from "../constants/loadingConstants";
import {
  SHOW_ERROR_MESSAGE,
  SHOW_SUCCESS_MESSAGE,
} from "../constants/messageConstants";
import { GET_ASSIGNMENTS, CREATE_ASSIGNMENT, GET_ASSIGNMENT, DELETE_ASSIGNMENT} from "../constants/assignmentConstants";


export const createAssignment = formdata => async dispatch => {
  try {
    dispatch({ type: START_LOADING });
    const response = await axios.post("/api/assignment", formdata);
    dispatch({ type: STOP_LOADING });
    dispatch({type: CREATE_ASSIGNMENT, payload: response.data.assignment})
    dispatch({
      type: SHOW_SUCCESS_MESSAGE,
      payload: response.data.successServerMsg,
    });
  } catch (err) {
    dispatch({ type: STOP_LOADING });
    dispatch({
      type: SHOW_ERROR_MESSAGE,
      payload: err.response.data.errorServerMsg,
    });
  }
};

export const getAssignments = () => async dispatch => {
	try {
		dispatch({ type: START_LOADING });
		const response = await axios.get('/api/assignment');
		dispatch({ type: STOP_LOADING });
		dispatch({
			type: GET_ASSIGNMENTS,
			payload: response.data.assignments,
		});
	} catch (err) {
		console.log('getAssignments api error: ', err);
		dispatch({ type: STOP_LOADING });
		dispatch({
			type: SHOW_ERROR_MESSAGE,
			payload: err.response.data.errorServerMsg,
		});
	}
};

export const getAssignment = assignmentId => async dispatch => {
	try {
		dispatch({ type: START_LOADING });
		const response = await axios.get(`/api/assignment/${assignmentId}`);
		dispatch({ type: STOP_LOADING });
		dispatch({
			type: GET_ASSIGNMENT,
			payload: response.data,
		});
	} catch (err) {
		console.log('getAssignment api error: ', err);
		dispatch({ type: STOP_LOADING });
		dispatch({
			type: SHOW_ERROR_MESSAGE,
			payload: err.response.data.errorServerMsg,
		});
	}
};


export const deleteAssignment = (assignmentId) => async dispatch => {
  try {
    dispatch({type: START_LOADING});
    const response = await axios.delete(`/api/assignment/${assignmentId}`);
    dispatch({type: STOP_LOADING});
    dispatch({type: DELETE_ASSIGNMENT, payload: response.data,});
  }
  catch(err){
    console.log('assignmentActions, deleteAssignment api error:', err);
    dispatch({type: STOP_LOADING});
    dispatch({type: SHOW_ERROR_MESSAGE, payload: err.response.data.errorServerMsg})
  }
};
