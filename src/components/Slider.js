import React from 'react';
import arrow from '../assets/right.svg';
import Icon from '../components/Icon';
import "./Slider.css";


class Slider extends React.Component {
    state = {
        currentSlide: 0,
    }

    constructor(props) {
        super(props);
        this.images = props.images;
    }

    componentDidMount = () => {
        this.images.forEach((image) => {
            const img = new Image();
            img.src = image;
        })
    }

    handleSlide = (e) => {
        e.preventDefault();
        switch (e.currentTarget.getAttribute("data-slide-action")) {
            case 'back':
                if(this.state.currentSlide - 1 >= 0) {
                    this.setState({currentSlide: this.state.currentSlide - 1})
                }
                break;
            case 'forward':
                if(this.state.currentSlide + 1 < this.images.length) {
                    this.setState({currentSlide: this.state.currentSlide + 1})
                }
            break;

        }
    }

    render = () => {
        return (
            <div className="sliderContainer">
                <div className="itemImage" style={{backgroundImage: `url(${this.images[this.state.currentSlide]})`}} />
                <div className="sliderButtons">
                    <button className={(this.state.currentSlide - 1 < 0) ? "disabled-slide arrows" : "arrows"} data-slide-action="back" onClick={this.handleSlide}><Icon src={arrow} rotation={180} /></button>
                    <button className={(this.state.currentSlide + 1 >= this.images.length) ? "disabled-slide arrows" : "arrows"} data-slide-action="forward" onClick={this.handleSlide}><Icon src={arrow} /></button>
                </div>
            </div>
        )
    }
}

export default Slider;