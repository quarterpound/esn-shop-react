import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import ItemPage from './pages/Item';
import Category from './pages/Category';

class App extends React.Component {
	render() {
		return (
			<div className="App">
				<Router>
					<NavBar cats={["t-shirts", "bags", "Sweat Shirts"]} />
					<div className="pageContainer">
						<Switch>
							<Route exact path="/category">
								<Redirect to="/" />
							</Route>
							<Route exact path="/product">
								<Redirect to="/" />
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
						</Switch>
					</div>
				</Router>
			</div>
		);
	}
}

export default App;
