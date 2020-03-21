import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import actions from '../actions';
import Icon from './Icon';
import cart from "../assets/supermarket.svg";
import esn from "../assets/AZ_colour.png";
import './NavBar.css';


class NavBar extends React.Component {
    render() {
        console.log(this.props.cart);

        return (
            <div className="navBarOuter">
                <div className="navBarInner">
                    <div className="logoArea">
                        <Link to="/"><img alt="ESN Star" src={esn} style={{width: "180px"}}/></Link>
                        {/* <span className="logoText"><Link to="/">ESN Azerbaijan</Link></span> */}
                    </div>
                    <div style={{justifySelf: "right"}}>
                        <ul className="navBarLinks">
                            <li><Link to="/">home</Link></li>
                            {
                                (() => {
                                    if(this.props.cats.length > 0) {
                                        return this.props.cats.map((cat, key) => {
                                            return <li key={key}><Link to={`/category/${cat.toLowerCase().replace(" ", "-")}`} >{cat}</Link></li>
                                        })
                                    }
                                })()
                            }
                            <li><Link to="/cart"><Icon alt="Shopping Cart" src={cart} width="20px"/></Link></li>
                        </ul>  
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((state) => {return {cart: state}}, actions)(NavBar);