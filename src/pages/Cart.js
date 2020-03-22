import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { ITEMS, IMAGES } from '../c';
import actions from '../actions';
import "./Cart.css";

class Cart extends React.Component {
    state = {};

    componentDidMount = () => {
        this.getCartItems();
    }

    calculateTotal = () => {
        let sum = 0;
        for(const t of this.state.cart) {
            sum += t.price * t.qty;
        }
        this.setState({total: sum});
    }

    getCartItems = async () => {
        let itemsMapped = [];

        for (const itm of this.props.cart){
            const f = await axios.get(`${ITEMS}/${itm.id}`);
            let tobeadded = {
                id: itm.id,
                title: f.data.title, 
                maxQty: f.data.quantity,
                qty: itm.qty,
                price: f.data.price,
                image: f.data.thumb,
            }

            itemsMapped = [tobeadded, ...itemsMapped];
        }

        this.setState({cart: itemsMapped});
        this.calculateTotal();

    }

    removeFromCart = async (e) => {
        e.persist();
        const index = e.currentTarget.getAttribute("index");
        this.props.removeItem(index)
        this.setState((state) => {
            return {
                cart: state.cart.filter(t => {return t.id !== index})
            }
        })
        this.calculateTotal();
    }

    render() {
        console.log(this.state.cart);
        return (
            <div>
                <h2 className="pageTitle">Cart</h2>
                <div className="smallGrid">
                    <div className="itemsContainer">
                        <div className="itemsHolder">
                            {

                                (() => {
                                    if(this.state.cart) {
                                        return this.state.cart.map((itm, key) => {
                                            return (
                                                <div key={key} className="itemPreview">
                                                    <img className="itemImage" alt={itm.title} src={`${IMAGES}/${itm.image}`} />
                                                    <p className="itemText">{itm.title}</p>
                                                    <p>{itm.qty}</p>
                                                    <p style={{fontWeight: 'bold'}} >₼ {itm.price.toFixed(2)}</p>
                                                    <button style={{justifySelf: 'right'}} index={itm.id} onClick={this.removeFromCart} >X</button>
                                                </div>
                                            )
                                        })
                                    }
                                })()
                            }
                        </div>
                        <div className="totalContainer">
                            <h3 className="totalTitle">Total</h3>
                            <p className="total">₼ {this.state.total ? this.state.total.toFixed(2) : "Calcualting..."}</p>
                        </div>
                    </div>
                    <div className="checkOut">
                        <div className="checkOutInner">
                            <h3 className="checkOutTitle">Check out</h3>
                            <form>
                                <div className="formRow" style={{gridTemplateColumns: "1fr 1fr"}}>
                                    <input type="text" placeholder="First Name" className="formInput" />
                                    <input type="text" placeholder="Last Name" className="formInput" />
                                </div>
                                <div className="formRow" style={{gridTemplateColumns: "1fr"}}>
                                    <input type="email" placeholder="Email" className="formInput" />
                                </div>
                                <div className="formRow" style={{gridTemplateColumns: "1fr"}}>
                                    <input type="text" placeholder="Phone Number (551230000)" className="formInput" />
                                </div>
                                <div className="finePrint">
                                    <p>By placing this order you agree to </p>
                                </div>
                                <div className="formRow">
                                    <button className="formInput">Place Order</button>
                                </div>                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((state) => {return {cart: state}}, actions)(Cart);