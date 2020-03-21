import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { CATEGORIES } from '../c';
import actions from '../actions';
import Icon from './Icon';
import cart from "../assets/supermarket.svg";
import esn from "../assets/AZ_colour.png";
import './NavBar.css';


class NavBar extends React.Component {
    state = {}

    componentDidMount = () => {
        this.getCategories();
    }

    getCategories = async () => {
        const t = await axios.get(CATEGORIES);
        this.setState({cats: t.data});        
    }

    render() {
        return (
            <div className="navBarOuter">
                <div className="navBarInner">
                    <div className="logoArea">
                        <Link to="/"><img alt="ESN Star" src={esn} style={{width: "180px"}}/></Link>
                    </div>
                    <div style={{justifySelf: "right"}}>
                        <ul className="navBarLinks">
                            <li><Link to="/">home</Link></li>
                            {
                                (() => {
                                    if(this.state.cats && this.state.cats.length > 0) {
                                        return this.state.cats.map((cat, key) => {
                                            return <li key={key}><Link to={`/category/${cat.toLowerCase().replace(" ", "-")}`} >{cat}</Link></li>
                                        })
                                    }
                                })()
                            }
                            <li><Link to="/cart">{ this.props.cart.length === 0 ? <Icon alt="Shopping Cart" src={cart} width="20px"/> : this.props.cart.length}</Link></li>
                        </ul>  
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((state) => {return {cart: state}}, actions)(NavBar);