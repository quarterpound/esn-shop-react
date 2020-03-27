import React from 'react'
import ItemCard from './ItemCard';

class ItemsHolder extends React.Component {
    render = () => {
        if(this.props.items) {
            return this.props.items.map((it, key) => {
                return <ItemCard key={key} item={it}/>
            })
        }
    }
}

export default ItemsHolder;