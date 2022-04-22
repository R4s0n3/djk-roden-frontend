import './LeadSlider.css';
import Slider from "react-slick";
import LeadSliderItem from "./LeadSliderItem";

const LeadSlider = props => {
        const settings = {
            dots: true,
            prevArrow: false,
          nextArrow: false,
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            speed: 750,
          autoplaySpeed: props.speed,
          cssEase: "ease-in-out",
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
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 1
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
        }

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
                    comment={data.comment}

                />
            )   
        }
    return(
    <div className="lead-slider">
    <Slider {...settings}>
        {props.items.map(createSlides)}
    </Slider>
    </div>
    )
}

export default LeadSlider;