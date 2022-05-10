import './SponsorSlider.css';
import Slider from "react-slick";

const SponsorSlider = (props) => {
  const calcSlides = (i) => {
      const items = i.length;
      if(items < 4){
        return items
      }
      return 4
  }

  const calcMobileSlides = (i) => {
    const items = i.length;
    if(items < 2){
      return items
    }

    return 2
  }
    const settings = {
        infinite: true,
        slidesToShow: calcSlides(props.items),
        slidesToScroll: 1,
        autoplay: true,
        speed: 10000,
        autoplaySpeed:0,
        prevArrow: false,
    nextArrow: false,
        cssEase: "linear",
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: calcSlides(props.items),
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: calcMobileSlides(props.items),
                slidesToScroll: 1,
                initialSlide: 1
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: calcMobileSlides(props.items),
                slidesToScroll: 1
              }
            }
          ]

    }

        const createSponsorItem=(data, index)=>{
            
            return(
                <div className="sponsor-slider-item" id={index} key={index}>
                    
                    <a href={data.link} target="_blank" rel="noreferrer"><img src={process.env.REACT_APP_AWS_URL + `/${data.image}`} height="85px" alt={data.title} /></a>
                </div>
            )
        }
        return(
            <div className="sponsor-slider-container">
 <Slider {...settings} >
                {props.items.map(createSponsorItem)}
            </Slider>
            </div>
           
        )
}

export default SponsorSlider;