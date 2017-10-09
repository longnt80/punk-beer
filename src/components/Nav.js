import React from 'react';
import {
  Link
} from 'react-router-dom';
import './styles/Nav.css'


class Nav extends React.Component {
	constructor(props) {
		super(props);
		this.state = {dropdownStatus: false};
	}

	handleClick = () => {		
		this.setState((prevState) => (
			{
				dropdownStatus: !prevState.dropdownStatus
			}
		));
	}

	render() {
		const {dropdownStatus} = this.state;
		const addedClass = dropdownStatus ? "is-active" : '';

	    return (
	    	<div className="Nav">
	    		<div className={"dropdown " + addedClass} onClick={this.handleClick}>
	    			<div className="dropdown-trigger">
	    				<button className="button" aria-haspopup="true" aria-controls="dropdown-menu">Types</button>
	    			</div>
	    				        <div className="dropdown-menu" id="dropdown-menu" role="menu">
	    				        	<div className="dropdown-content">
	    						        <div className="dropdown-item"><Link to="/category/light-beers">Light Beers</Link></div>
	    						    </div>
	    				        </div>
	    		</div>
	    	</div>
	    );
	}
}

export default Nav;
