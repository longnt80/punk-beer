import React from 'react';
import { connect } from 'react-redux';
import { currentPagination } from '../actions/index';

const Pagination = ({numberOfPage, setPageNumber, currentPage}) => {
	let pageNumberArray = [];
	for (let i = 1; i <= numberOfPage; i++) {
		pageNumberArray.push(i);
	}

	return (
			<nav className="pagination is-small" aria-label="pagination">
				<a onClick={() => setPageNumber(currentPage-1)} className="pagination-previous" title="This is the first page" disabled={currentPage === 1}>Previous</a>
				<a onClick={() => setPageNumber(currentPage+1)} className="pagination-next" disabled={(numberOfPage === currentPage)}>Next page</a>
				<ul className="pagination-list">
					{
						pageNumberArray.map(num => 
							(
								<li key={num}>
										<a onClick={() => setPageNumber(num)} className={"pagination-link " + ((currentPage === num) ? 'is-current': '')} >
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

const mapStateToProps = (state) => {
    return {
		numberOfPage: state.numberOfPage,
		currentPage: state.currentPagination
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setPageNumber: (num) => dispatch(currentPagination(num))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);