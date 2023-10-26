import React, { useState,useEffect} from 'react'
import './Carousel.css'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CircleIcon from '@mui/icons-material/Circle';
import {ScreenWidthUpdater} from '../../utils/ScreenWidthUpdater'


const Carousel = ({ slidesData }) => {
    const [currentIndex, setCurrentIndex] = useState(1);

    const {screenWidth, updateScreenWidth} = ScreenWidthUpdater()
    useEffect(() => {
        updateScreenWidth
    }, [screenWidth])
    
    const gotoprevious = () => {
        const isFirstIndex = currentIndex === 0;
        const newIndex = isFirstIndex ? slidesData.length - 1 :
            currentIndex - 1;
        setCurrentIndex(newIndex)
    }

    const gotonext = () => {
        const isLastIndex = currentIndex === slidesData.length - 1;
        const newIndex = isLastIndex ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex)
    }
    const gotoslides = (slideIndex) => {
        setCurrentIndex(slideIndex)
    }
    const sliderStyle = {
        width:'30vw',
        // width: '336px',
        height: screenWidth <868 ?'45vw' :'80vh',
        borderRadius: '10px',
        backgroundImage: `url(${slidesData[currentIndex].url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
        
    }
    const sliderMobStyle = {
        width: '100%',
        height: '460px',
        borderRadius: '3px',
        backgroundImage: `url(${slidesData[currentIndex].url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        // boxShadow: '6px 10px 17px 3px #000000'
    }
    return (
        <div className="carousel">
            <div style={screenWidth<600 ?sliderMobStyle:sliderStyle}>
                <div className='Larrow' onClick={gotoprevious}><ChevronLeftIcon /></div>
                <div className='Rarrow' onClick={gotonext}><ChevronRightIcon /></div>
            <div className='dotContainer'>
                {slidesData.map((slide, slideIndex) => (
                    <div key={slideIndex} className={currentIndex === slideIndex?'active-dot':'dot'}
                        onClick={() => gotoslides(slideIndex)}><CircleIcon style={{ fontSize: '10px' }} />
                    </div>
                ))}
            </div>
            </div>
        </div>
    )
}

export default Carousel;