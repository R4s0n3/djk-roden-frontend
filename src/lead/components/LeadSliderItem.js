import './LeadSliderItem.css';
import {Icon} from '@iconify/react';
import Card from '../../shared/components/UIElements/Card';



const LeadSliderItem = props => {

    const CardBGstyle = {
        backgroundImage: "url(" + process.env.REACT_APP_AWS_URL +  `/${props.image})`,
        backgroundSize: "cover",
        filter: "contrast(1.25)",
        backgroundPosition:"center top",
        borderRadius:"8px 8px 0 0",
        flex:"4",
        
        }

    const shortPre = props.prename.slice(0,1);
        
    return(
        <div className="lead-slider__item">
        <Card className="lead-slider__card"> 
        <div style={CardBGstyle}></div>
           <div className="lead-slider__card-content-container">
               <h3 className="lead-slider__card-title">{shortPre}. {props.name}</h3>
               <p className="lead-slider__card-info"><b>{props.category}</b></p>
           

               <p className="lead-slider__card-content">{props.position}</p>

           </div>
           <div className="social-icons-container post-grid__card-footer">
    <a href={`tel:${props.tel}`}><Icon className="djk-icon" icon="carbon:phone-filled" height="20px" color="#006400" /></a>
    <a href={`mailto:${props.email}`}><Icon className="djk-icon" icon="clarity:email-solid" height="20px" color="#006400" /></a>
</div>
        </Card>
        </div>
    )
}  

export default LeadSliderItem;