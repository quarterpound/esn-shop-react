import React from 'react';
import axios from "axios";
import MetaTags from 'react-meta-tags';
import { useParams } from 'react-router-dom';
import h from '../helpers'; 
import ItemsHolder from '../components/ItemsHolder';
import ESN from '../assets/AZ_colour.png';
import "./Home.css";
import { CATEGORIES, IMAGES } from '../c';

class Category extends React.Component {
    state = {}

    componentDidMount = () => {
        this.getCategory()
    }

    getCategory = async () => {
        const itemsRaw = await axios.get(`${CATEGORIES}/${this.props.cat}`);
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
                    <title>{this.props.cat.split("-").map(t => {return h.capitalize(t)}).join(" ")} | ESN Azerbaijan Webshop</title>
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


function CategoryWrapper () {
    let {cat} = useParams();
    return (<Category cat={cat} key={cat} />)
}

export default CategoryWrapper;
