import React from 'react';
import Card from './Card';
// redux
import { useSelector } from 'react-redux';

const TutorBody = () => {
	const { assignments } = useSelector(state => state.assignments);
	console.log("Inside Tutor Assignment Body")
	console.log(assignments)
	return (
		<div className='container'>
			<div className='row'>
				<div className='card-deck'>
					{assignments &&
						assignments.map(assignment => (
							<Card key={assignment._id} assignment={assignment} />
						))}
				</div>
			</div>
		</div>
	);
};

export default TutorBody;
