import React from 'react';
import './Loading.css';

const Loading = ({ type }) => {
    return (
		<section className="Loading">
			<div className="container">
				{(() => {
					switch(type) {
						case 'apiError':
							return "Sorry, we're out of beers. Please come back later.";
						case 'waiting':
							return "Getting the beers ...";
						default:
							return "Getting the beers ...";
					}
				})()}
			</div>
		</section>        
    );
};

export default Loading;
