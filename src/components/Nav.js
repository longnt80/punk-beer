import React from 'react';
import { connect } from 'react-redux';
import { menuClosed } from '../actions/index';
import {
  Link
} from 'react-router-dom';
import './styles/Nav.css'


class Nav extends React.Component {
	render() {
		const {menuClosed, toggleMenu} = this.props;
		const addedClass = menuClosed ? '' : "is-active";

	    return (
	    	<div className="Nav">
	    		<div className={"dropdown " + addedClass} 
					onClick={() => menuClosed ? toggleMenu(false) : toggleMenu(true) }>
	    			<div className="dropdown-trigger">
	    				<button className="button" aria-haspopup="true" aria-controls="dropdown-menu">Types</button>
	    			</div>
	    				        <div className="dropdown-menu" id="dropdown-menu" role="menu">
	    				        	<div className="dropdown-content">
	    						        <div className="dropdown-item"><Link to="/category/light-beers">Light Beers</Link></div>
	    						        <div className="dropdown-item"><Link to="/category/long-list">Example of long list</Link></div>
	    						    </div>
	    				        </div>
	    		</div>
	    	</div>
	    );
	}
}

const mapStateToProps = (state) => {
    return {
        menuClosed: state.menuClosed
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleMenu: (bool) => dispatch(menuClosed(bool))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);