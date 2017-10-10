import React, {Component} from 'react';
import {Helmet} from "react-helmet";
import axios from 'axios';
import './styles/ProductDetail.css';
import NoMatch from './NoMatch';

class ProductDetail extends Component {
	constructor(props) {
		super(props)
		this.state = {
			beer: null,
			invalidData: false
		}
	}

	gettingData = () => {
		const {match, beerInfo} = this.props;

	    if (!beerInfo) {
	    	axios.get('https://api.punkapi.com/v2/beers?ids=' + match.params.id)
	    	.then(res => {
	    		console.log(res)
	    		return res.data[0]	
	    	})
	    	.then(result => {
	    		console.log(result)
	    		if (result !== undefined) {
		    		this.setState({
		    			beer: {...result}
		    		})
	    		}
	    		else {
	    			this.setState({
		    			invalidData: true
		    		})	
	    		}
	    	})
	    	.catch(err => console.log(err))
	    }
	    else {
	    	this.setState({beer: beerInfo})
	    }
	}

	componentDidMount() {
	    this.gettingData();
	}

	componentDidUpdate(prevProps, prevState) {
		const {invalidData} = this.state;

	    if ( invalidData !== prevState.invalidData ) {
	    	this.gettingData();
	    }
	}

	handleNoMatchClick = () => {
		this.setState({ invalidData: false })
	}

    render() {
    	const {beer, invalidData} = this.state;

		if (beer !== null) {
			const helmetData = (
				<Helmet>
                    <title>Punk Beers - {beer.name}</title>
                </Helmet>
			)

		    return (
		        <div className="beer-details">
		        	{helmetData}
		            <div className="columns">
		            	<div className="column is-three-quarters">
				            <h1 className="title">{beer.name}</h1>
				            <h2 className="subtitle">{beer.tagline}</h2>
	            			<p>{beer.description}</p>
		            		<dl>
		            			<dt>Alcohol by volume:</dt>
		            			<dd>{beer.abv}</dd>
		            			<dt>Bitterness (<a href="https://en.wikipedia.org/wiki/International_Bitterness_Units_scale">IBU</a>):</dt>
		            			<dd>{beer.ibu}</dd>
		            			<dt>Best dishes to go with:</dt>
		            			<dd>
		            				<ul>
			            				{
			            					beer.food_pairing.map((item, index) =>
			            						<li key={index}>{item}</li>
		            						)
			            				}
		            				</ul>
		            			</dd>
		            		</dl>
		            	</div>
		            	<div className="column is-one-quarter">
		            		<figure className="image">
							  <img alt="beer.name" src={beer.image_url}/>
							</figure>
		            	</div>
		            </div>
		            
		        </div>
		    );
    	}
    	else if (beer === null && invalidData === true) {
    		return <NoMatch handleNoMatchClick={this.handleNoMatchClick} />
    	}
    	else {
    		return 'Please wait...'
    	}
    }
}

export default ProductDetail;


