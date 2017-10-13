import React from 'react';

import {
  Route,
  Link,
  Switch
} from 'react-router-dom';

import ProductsList from './ProductsList';
import ProductDetail from './ProductDetail';
import NoMatch from './NoMatch';
import Nav from './Nav';

import './styles/App.css';

const urls = {
    default_endpoint: 'https://api.punkapi.com/v2/beers',
    new_products: 'https://api.punkapi.com/v2/beers?ids=132|109|91|6|100|212|168|126|31|52|192|106|111|1119',
    light_beers: 'https://api.punkapi.com/v2/beers?abv_lt=4',
    long_list: 'https://api.punkapi.com/v2/beers?per_page=80'
}

const App = (props) => {

        return (
                    <div>
                        <section className="section header">
                            <div className="container">
                                    <div className="logo">
                                        <Link to="/">Punk Beers</Link>
                                        <div className="tagline">
                                            for beer enthusiasts
                                        </div>
                                    </div>
                                    <Nav />
                            </div>
                        </section>
                        <section className="section content-area">
                            <div className="container">
                                <Switch>
                                    <Route exact path="/" render={(props) => 
                                        ( <ProductsList 
                                            {...props}
                                            pageTitle="Homepage"
                                            customHeading="Most active beers"
                                            url={urls.new_products}
                                            />)} 
                                    />
                                    
                                    <Route path="/category/light-beers/:id" component={ProductDetail}/>

                                    <Route path="/category/long-list/:id" component={ProductDetail}/>
                                    
                                    <Route path="/category/light-beers/" render={(props) => 
                                        ( <ProductsList 
                                            {...props}
                                            pageTitle="Light Beers"
                                            customHeading="List of light beers"
                                            url={urls.light_beers}
                                            />)} 
                                    />

                                    <Route path="/category/long-list/" render={(props) => 
                                        ( <ProductsList 
                                            {...props}
                                            pageTitle="Example of long list"
                                            customHeading="A long list of beers"
                                            url={urls.long_list}
                                            />)} 
                                    />

                                    <Route exact path="/:id" component={ProductDetail}/>

                                    <Route component={NoMatch}/>
                                </Switch>
                            </div>
                        </section>

                    </div>
        );
}

export default App;