import './LiveTicker.css';
import Slider from "react-slick";

const LiveTicker = (props) => {
    const settings = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: -1,
        autoplay: true,
        speed: 6500,
        autoplaySpeed:0,
        cssEase: "linear"

    }

        const createTick=(data, index)=>{
            
            return(
                <div className="live-ticker-item" id={index} key={index}>
                    <a href={data.link || ""}>-- {data.title} --</a>
                </div>
            )
        }
        return(
            <div className="live-ticker-container">
 <Slider {...settings} >
                {props.items.map(createTick)}
            </Slider>
            </div>
           
        )
}

export default LiveTicker;