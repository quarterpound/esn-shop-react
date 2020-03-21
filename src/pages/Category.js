import React from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import ItemsHolder from '../components/ItemsHolder';
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
