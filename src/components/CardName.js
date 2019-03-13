import React from 'react';
import PropTypes from 'prop-types';

const CardName = (props) => {  
    return (
        <>          
            {
                !props.mobileMode &&
                <a href={ props.uri }
                   onMouseOver={ props.mouseOverHandler }
                   onMouseLeave={ props.mouseLeaveHandler }
                >
                    { props.cardName }
                </a>
            }
            {
               props.mobileMode &&
                <a href={ props.uri }
                   onClick={ props.onClickHandler }
                >
                    { props.cardName }
                </a>
            }
        </>
    );
};

CardName.propTypes = {
    uri: PropTypes.string.isRequired,
    cardName: PropTypes.string.isRequired,
    mobileMode: PropTypes.bool.isRequired,
    mouseOverHandler: PropTypes.func,
    mouseLeaveHandler: PropTypes.func,
    onClickHandler: PropTypes.func,
    onClickOutsideHandler: PropTypes.func
}

export default CardName;



