import React from 'react';

const Pagination = ({numberOfPage, currentPage, handlePageNumClick, handleNextBtn, handlePrevBtn}) => {
	let pageNumberArray = [];
	for (let i = 1; i <= numberOfPage; i++) {
		pageNumberArray.push(i);
	}

    return (
        <nav className="pagination is-small" aria-label="pagination">
		  <a onClick={handlePrevBtn} className="pagination-previous" title="This is the first page" disabled={currentPage === 1}>Previous</a>
		  <a onClick={handleNextBtn} className="pagination-next" disabled={(numberOfPage === currentPage)}>Next page</a>
		  <ul className="pagination-list">
		    {
		    	pageNumberArray.map(num => 
		    		(
		    			<li key={num}>
					        <a onClick={() => handlePageNumClick(num)} className={"pagination-link " + ((currentPage === num) ? 'is-current': '')} >
				      			{num}
			      			</a>
					    </li>
	    			)
	    		)
		    }
		  </ul>
		</nav>
    );
};

export default Pagination;