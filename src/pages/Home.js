import React from 'react';
import ItemCard from '../components/ItemCard'
import img0 from '../assets/bag.jpg';
import img1 from '../assets/bag2.jpg';
import img2 from '../assets/img3.jpg';
import img3 from '../assets/img4.jpg';
import img4 from '../assets/img5.jpg';
import "./Home.css";
class Home extends React.Component {
    render() {
        const items = [
            {
                id: 323,
                image: img0,
                name: "Blue Bag",
                price: 23.5,
            },
            {
                id: 324,
                image: img1,
                name: "Something",
                price: 12.7,
            },
            {
                id: 324,
                image: img2,
                name: "Something",
                price: 12.7,
            },
            {
                id: 324,
                image: img3,
                name: "Something",
                price: 12.7,
            },
            {
                id: 324,
                image: img4,
                name: "Something",
                price: 12.7,
            }
        ]

        return (
            <div className="homeOuter">
                <div className="homeInner">
                    {
                        (() => {
                            return items.map(it => {
                                return <ItemCard item={it}/>
                            })
                        })()
                    }
                </div>
            </div>
        )   
    }
}

export default Home;