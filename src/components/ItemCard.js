import React from 'react';
import {Link} from 'react-router-dom'
import "./ItemCard.css";

class ItemCard extends React.Component {
    render() {
        return( 
            <div className="itemCardOuter">
                <Link to={`/product/${this.props.item.id}`}><div className="itemCardImage" style={{backgroundImage: `url(${this.props.item.thumb})`}}></div></Link>
                <div className="itemCardDetails">
                    <p className="itemCardName"><Link to={`/product/${this.props.item.id}`}>{this.props.item.title}</Link></p>
                    <p className="itemCardPrice">{`₼ ${this.props.item.price.toFixed(2)}`}</p>
                </div>
            </div>
        )
    }
}

export default ItemCard;