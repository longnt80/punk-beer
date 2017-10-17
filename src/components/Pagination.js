import React, { Component } from 'react';
import { connect } from 'react-redux';
import { currentPagination } from '../actions/index';


class Pagination extends Component {

	handlePrevPageBtn = () => {
		const {setPageNumber, currentPage} = this.props;
	
		if ( currentPage === 1 ) {
			return;
		}
		else {
			setPageNumber(currentPage-1)
		}
	}
	
	handleNextPageBtn = () => {
		const {numberOfPage, setPageNumber, currentPage} = this.props;
	
		if ( currentPage === numberOfPage ) {
			return;
		}
		else {
			setPageNumber(currentPage+1)
		}
	}
	
	render() {
		const {numberOfPage, setPageNumber, currentPage} = this.props;

		let pageNumberArray = [];
		for (let i = 1; i <= numberOfPage; i++) {
			pageNumberArray.push(i);
		}
	
		return (
				<nav className="pagination is-small" aria-label="pagination">
					<a onClick={this.handlePrevPageBtn} className="pagination-previous" title="This is the first page" disabled={currentPage === 1}>Previous</a>
					<a onClick={this.handleNextPageBtn} className="pagination-next" disabled={(numberOfPage === currentPage)}>Next page</a>
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
	}
}

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