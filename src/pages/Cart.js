import React from 'react';
import axios from 'axios';
import validator from 'validate.js';
import { connect } from 'react-redux';
import { ITEMS, IMAGES, PURCHASES } from '../c';
import actions from '../actions';
import "./Cart.css";

class Cart extends React.Component {
    state = {success: false, submitLoading: false};

    componentDidMount = () => {
        this.getCartItems();
    }

    calculateTotal = () => {
        if(this.state.cart) {
            let sum = 0;
            for(const t of this.state.cart) {
                sum += t.price * t.qty;
            }
            return sum;
        }
        return 0;
    }

    submitOrder = async (e) => {
        e.preventDefault();
        if(!validator(this.state, this.constraints) && this.props.cart.length !== 0){
            this.setState({submitLoading: true});
            try {
                await axios.post(`${PURCHASES}`, {
                    first: this.state.first,
                    last: this.state.last,
                    email: this.state.email,
                    phoneNumber: this.state.phone,
                    items: this.props.cart.map(t => {
                        return {
                            id: t.id,
                            quantity: t.qty,
                        }
                    })
                })
                this.setState({submitLoading: false, success: true});
                setTimeout(() => {
                    window.location.href = "/";
                }, 3000);
                this.props.clear();
            } catch(e) {
                console.log(e);
            }
        };
    }

    constraints = {
        first: {
            presence: true,
            type: "string",
            length: {
                minimum: 1,
                maximum: 30,
            }
        },
        last: {
            presence: true,
            type: "string",
            length: {
                minimum: 1,
                maximum: 30,
            }
        },
        email: {
            presence: true,
            email: true,
        },
        phone: {
            presence: true,
            length: {
                minimum: 9,
                maximum: 10,
            }
        }
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
    }

    render() {
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
                            <p className="total">₼ {this.calculateTotal().toFixed(2)}</p>
                        </div>
                    </div>
                    <div className="checkOut">
                        <div className="checkOutInner" style={ this.state.success ? {height: "100%", border: 'none'} : {} }>
                            {
                                (() => {
                                    if(!this.state.success) {
                                        return (
                                            <div>
                                                <h3 className="checkOutTitle">Check out</h3>
                                                <form>
                                                    <div className="formRow" style={{gridTemplateColumns: "1fr 1fr"}}>
                                                        <input disabled={this.state.submitLoading} onChange={((e) => {e.persist(); this.setState({first: e.currentTarget.value})})} type="text" placeholder="First Name" className="formInput" />
                                                        <input disabled={this.state.submitLoading} onChange={((e) => {e.persist(); this.setState({last: e.currentTarget.value})})} type="text" placeholder="Last Name" className="formInput" />
                                                    </div>
                                                    <div className="formRow" style={{gridTemplateColumns: "1fr"}}>
                                                        <input disabled={this.state.submitLoading} onChange={((e) => {e.persist(); this.setState({email: e.currentTarget.value})})} type="email" placeholder="Email" className="formInput" />
                                                    </div>
                                                    <div className="formRow" style={{gridTemplateColumns: "1fr"}}>
                                                        <input disabled={this.state.submitLoading} onChange={((e) => {e.persist(); this.setState({phone: e.currentTarget.value})})} type="text" placeholder="Phone Number (551230000)" className="formInput" />
                                                    </div>
                                                    <div className="finePrint">
                                                        <p>By placing this order you agree to </p>
                                                    </div>
                                                    <div className="formRow">
                                                        <button disabled={this.state.submitLoading} onClick={this.submitOrder} className="formInput">Place Order</button>
                                                    </div>                                
                                                </form>
                                            </div>
                                        )
                                    }

                                    return (
                                        <div>
                                            <h2 style={{textAlign: 'center'}}>Success</h2>
                                            <h3 style={{textAlign: 'center'}}>We will message you soon!</h3>
                                            <div className="finePrint">
                                                <p style={{textAlign: 'center'}}>You are being redirected to the home page, thanks for shopping with us, you will recieve an email shortly!</p>
                                            </div>
                                        </div>
                                    )
                                })()
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((state) => {return {cart: state}}, actions)(Cart);