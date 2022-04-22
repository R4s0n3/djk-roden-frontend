import './LiveTicker.css';
import Slider from "react-slick";
import {useWindowSize} from '../../hooks/size-hook';

const LiveTicker = (props) => {
  const size = useWindowSize();




    const settings = {
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: -1,
        autoplay: true,
        speed: 15000,
        autoplaySpeed:0,
        cssEase: "linear",
        prevArrow: false,
    nextArrow: false,
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: -1,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: -1,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: -1
          }
        }
      ]

    }

        const createTick=(data, index)=>{
            const shortTitle = data.title.slice(0,40);

            return(
                <div className="live-ticker-item" id={data.id} key={index}>
                    <a href={data.link || ""}>-- {data.title.length > 40 && size.width < 980 ?`${shortTitle} ...`: data.title} --</a>
                </div>
            )
        }
        return(
            <div id="live-ticker" className="live-ticker-container">
 <Slider {...settings} >
                {props.items.map(createTick)}
            </Slider>
            </div>
           
        )
}

export default LiveTicker;