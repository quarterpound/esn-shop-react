import React from 'react';
import { useParams } from 'react-router-dom';
import Icon from '../components/Icon';
import sampleImage from '../assets/bag.jpg'
import plus from '../assets/plus.svg';
import minus from '../assets/minus.svg';
import "./Item.css"

class Item extends React.Component {
    state = {
        selectedTab: 0,
        itemQty: 1,
        itmPrice: 345.00,
    }

    handleTabSwitch(e) {
        e.preventDefault();
        this.setState({selectedTab: parseInt(e.target.getAttribute("data-tab-index"))})
    }

    handleQtyChange(e) {
        e.preventDefault();
        switch (e.currentTarget.getAttribute("data-qty-action")) {
            case "minus":
                if(this.state.itemQty > 1)
                    this.setState({itemQty: this.state.itemQty - 1})
                break;
            case "plus":
                if(this.state.itemQty < 10)
                    this.setState({itemQty: this.state.itemQty + 1})
                break;
        }
    }

    render() {
        return (
            <div className="itemOuter">
                <div className="itemInner">
                    <div>
                        <img style={{width: "90%"}} src={sampleImage} />
                    </div>
                    <div className="itemDetails">
                        <div>
                            <p className="itemCategory">Category</p>
                            <h1 className="itemName">Item Name</h1>
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
                                            <span style={{justifySelf: 'center'}}>{this.state.itemQty}</span>
                                            <button data-qty-action="plus" onClick={(e) => {this.handleQtyChange(e)}} className="button-spec"><Icon width="10px" src={plus} /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="moreDetailstabs">
                                <div className="tabSwitchBar">
                                    <button data-tab-index="0" className={(this.state.selectedTab === 0) ? "selected" : ""} onClick={(e) => {this.handleTabSwitch(e)}}>DETAILS</button>
                                    <button data-tab-index="1" className={(this.state.selectedTab === 1) ? "selected" : ""} onClick={(e) => {this.handleTabSwitch(e)}}>DESCRIPTION</button>
                                </div>
                                <div className="tabOuter">
                                {
                                    (() => {
                                        switch (this.state.selectedTab) {
                                            case 0:
                                                return (<Tab0 />)
                                            case 1:
                                                return (<Tab1 />)

                                        } 
                                    })()
                                }
                                </div>
                            </div>
                        </div>
                        <div className="pricing" style={{alignSelf: "end"}}>
                            <div>
                                <span style={{fontSize: '11pt'}}>TOTAL PRICE</span>
                                <p className="total-price">₼{this.state.itmPrice * this.state.itemQty}</p>
                            </div>
                            <div>
                                <button className="add-to-cart">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function ItemWrapper() {
    let {id} = useParams();
    return (<Item item={id} />)
}

function Tab0() {
    return (
        <div>
            <ul>
                <li>Something</li>
                <li>Something</li>
                <li>Something</li>
                <li>Something</li>
            </ul>
        </div>
    )
}

function Tab1() {
    return (
        <div>
            <p>Really Cool ESN Blue BagCupidatat occaecat voluptate ut dolor culpa ullamco laborum consectetur elit laboris. Nisi occaecat amet consequat incididunt labore reprehenderit adipisicing exercitation commodo deserunt. Voluptate officia consequat mollit dolor adipisicing aliqua amet adipisicing Lorem irure.</p>
        </div>
    )
}

export default ItemWrapper;