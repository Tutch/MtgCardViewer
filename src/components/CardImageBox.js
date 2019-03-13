import React from 'react';
import PropTypes from 'prop-types';

const CardImageBox = (props) => {   
    let defaultStyling = {width: props.imageWidth};

    return (
            <>
                {
                    props.display &&
                    <img className={ props.imageClass ? props.imageClass : 'mtgCardViewerBox' }
                         src={ props.imageUri }
                         alt={ props.cardName }
                         style={ props.imageStyling ? props.imageStyling : defaultStyling }
                    >
                    </img>  
                }
            </>
    );
};

CardImageBox.propTypes = {
    cardName: PropTypes.string,
    imageUri: PropTypes.string,
    imageClass: PropTypes.string,
    style: PropTypes.object,
    imageWidth: PropTypes.string
}

export default CardImageBox;