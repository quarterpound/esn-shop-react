import React from 'react';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import ItemPage from './pages/Item';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

class App extends React.Component {
	render() {
		return (
			<div className="App">
				<Router>
					<NavBar cats={["t-shirts", "bags", "Sweat Shirts"]} />
					<div className="pageContainer">
						<Switch>
							<Route exact path="/">
								<Home />
							</Route>
							<Route exact path="/category">
								<Redirect to="/" />
							</Route>
							<Route exact path="/product">
								<Redirect to="/" />
							</Route>
							<Route path="/category/:cat">
								<Redirect to="/" />
							</Route>
							<Route path="/product/:id">
								<ItemPage />
							</Route>
						</Switch>
					</div>
				</Router>
			</div>
		);
	}
}

export default App;
