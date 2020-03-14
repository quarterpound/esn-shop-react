import React from 'react';

function Icon(props) {
    return (
        <img src={props.src} alt={props.alt} style={{width: (props.width) ? props.width : "25px"}} />
    )
}

export default Icon;