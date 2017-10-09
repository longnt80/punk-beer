import React, { Component } from 'react';
import axios from 'axios';
import ProductsList from './ProductsList';
import Loading from './Loading';
import Pagination from './Pagination';
import './styles/ProductsPage.css';

class ProductsPage extends Component {
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
		  	console.log(result.length);

		  	let resultArr = [];
		  	for (let i = 0; i < result.length; i+=itemPerPage) {
		  		resultArr.push(result.slice(i, i+itemPerPage))
		  	}
		  	console.log(resultArr.length);
		  	console.log(resultArr);


		    this.setState({
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
    	const {match, handleViewDetail, title} = this.props;
  		console.log(handleViewDetail);

		

    	if (!dataLoaded) {
    		return <Loading type='waiting'  />
    	}
    	else {
	    	if (!apiError) {
		        if (pagination) {
		        	return (
			        	<div>
			        		<div className="title has-text-centered">{title}:</div>
			        		<div className="columns is-multiline is-three-quarters-mobile">
				                {	
				                	beersData[currentPage-1].map(beer => 
				                		<ProductsList 
				                			{...beer} 
				                			key={beer.id} 
				                			match={match}
				                			handleViewDetail={handleViewDetail} /> )
				                }
				            </div>
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
			        		<div className="title has-text-centered">{title}:</div>
			        		<div className="columns is-multiline is-three-quarters-mobile">
				                {	
				                	beersData[currentPage-1].map(beer => 
				                		<ProductsList 
				                			{...beer} 
				                			key={beer.id} 
				                			match={match}
				                			handleViewDetail={handleViewDetail} /> )
				                }
				            </div>
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

export default ProductsPage;