import React, {Component} from 'react';
import axios from 'axios';
import './styles/ProductDetail.css'

class ProductDetail extends Component {
	constructor(props) {
		super(props)
		this.state = {
			beer: null
		}
	}

	componentDidMount() {
	    const {match, beerInfo} = this.props;

	    if (!beerInfo) {
	    	axios.get('https://api.punkapi.com/v2/beers?ids=' + match.params.id)
	    	.then(res => res.data[0])
	    	.then(result => {
	    		this.setState({
	    			beer: {...result}
	    		})
	    	}
    		)
	    	.catch(err => console.log(err))
	    }
	    else {
	    	this.setState({beer: beerInfo})
	    }
	}

    render() {
    	const {beerId, match} = this.props;
    	const {beer} = this.state;
        // const id = beerId === 0 ? match.params.id : beerId;

		if (beer !== null) {
		    return (
		        <div className="beer-details">
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
							  <img src={beer.image_url}/>
							</figure>
		            	</div>
		            </div>
		            
		        </div>
		    );
    	}
    	else {
    		return 'Please wait...'
    	}
    }
}

export default ProductDetail;


