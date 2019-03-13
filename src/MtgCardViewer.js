import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// Default Styling
import './MtgCardViewer.css';

// Components
import CardImageBox from './components/CardImageBox';
import CardName from './components/CardName';

/**
 * Inspector main component
 */
export class MtgCardViewer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchTerm: props.searchTerm,
            cardName: '',
            imageUri: '#',
            uri: '#',
            isHovered: false,
            cardFound: false,
            imageWidth: props.imageWidth ? props.imageWidth : '280px',
            mobileMode: props.mobileMode && props.mobileMode === true ? true : false
        }
        
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.mouseOverHandler = this.mouseOverHandler.bind(this);
        this.mouseLeaveHandler = this.mouseLeaveHandler.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
        this.onClickOutsideHandler = this.onClickOutsideHandler.bind(this);
    }

    componentDidMount() {  
        document.addEventListener('mousedown', this.onClickOutsideHandler);

        axios.get(this.buildUrl(this.state.searchTerm)).then(res => {
            let data = res.data;
            let amount = data.total_cards;

            if(amount) {
                let object = data.data[0];
                let imageUri = object.image_uris.normal;

                this.setState({
                    cardName: object.name,
                    imageUri: imageUri,
                    uri: object.scryfall_uri,
                    cardFound: true
                });
            }
        }).catch(err => {
            this.setState({
                cardName: '[card not found]'
            });
        });
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.onClickOutsideHandler);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }
     
    onClickOutsideHandler(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({
                isHovered: false
            });
        }
    }

    onClickHandler(e) {
        e.preventDefault();
       
        this.setState({
            isHovered: true
        });
    }

    mouseOverHandler() {
        this.setState({
            isHovered: true
        });
    }

    mouseLeaveHandler() {
        this.setState({
            isHovered: false
        });
    }

    buildUrl(cardName) {
        return `${this.scryfallSearch}!"${cardName}"`;
    }

    get scryfallSearch() {
        return 'https://api.scryfall.com/cards/search?q=';
    }

    render() {
        return (
            <>
                <ins className='mtgCardViewer' 
                     ref={ this.setWrapperRef }
                >
                    <CardName mobileMode={ this.state.mobileMode }
                            uri={ this.state.uri }
                            cardName={ this.state.cardName }
                            mouseOverHandler= { this.mouseOverHandler }
                            mouseLeaveHandler= { this.mouseLeaveHandler }
                            onClickHandler= { this.onClickHandler }
                    />
                    {
                        this.state.cardFound &&
                        <CardImageBox imageClass={ this.props.imageClass }
                                    imageStyling={ this.props.imageStyling }
                                    imageUri={ this.state.imageUri } 
                                    cardName={ this.state.cardName }
                                    imageWidth={ this.state.imageWidth }
                                    display={ this.state.isHovered }
                        />
                    }
                </ins>
                
            </>
        );
    }
}

MtgCardViewer.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    imageClass: PropTypes.string,
    imageStyling: PropTypes.object,
    mobileMode: PropTypes.bool,
    imageWidth: PropTypes.string
}