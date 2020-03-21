import React from 'react';
import axios from "axios";
import ItemCard from '../components/ItemCard'
import "./Home.css";
import { ITEMS, IMAGES } from '../c';

class Home extends React.Component {
    state = {}
    
    componentDidMount = async () => {
        const itemsRaw = await axios.get(ITEMS);
        this.setState({items: itemsRaw.data.map(i => {
            return {
                id: i.id,
                title: i.title,
                thumb: `${IMAGES}/${i.thumb}`,
                price: i.price,
            }
        })})
    }

    render() {
        return (
            <div className="homeOuter">
                <div className="homeInner">
                    {
                        (() => {
                            if(this.state.items){
                                return this.state.items.map((it, key) => {
                                    return <ItemCard key={key} item={it}/>
                                })
                            }                                
                        })()
                    }
                </div>
            </div>
        )   
    }
}

export default Home;