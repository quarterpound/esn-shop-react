import React from 'react';
import axios from "axios";
import MetaTags from 'react-meta-tags';
import ESN from '../assets/AZ_colour.png'
import ItemsHolder from '../components/ItemsHolder';
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
                <MetaTags>
                    <title>Home | ESN Azerbaijan Webshop</title>
                    <meta name="title" content="Home | ESN Azerbaijan Webshop" />
                    <meta name="description" content="Want exclusive, cool ESN products and feel the wave of esners? Then you are in the right place. Where discounted prices and coolest products meet." />

                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="https://webshop.esn.az" />
                    <meta property="og:title" content="Home | ESN Azerbaijan Webshop" />
                    <meta property="og:description" content="Want exclusive, cool ESN products and feel the wave of esners? Then you are in the right place. Where discounted prices and coolest products meet." />
                    <meta property="og:image" content={ESN} />

                    <meta property="twitter:card" content="summary_large_image" />
                    <meta property="twitter:url" content="https://webshop.esn.az" />
                    <meta property="twitter:title" content="Home | ESN Azerbaijan Webshop" />
                    <meta property="twitter:description" content="Want exclusive, cool ESN products and feel the wave of esners? Then you are in the right place. Where discounted prices and coolest products meet." />
                    <meta property="twitter:image" content={ESN} />
                </MetaTags>
                <div className="homeInner">
                    {
                        (() => {
                            if(this.state.items){
                                return <ItemsHolder items={this.state.items} />
                            }                                
                        })()
                    }
                </div>
            </div>
        )   
    }
}

export default Home;