import React, {Component} from 'react';
import { connect } from 'react-redux';
import { menuClosed } from '../actions/index';
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
		const { id, name, image_url, match, toggleMenu } = this.props;
		const { imageLoaded } = this.state;
		const relativePath = match.url === '/' ? '' : match.url;
	
	
		return (
			<div className="column is-one-quarter ListedProduct">
				<div className="ListedProduct-inner">
					<Link 
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
							onClick={() => toggleMenu(true)}
							className="button detail-btn" 
							to={`${relativePath}/${id}`}>Details</Link>
				</div>
			</div>
		)
	}
};
const mapDispatchToProps = (dispatch) => {
    return {
        toggleMenu: (bool) => dispatch(menuClosed(bool))
    };
};

export default connect(mapDispatchToProps)(ProductItem);
