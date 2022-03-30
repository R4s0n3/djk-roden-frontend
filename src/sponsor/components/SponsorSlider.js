import './SponsorSlider.css';
import Slider from "react-slick";

const SponsorSlider = (props) => {
    const settings = {
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        speed: 6000,
        autoplaySpeed:0,
        cssEase: "linear",
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                initialSlide: 1
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1
              }
            }
          ]

    }

        const createSponsorItem=(data, index)=>{
            
            return(
                <div className="sponsor-slider-item" id={index} key={index}>
                    
                    <a href={data.link}><img src={process.env.REACT_APP_AWS_URL + `/${data.image}`} height="85px" alt={data.title} /></a>
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