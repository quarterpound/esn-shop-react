import React from 'react';
import qrcode from 'qrcode';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {connect} from 'react-redux';
import actions from '../actions';
import {ITEMS} from '../c';
import Icon from '../components/Icon';
import loading from '../assets/loading.gif';
import Slider from '../components/Slider';
import plus from '../assets/plus.svg';
import minus from '../assets/minus.svg';
import "./Item.css"

class Item extends React.Component {
    state = {
        selectedTab: 1,
        itmQty: 1,
        itmPrice: 345.00,
        currentSlide: 0,
    }

    async componentDidMount() {
        this.getItem();
        this.generateQrCode();
    }

    getItem = async () => {
        try {
            const rawItem = await axios.get(`${ITEMS}/${this.props.item}`);
            this.setState({
                itmPrice: rawItem.data.price,
                itmQtyMax: rawItem.data.quantity,
                itmTitle: rawItem.data.title,
                itmImages: rawItem.data.images,
                itmCtg: rawItem.data.category,
                itmDesc: rawItem.data.description
            })

        }catch(e) {
            if(e) {
                console.log(e);
            }
        }        
    }

    isThisItemInCart = () => {
        return this.props.cart.filter(c => {
            if(c.id === this.props.item) {
                return c;
            } 
            return null;
        }).length === 1
    }

    addToCart = () => {
        if(!this.isThisItemInCart()) {
            this.props.addItem({id: this.props.item, qty: this.state.itmQty})
        }
    }

    generateQrCode = async () => {
        const qr = await qrcode.toDataURL(window.location.href, {margin: 0})
        this.setState({
            qrCode: qr
        })
    }

    handleQtyChange(e) {
        e.preventDefault();
        switch (e.currentTarget.getAttribute("data-qty-action")) {
            case "minus":
                if(this.state.itmQty > 1)
                    this.setState({itmQty: this.state.itmQty - 1})
                break;
            case "plus":
                if(this.state.itmQty < this.state.itmQtyMax)
                    this.setState({itmQty: this.state.itmQty + 1})
                break;
            default:
                return;
        }
    }
    
    handleTabSwitch(e) {
        e.preventDefault();
        this.setState({selectedTab: parseInt(e.target.getAttribute("data-tab-index"))})
    }


    render = () => {
        return (
            <div className="itemOuter">
                <div className="itemInner">
                    <div>
                        {
                            (() => {
                                if(this.state.itmImages) {
                                    return <Slider images={this.state.itmImages} />
                                }
                            })()
                        }
                    </div>
                    <div className="itemDetails">
                        <div>
                            <div className="qrCode">
                                <div>
                                    <p className="itemCategory">{this.state.itmCtg}</p>
                                    <h1 className="itemName">{this.state.itmTitle}</h1>
                                </div>
                                <div className="qrCodeContainer">
                                    <img className="qrCodeImage" src={ this.state.qrCode || loading} alt="QR Code" />
                                </div>
                            </div>
                            <div className="itemPriceAndQty">
                                <div>
                                    <p className="tabTitle">PRICE</p>
                                    <p className="itemPrice">₼{this.state.itmPrice.toFixed(2)}</p>
                                </div>
                                <div>
                                    <p className="tabTitle">QUANTITY</p>
                                    <div className="quantityContainer">
                                        <div className="quantityContainerInner">
                                            <button data-qty-action="minus" onClick={(e) => {this.handleQtyChange(e)}} className="button-spec"><Icon width="10px" src={minus} /></button>
                                            <span style={{justifySelf: 'center'}}>{this.state.itmQty}</span>
                                            <button data-qty-action="plus" onClick={(e) => {this.handleQtyChange(e)}} className="button-spec"><Icon width="10px" src={plus} /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="moreDetailstabs">
                                <div className="tabSwitchBar">
                                    {/* <button data-tab-index="0" className={(this.state.selectedTab === 0) ? "selected" : ""} onClick={(e) => {this.handleTabSwitch(e)}}>DETAILS</button> */}
                                    <button data-tab-index="1" className={(this.state.selectedTab === 1) ? "selected" : ""} onClick={(e) => {this.handleTabSwitch(e)}}>DESCRIPTION</button>
                                </div>
                                <div className="tabOuter">
                                    <Tab1 data={this.state.itmDesc} />
                                </div>
                            </div>
                        </div>
                        <div className="pricing" style={{alignSelf: "end"}}>
                            <div>
                                <span className="total-price-tab">TOTAL PRICE</span>
                                <p className="total-price">₼{(this.state.itmPrice * this.state.itmQty).toFixed(2)}</p>
                            </div>
                            <div>
                                {
                                    (() => {
                                        return <button className="add-to-cart" style={this.isThisItemInCart() ? {backgroundColor: 'var(--color-orange)'} : {}} disabled={this.isThisItemInCart()} onClick={this.addToCart}>{this.isThisItemInCart() ? "Added to cart!" : "Add to cart"}</button>
                                    })()
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function ItemWrapper(props) {
    let {id} = useParams();
    return (<Item item={id} cart={props.cart} addItem={props.addItem} removeItem={props.removeItem} />)
}

const Tab1 = (props) => {
    return (
        <div>
            {
                (() => {
                    if(props.data) {
                        return props.data.split('\n').map(p => {
                            return <p key={p}>{p}</p>
                        })
                    }
                })()
            }
        </div>
    )
}

export default connect(state => {return {cart: state}}, actions)(ItemWrapper);