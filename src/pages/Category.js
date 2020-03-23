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
        this.setState({hasFound: itemsRaw.data.length > 0, items: itemsRaw.data.map(i => {
            return {
                id: i.id,
                title: i.title,
                thumb: `${IMAGES}/${i.thumb}`,
                price: i.price,
            }
        })})
    }

    render() {
        const title = `${this.props.cat.split("-").map(t => {return h.capitalize(t)}).join(" ")} | ESN Azerbaijan Webshop`
        if(!this.state.hasFound && typeof this.state.hasFound !== 'undefined') {
            const itmTitle = `Not Found | ESN Azerbaijan Webshop`;
            const itmDesc = "Want exclusive, cool ESN products and feel the wave of esners? Then you are in the right place. Where discounted prices and coolest products meet.";
            const itmImage = ESN;
            return (
                <>
                    <MetaTags>
                        <title>{itmTitle}</title>
                        <meta name="title" content={itmTitle} />
                        <meta name="description" content="Want exclusive, cool ESN products and feel the wave of esners? Then you are in the right place. Where discounted prices and coolest products meet." />

                        <meta property="og:type" content="website" />
                        <meta property="og:url" content="https://webshop.esn.az" />
                        <meta property="og:title" content={itmTitle} />
                        <meta property="og:description" content={itmDesc} />
                        <meta property="og:image" content={itmImage} />

                        <meta property="twitter:card" content="summary_large_image" />
                        <meta property="twitter:url" content="https://webshop.esn.az" />
                        <meta property="twitter:title" content={itmTitle} />
                        <meta property="twitter:description" content={itmDesc} />
                        <meta property="twitter:image" content={itmImage} />
                    </MetaTags>
                    <h2 style={{textAlign: 'center'}}>Sorry, the category you're looking for was not found</h2>
                </>
            )
        }

        return (
            <div className="homeOuter">
                <MetaTags>
                    <title>{title}</title>
                    <meta name="title" content={title} />
                    <meta name="description" content="Want exclusive, cool ESN products and feel the wave of esners? Then you are in the right place. Where discounted prices and coolest products meet." />

                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="https://webshop.esn.az" />
                    <meta property="og:title" content={title} />
                    <meta property="og:description" content="Want exclusive, cool ESN products and feel the wave of esners? Then you are in the right place. Where discounted prices and coolest products meet." />
                    <meta property="og:image" content={ESN} />

                    <meta property="twitter:card" content="summary_large_image" />
                    <meta property="twitter:url" content="https://webshop.esn.az" />
                    <meta property="twitter:title" content={title} />
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
