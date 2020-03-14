import React from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import cart from "../assets/supermarket.svg";
import esn from "../assets/esn.png";
import './NavBar.css';


class NavBar extends React.Component {
    render() {
        return (
            <div className="navBarOuter">
                <div className="navBarInner">
                    <div className="logoArea">
                        <Link to="/"><img src={esn} style={{width: "50px"}}/></Link>
                        <span className="logoText"><Link to="/">ESN Azerbaijan</Link></span>
                    </div>
                    <div style={{justifySelf: "right"}}>
                        <ul className="navBarLinks">
                            <li><Link to="/">home</Link></li>
                            {
                                (() => {
                                    if(this.props.cats.length > 0) {
                                        return this.props.cats.map((cat, key) => {
                                            return <li><Link key={key} to={`/category/${cat.toLowerCase().replace(" ", "-")}`} >{cat}</Link></li>
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

export default NavBar;