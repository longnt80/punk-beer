import React, { Component } from 'react';
import axios from 'axios';
import ProductsList from './ProductsList';
import Loading from './Loading';
import './ProductsPage.css';

class ProductsPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			itemPerPage: 25,
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
		    this.setState({
		    	apiError: false,
		    	dataLoaded: true,
		    	beersData: result,
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

	componentDidMount() {
		this.gettingData();
	}

	componentDidUpdate(prevProps) {
		const {type} = this.props;
	    
	    if (prevProps.type !== type) {
	    	this.gettingData();
	    }
	}

    render() {
    	const {dataLoaded, beersData, apiError} = this.state;
    	const {match} = this.props;
  		console.log(beersData);

    	if (!dataLoaded) {
    		return <Loading type='waiting'  />
    	}
    	else {
	    	if (!apiError) {
		        return (
		        	<div>
		        		<div className="title has-text-centered">Our new products:</div>
			            <div className="columns is-multiline is-three-quarters-mobile">
			                {
			                	beersData.map(beer => <ProductsList key={beer.id} {...beer} match={match} /> )
			                }
			            </div>
		        	</div>
		        );
	    	}
	    	else {
	    		return <Loading type='apiError' />
	    	}
    	}


    }
}

export default ProductsPage;