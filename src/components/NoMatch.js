import React from 'react';
import {
  Link
} from 'react-router-dom';

const NoMatch = ({ handleNoMatchClick }) => {

	const id = Math.floor(Math.random() * 234) + 1;
	
	return (
	    <div>
	    	There's nothing to show here. 
	    	<Link onClick={handleNoMatchClick}  to={`/${id}`}>Would you like a random beer?</Link>
    	</div>
	);
}

export default NoMatch;
