import React from 'react';
import {
  Link
} from 'react-router-dom';

const ProductItem = (props) => {
    const {id, name, image_url, match, handleViewDetail} = props
	const relativePath = match.url === '/' ? '' : match.url;


    return (

        <div className="column is-one-quarter ListedProduct">
			<div className="ListedProduct-inner">
				<figure className="image is-128x128">
				  <img src={image_url} alt={name}/>
				</figure>
				<div className="beer-name">{name}</div>
					<Link 
						onClick={() => handleViewDetail(id, props)} 
						className="button detail-btn" 
						to={`${relativePath}/${id}`}>Details</Link>
			</div>
		</div>
    )
};


export default ProductItem;
