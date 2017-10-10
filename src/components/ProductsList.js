import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import axios from 'axios';
import ProductItem from './ProductItem';
import Loading from './Loading';
import Pagination from './Pagination';
import './styles/ProductsList.css';

class ProductsList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			itemPerPage: 12,
			currentPage: 1,
			apiError: false,
			pagination: false,
			dataLoaded: false,
			beersData: [],
		}		
	}

	gettingData = () => {
		const {data} = this.props;
		const {itemPerPage} = this.state;
	    
	    axios.get(data)
		  .then(res => res.data)
		  .then(result => {

		  	let resultArr = [];
		  	for (let i = 0; i < result.length; i+=itemPerPage) {
		  		resultArr.push(result.slice(i, i+itemPerPage))
		  	}


		    this.setState({
		    	currentPage: 1,
		    	apiError: false,
		    	dataLoaded: true,
		    	beersData: resultArr,
		    	pagination: result.length > itemPerPage ? true : false
		    })
		  })
		  .catch(err => {
		    console.log(err);
		    this.setState({
		    	apiError: true,
		    	dataLoaded: true
		    })
		  });
	}

	handlePageNumClick = (num) => {
		this.setState({
			currentPage: num
		});
	}

	handlePrevBtn = () => {
		const {currentPage} = this.state;
		console.log(currentPage)

		if (currentPage !== 1) {
			this.setState(prev => ({currentPage: prev.currentPage - 1}))
		}
	}

	handleNextBtn = () => {
		const {currentPage, beersData} = this.state;
		if ( currentPage !== beersData.length ) {
			this.setState(prev => ({currentPage: prev.currentPage + 1}))
		}
	}

	componentDidMount() {
		this.gettingData();
	}



	componentDidUpdate(prevProps, prevState) {
		const {pageType, data} = this.props;
	    
	    if (prevProps.pageType !== pageType || prevProps.data !== data) {
	    	this.gettingData();
	    }

	}

    render() {
    	const {dataLoaded, beersData, apiError, pagination, currentPage} = this.state;
    	const {match, handleViewDetail, customHeading, pageTitle} = this.props;
    	const helmetData = (
			<Helmet>
                <title>Punk Beers - {pageTitle}</title>
            </Helmet>
		)
		

    	if (!dataLoaded) {
    		return <Loading type='waiting' />
    	}
    	else {
	    	if (!apiError) {
	    		const pageCustomHeader = <div className="title has-text-centered">{customHeading}:</div>
	    		const displayItems = (
	    			<div className="columns is-multiline is-three-quarters-mobile">
		                {	
		                	beersData[currentPage-1].map(beer => 
		                		<ProductItem 
		                			{...beer} 
		                			key={beer.id} 
		                			match={match}
		                			handleViewDetail={handleViewDetail} /> )
		                }
		            </div>
    			)


		        if (pagination) {
		        	return (
			        	<div>
			        		{helmetData}
			        		{pageCustomHeader}
			        		{displayItems}
				            <Pagination 
				            	currentPage={currentPage}
				            	numberOfPage={beersData.length}
				            	handlePageNumClick={this.handlePageNumClick}
				            	handlePrevBtn={this.handlePrevBtn}
				            	handleNextBtn={this.handleNextBtn} />
			        	</div>
			        );
		        }
		        else {
		        	return (
			        	<div>
			        		{helmetData}
			        		{pageCustomHeader}
			        		{displayItems}
			        	</div>
			        );
		        }
	    	}
	    	else {
	    		return <Loading type='apiError' />
	    	}
    	}


    }
}

export default ProductsList;