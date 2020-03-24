import React from 'react';
import axios from 'axios';
import validator from 'validate.js';
import { connect } from 'react-redux';
import MetaTags from 'react-meta-tags';
import I from '../components/Icon';
import close from '../assets/close.svg';
import ESN from '../assets/AZ_colour.png';
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
        const check = validator(this.state, this.constraints)
        if(!check && this.props.cart.length !== 0){
            this.setState({submitLoading: true, errors: null});
            try {
                const t = await axios.post(`${PURCHASES}`, {
                    first: this.state.firstName,
                    last: this.state.lastName,
                    email: this.state.email,
                    phoneNumber: this.state.phoneNumber,
                    items: this.props.cart.map(t => {
                        return {
                            id: t.id,
                            quantity: t.qty,
                        }
                    })
                })
                this.setState({submitLoading: false, success: true, purchaseId: t.data});
                this.props.clear();
            } catch(e) {
                console.log(e);
            }
        } else {
            this.placeErrors(check);
        }
    }

    placeErrors = (errors) => {
        const merged = [].concat.apply([], Object.values(errors));
        this.setState({errors: merged})
    }

    constraints = {
        firstName: {
            presence: true,
            type: "string",
            length: {
                minimum: 1,
                maximum: 30,
                message: "too long"
            }
        },
        lastName: {
            presence: true,
            type: "string",
            length: {
                minimum: 1,
                maximum: 30,
                message: "too long"
            }
        },
        email: {
            presence: true,
            email: true,
        },
        phoneNumber: {
            presence: true,
            length: {
                minimum: 9,
                maximum: 10,
                message: "must be a valid Azerbaijani phone number"
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
        if(this.state.cart && this.state.cart.length === 0) {
            return (
                <div>
                    {/* <h2 className="pageTitle">Cart</h2> */}
                    <h2 style={{textAlign: "center"}}>Your cart seems to be empty</h2>
                    <p style={{textAlign: "center"}}>Go back to the <a style={{color: "var(--color-orange)", textDecoration: 'none'}} href="/">homepage</a></p>
                </div>
            )
        }

        if(this.state.success) {
            return (
                <div>
                    <h2>Order was placed!</h2>
                    <h3>Order number is: {this.state.purchaseId}</h3>
                    <p>You will recieve an email confirmation shortly at <span style={{color: `var(--color-orange)`}}>{this.state.email}</span></p>
                    <h4><a style={{color: `var(--color-orange)`, textDecoration: 'none'}} href="/" >Print Receipt</a> </h4>
                </div>
            )
        }

        return (
            <div>
                <div className="smallGrid">
                    <MetaTags>
                        <title>Cart | ESN Azerbaijan Webshop</title>
                        <meta name="title" content="Cart | ESN Azerbaijan Webshop" />
                        <meta name="description" content="Want exclusive, cool ESN products and feel the wave of esners? Then you are in the right place. Where discounted prices and coolest products meet." />

                        <meta property="og:type" content="website" />
                        <meta property="og:url" content="https://webshop.esn.az" />
                        <meta property="og:title" content="Cart | ESN Azerbaijan Webshop" />
                        <meta property="og:description" content="Want exclusive, cool ESN products and feel the wave of esners? Then you are in the right place. Where discounted prices and coolest products meet." />
                        <meta property="og:image" content={ESN} />

                        <meta property="twitter:card" content="summary_large_image" />
                        <meta property="twitter:url" content="https://webshop.esn.az" />
                        <meta property="twitter:title" content="Cart | ESN Azerbaijan Webshop" />
                        <meta property="twitter:description" content="Want exclusive, cool ESN products and feel the wave of esners? Then you are in the right place. Where discounted prices and coolest products meet." />
                        <meta property="twitter:image" content={ESN} />
                    </MetaTags>
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
                                                <button style={{justifySelf: 'right'}} className="closeButton" index={itm.id} onClick={this.removeFromCart}> <I width={"15px"} src={close} /> </button>
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
                        <div>
                            <h3 className="checkOutTitle">Check out</h3>
                            <form>
                                <div className="formRow" style={{gridTemplateColumns: "1fr 1fr"}}>
                                    <input disabled={this.state.submitLoading} onChange={((e) => {e.persist(); this.setState({firstName: e.currentTarget.value})})} type="text" placeholder="First Name" className="formInput" />
                                    <input disabled={this.state.submitLoading} onChange={((e) => {e.persist(); this.setState({lastName: e.currentTarget.value})})} type="text" placeholder="Last Name" className="formInput" />
                                </div>
                                <div className="formRow" style={{gridTemplateColumns: "1fr"}}>
                                    <input disabled={this.state.submitLoading} onChange={((e) => {e.persist(); this.setState({email: e.currentTarget.value})})} type="email" placeholder="Email" className="formInput" />
                                </div>
                                <div className="formRow" style={{gridTemplateColumns: "1fr"}}>
                                    <input disabled={this.state.submitLoading} onChange={((e) => {e.persist(); this.setState({phoneNumber: e.currentTarget.value})})} type="text" placeholder="Phone Number (551230000)" className="formInput" />
                                </div>
                                <div>
                                    {
                                        (() => {
                                            if(this.state.errors) {
                                                return(
                                                    <ul className="errorsUl">
                                                        {
                                                            (() => {
                                                                return this.state.errors.map(t => {
                                                                    return <li className="formError">{t}</li>
                                                                })
                                                            })()
                                                        }
                                                    </ul>
                                                )
                                            }
                                        })()
                                    }    
                                </div>   
                                <div className="formRow">
                                    <button disabled={this.state.submitLoading} onClick={this.submitOrder} className="formInput">Place Order</button>
                                </div>     
                                <div className="finePrint">
                                    <p>By placing this order you agree to </p>
                                </div>                   
                            </form>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((state) => {return {cart: state}}, actions)(Cart);