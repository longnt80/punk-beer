import React, { Component } from 'react';
import {Helmet} from "react-helmet";

import { connect } from 'react-redux';
import { itemsFetchData } from '../actions/index';
import { menuClosed } from '../actions/index';

import ProductItem from './ProductItem';
import Pagination from './Pagination';

import './styles/ProductsList.css';

class ProductsList extends Component {
	

	componentDidMount() {
		this.props.fetchData(this.props.url);
	}
	
	componentDidUpdate(prevProps, prevState) {
		const {pageType, url} = this.props;
	    
	    if (prevProps.pageType !== pageType || prevProps.url !== url) {
			this.props.toggleMenu(true);
			this.props.fetchData(this.props.url);
	    }
		// window.scrollTo(0, 0);

	}

    render() {
		const {pageTitle, items, hasErrored, isLoading, currentPagination, customHeading, match} = this.props;
		
		
    	const helmetData = (
			<Helmet>
                <title>Punk items - {pageTitle}</title>
            </Helmet>
		)
		
		if (hasErrored) {
            return <p>Sorry! There was an error loading the items</p>;
        }

        if (isLoading) {
            return <p>Loading…</p>;
        }

		return (
			<div>
			{helmetData}
				<div className="title has-text-centered">{customHeading}:</div>
				<div className="columns is-multiline is-three-quarters-mobile">
					{	
						items[currentPagination-1].map(item => 
							<ProductItem 
								{...item} 
								key={item.id} 
								match={match}
								/> )
					}
				</div>
				<Pagination />
			</div>
		);
	


    }
}

const mapStateToProps = (state) => {
    return {
        items: state.items,
        hasErrored: state.itemsHasErrored,
		isLoading: state.itemsIsLoading,
		currentPagination: state.currentPagination
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
		fetchData: (url) => dispatch(itemsFetchData(url)),
		toggleMenu: (bool) => dispatch(menuClosed(bool))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);
