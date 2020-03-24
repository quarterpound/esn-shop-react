import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import MetaTags from 'react-meta-tags';
import ESN from './assets/AZ_colour.png'
import NavBar from './components/NavBar';
import Home from './pages/Home';
import ItemPage from './pages/Item';
import Category from './pages/Category';
import Cart from './pages/Cart';
import Faq from './pages/Faq';
import Footer from './components/Footer';

class App extends React.Component {
	render() {
		return (
			<div className="App">
				<Router>
					<div style={{display: "grid", gridAutoRows: "auto"}}>
						<NavBar />
						<div className="pageContainer">
							<Switch>
								<Route exact path="/category">
									<Redirect to="/" />
								</Route>
								<Route exact path="/product">
									<Redirect to="/" />
								</Route>
								<Route exact path="/cart">
									<Cart />
								</Route>
								<Route exact path="/faq">
									<Faq />
								</Route>
								<Route path="/category/:cat">
									<Category />
								</Route>
								<Route path="/product/:id">
									<ItemPage />
								</Route>
								<Route exact path="/">
									<Home />
								</Route>
								<Route>
									<div>
										<MetaTags>
											<title>Not Found | ESN Azerbaijan Webshop</title>
											<meta name="title" content="Not Found | ESN Azerbaijan Webshop" />
											<meta name="description" content="Want exclusive, cool ESN products and feel the wave of esners? Then you are in the right place. Where discounted prices and coolest products meet." />

											<meta property="og:type" content="website" />
											<meta property="og:url" content="https://webshop.esn.az" />
											<meta property="og:title" content="Not Found | ESN Azerbaijan Webshop" />
											<meta property="og:description" content="Want exclusive, cool ESN products and feel the wave of esners? Then you are in the right place. Where discounted prices and coolest products meet." />
											<meta property="og:image" content={ESN} />

											<meta property="twitter:card" content="summary_large_image" />
											<meta property="twitter:url" content="https://webshop.esn.az" />
											<meta property="twitter:title" content="Not Found | ESN Azerbaijan Webshop" />
											<meta property="twitter:description" content="Want exclusive, cool ESN products and feel the wave of esners? Then you are in the right place. Where discounted prices and coolest products meet." />
											<meta property="twitter:image" content={ESN} />
										</MetaTags>
										<h2 style={{textAlign: 'center'}}>Sorry, the requested page does not exsist</h2>
									</div>
								</Route>
							</Switch>
						</div>
						<Footer />
					</div>
				</Router>
			</div>
		);
	}
}

export default App;
