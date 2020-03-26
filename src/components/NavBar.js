import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import posed from 'react-pose';
import { CATEGORIES } from '../c';
import actions from '../actions';
import Icon from './Icon';
import menu from '../assets/open-menu.svg';
import close from '../assets/close.svg';
import cart from "../assets/supermarket.svg";
import esn from "../assets/AZ_colour.png";
import './NavBar.css';

const Box = posed.div({
    open: { applyAtStart: { display: 'block' }, opacity: 1, marginTop: '10px', height: "auto", transition: {duration: 200} },
    closed: { applyAtEnd: { display: 'none' }, opacity: 0, height: 0, marginTop: 0, transition: {duration: 200} }
})

class NavBar extends React.Component {
    state = {isMobileMenuOpen: false}

    componentDidMount = () => {
        this.getCategories();
    }

    getCategories = async () => {
        const t = await axios.get(CATEGORIES);
        this.setState({cats: t.data});        
    }


    render() {

        return (
            <>
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
                                <li><Link to="/faq">FAQ</Link></li>
                                <li><Link to="/cart">{ this.props.cart.length === 0 ? <Icon alt="Shopping Cart" src={cart} width="20px"/> : this.props.cart.length}</Link></li>
                            </ul>
                            <ul className="navBarLinksMobile">
                                <li><Link to="/cart">{ this.props.cart.length === 0 ? <Icon alt="Shopping Cart" src={cart} width="20px"/> : this.props.cart.length}</Link></li>
                                <li><Icon src={this.state.isMobileMenuOpen ? close : menu} onClick={() => {this.setState({isMobileMenuOpen: !this.state.isMobileMenuOpen})}} /></li>
                            </ul>    
                        </div>
                    </div>
                </div>
                <Box pose={this.state.isMobileMenuOpen ? 'open' : 'closed'}>
                    <div className="mobileFirendlyDiv">
                        <ul>
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
                            <li><Link to="/faq">FAQ</Link></li>
                            {/* <li><Link to="/cart">CART { this.props.cart.length === 0 ? <Icon alt="Shopping Cart" src={cart} width="20px"/> : this.props.cart.length}</Link></li> */}
                        </ul>
                    </div>
                </Box>
            </>
        )
    }
}

export default connect((state) => {return {cart: state}}, actions)(NavBar);