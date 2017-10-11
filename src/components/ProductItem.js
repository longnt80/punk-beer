import React, {Component} from 'react';
import {
  Link
} from 'react-router-dom';
import loadingImage from '../Spinner.svg'

class ProductItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			imageLoaded: false
		}
	}

	render () {
		const {id, name, image_url, match, handleViewDetail} = this.props;
		const {imageLoaded} = this.state;
		const relativePath = match.url === '/' ? '' : match.url;
	
	
		return (
			<div className="column is-one-quarter ListedProduct">
				<div className="ListedProduct-inner">
					<Link 
							onClick={() => handleViewDetail(id, this.props)} 
							to={`${relativePath}/${id}`}>
								{
									imageLoaded ? null :
									<figure className="image is-128x128">
										<img 
											src={loadingImage} 
											alt={name} />
									</figure>
								}

								<figure style={imageLoaded ? {} : {display: 'none'}} className="image is-128x128">
									<img 
										src={image_url} 
										alt={name}
										onLoad={() => this.setState({imageLoaded: true})} />
								</figure>
					</Link>
					<div className="beer-name">{name}</div>
						<Link 
							onClick={() => handleViewDetail(id, this.props)}
							className="button detail-btn" 
							to={`${relativePath}/${id}`}>Details</Link>
				</div>
			</div>
		)
	}
};


export default ProductItem;
