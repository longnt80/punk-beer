import React from 'react';
import {
  Link
} from 'react-router-dom';

const ProductsList = ({id, name, image_url, match}) => {
	console.log(match.url)
    return (
        <div className="column is-one-quarter ListedProduct">
			<div className="ListedProduct-inner">
				<figure className="image is-128x128">
				  <img src={image_url} alt={name}/>
				</figure>
				<div className="beer-name">{name}</div>
					<Link className="button detail-btn" to={`${match.url}products/${id}`}>Details</Link>
			</div>
		</div>
    )
};


export default ProductsList;
