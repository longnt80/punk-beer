import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import './styles/App.css';
import ProductsPage from './ProductsPage';
import ProductDetail from './ProductDetail';
import Nav from './Nav';

const data = {
    new_products: 'https://api.punkapi.com/v2/beers?ids=132|109|91|6|100|212|168|126|31|52|192|106|111|1119',
    light_beers: 'https://api.punkapi.com/v2/beers?abv_lt=4'
}

class App extends Component {
    constructor() {
        super();
        this.state = {
            pagination: 1,
            beerId: 0,
            beerInfo: {}
        }
    }

    handleViewDetail = (id, oneBeerData) => {
        console.log(oneBeerData.id);
        this.setState({
            beerId: id,
            beerInfo: oneBeerData
        })
    }

    render() {
        const {beerId, oneBeerData} = this.state;

        return (
                <Router basename={process.env.PUBLIC_URL}>
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
                                        ( <ProductsPage 
                                            {...props}
                                            pageType="homepage"
                                            title="Most active beers"
                                            data={data.new_products}
                                            handleViewDetail={this.handleViewDetail}
                                            />)} 
                                    />
                                    
                                    <Route path="/category/light-beers/products/:id" render={(props) =>
                                        ( <ProductDetail
                                            {...props}
                                            beerId={beerId}
                                            beerInfo={oneBeerData}
                                            /> )}

                                    />
                                    
                                    <Route path="/category/light-beers/" render={(props) => 
                                        ( <ProductsPage 
                                            {...props}
                                            pageType="category"
                                            title="List of light beers"
                                            data={data.light_beers}
                                            />)} 
                                    />

                                    <Route exact path="/products/:id" render={(props) =>
                                        ( <ProductDetail
                                            {...props}
                                            beerId={beerId}
                                            beerInfo={oneBeerData}
                                            /> )}

                                    />

                                </Switch>
                            </div>
                        </section>

                    </div>
                </Router>
        );
    }
}

export default App;