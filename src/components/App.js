import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import './App.css';
import ProductsPage from './ProductsPage';
import ProductDetail from './ProductDetail';
import Nav from './Nav';

const data = {
    new_products: 'https://api.punkapi.com/v2/beers?per_page=50'
}

class App extends Component {
    render() {
        console.log(data.new_products)
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
                                            type="homepage"
                                            data={data.new_products}
                                            />)} 
                                    />
                                    <Route path="/:cat" component={ProductsPage} />
                                    <Route path="/:cat" component={ProductsPage} />
                                    <Route path="/:cat" component={ProductsPage} />
                                    <Route path="/products/:id" component={ProductDetail} />
                                </Switch>
                            </div>
                        </section>

                    </div>
                </Router>
        );
    }
}

export default App;