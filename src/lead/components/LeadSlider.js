import React,{useState, useEffect} from 'react';
import './LeadSlider.css';
import Slider from "react-slick";
import LeadSliderItem from "./LeadSliderItem";
import {useWindowSize} from '../../shared/hooks/size-hook';
import Button from '../../shared/components/FormElements/Button';

const LeadSlider = props => {
const [isMobile, setIsMobile] = useState();
const size = useWindowSize(true);
const [imgHeight, setImgHeight] = useState(300);
const [count, setCount] = useState(3);


const settings = {
   dots: true,
   prevArrow: false,
 nextArrow: false,
   infinite: true,
 slidesToShow:4,
   slidesToScroll: 1,
   autoplay: true,
   speed: 750,
 autoplaySpeed: props.speed,
 cssEase: "ease-in-out",
 
}

useEffect(() => {

const setMobileMode = () => {
  if(size.width < 768){
    console.log("wiiidth: ", size.width )
    setIsMobile(true)
  }else{
    setIsMobile(false)
  }
}

setMobileMode();
},[size, isMobile])
       

        const createSlides = (data, index) => {
            return(
                <LeadSliderItem
                    id={data.id}
                    key={index}
                    image={data.image}
                    prename={data.prename}
                    name={data.name}
                    category={data.category.title}
                    tel={data.tel}
                    email={data.email}
                    position={data.position}
                    
                />
            )   
        }

        const handleMore = () => {
            setCount(p => p + 3);
        }
    return(
    <div className="lead-slider">
    {isMobile && props.items.slice(0,count).map(createSlides)}
    {isMobile && <div>
      <Button disabled={count > props.items.length} onClick={handleMore}>Mehr</Button>
      </div>}
    {!isMobile && <Slider {...settings}>
        {props.items.map(createSlides)}
    </Slider>}
    </div>
    )
}

export default LeadSlider;