import React from 'react';

function Icon(props) {
    return (
        <img onClick={props.onClick}  src={props.src}  alt={props.alt} style={{width: (props.width) ? props.width : "25px", transform: `rotate(${(props.rotation) ? props.rotation : "0"}deg)`}} />
    )
}

export default Icon;