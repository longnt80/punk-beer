import React, { Component } from 'react';
import {
  Route,
  Link,
  Switch
} from 'react-router-dom';
import './styles/App.css';
import ProductsList from './ProductsList';
import ProductDetail from './ProductDetail';
import NoMatch from './NoMatch';
import Nav from './Nav';

const data = {
    new_products: 'https://api.punkapi.com/v2/beers?ids=132|109|91|6|100|212|168|126|31|52|192|106|111|1119',
    light_beers: 'https://api.punkapi.com/v2/beers?abv_lt=4',
    long_list: 'https://api.punkapi.com/v2/beers?per_page=80'
}

class App extends Component {
    constructor() {
        super();
        this.state = {
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
                                            data={data.new_products}
                                            handleViewDetail={this.handleViewDetail}
                                            />)} 
                                    />
                                    
                                    <Route path="/category/light-beers/:id" render={(props) =>
                                        ( <ProductDetail
                                            {...props}
                                            beerId={beerId}
                                            beerInfo={oneBeerData}
                                            /> )}
                                    />

                                    <Route path="/category/long-list/:id" render={(props) =>
                                        ( <ProductDetail
                                            {...props}
                                            beerId={beerId}
                                            beerInfo={oneBeerData}
                                            /> )}
                                    />
                                    
                                    <Route path="/category/light-beers/" render={(props) => 
                                        ( <ProductsList 
                                            {...props}
                                            pageTitle="Light Beers"
                                            customHeading="List of light beers"
                                            data={data.light_beers}
                                            handleViewDetail={this.handleViewDetail}
                                            />)} 
                                    />

                                    <Route path="/category/long-list/" render={(props) => 
                                        ( <ProductsList 
                                            {...props}
                                            pageTitle="Example of long list"
                                            customHeading="A long list of beers"
                                            data={data.long_list}
                                            handleViewDetail={this.handleViewDetail}
                                            />)} 
                                    />

                                    <Route exact path="/:id" render={(props) =>
                                        ( <ProductDetail
                                            {...props}
                                            beerId={beerId}
                                            beerInfo={oneBeerData}
                                            /> )}
                                    />

                                    <Route component={NoMatch}/>
                                </Switch>
                            </div>
                        </section>

                    </div>
        );
    }
}

export default App;