 import './PostItem.css';
 import {Link} from 'react-router-dom';
import Card from '../../shared/components/UIElements/Card';
import hgsLogo from '../../shared/assets/PNG/hgs-logo.png';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
 const PostItem = props => {
    const formatDate = d => {
        let oldDate = d;
        const year = oldDate.slice(0,4);
        const month = oldDate.slice(5,7);
        const day = oldDate.slice(8,10)
        return(
            `${day}.${month}.${year}`
        )

    }
    const createGallery = (data, index) => {
        return (
            <ImageListItem key={index}>
            <img
              className="gallery-image"
              src={process.env.REACT_APP_AWS_URL + `/${data}?w=248&fit=crop&auto=format`}
              srcSet={process.env.REACT_APP_AWS_URL + `/${data}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={`gallery ${index}`}
              loading="lazy"
            />
          </ImageListItem>
        )
    }
    return(
        <div id={props.id} className="post-item">
        <div className="post-item__header">
        <img src={ process.env.REACT_APP_AWS_URL + `/${props.imageUrl}`} alt={props.title} />
        </div>
        <div className="post-item_content">
        <div className="post-item_content__inner">
        <h2>{props.title}</h2>

<p>{props.author} | <b>{props.category}</b> | {formatDate(props.date)} {props.team && '| ' + props.team.name }</p> 

<p className="post-content__paragraph" >{props.content}</p>
<a className="contact-link" href={props.link} target="_blank" rel="noopener noreferrer">{props.link}</a>
        </div>
        <div className="post-item_content__inner">
        <div className="post-report-item">
        {props.category === "Spielbericht" && <h2>Übersicht</h2>}
       {props.category === "Spielbericht" && <Card id={props.reportId} className="report-card">
        
        <div className="report-stats">
        {props.category === "Spielbericht" && props.homematch === "false" && <div><h3>{props.opponent}</h3></div>}
        {props.category === "Spielbericht" && props.homematch === "true" && <div className="logo-container"><Link to={`../mannschaften/${props.team.status.toLowerCase()}/${props.team.id}`} ><img src={hgsLogo} alt="hgs" /></Link></div>}
        <div className="report-stats__count">
            <div></div>
            {props.category === "Spielbericht" && <div><h2> {props.eshome} : {props.esguest}</h2></div>}
            {props.category === "Spielbericht" && <div><p>({props.htshome} : {props.htsguest})</p></div>}
        </div>
        <div>
        {props.category === "Spielbericht" && props.homematch === "true" && <div><h3>{props.opponent}</h3></div>}
        {props.category === "Spielbericht" && props.homematch === "false" && <div className="logo-container"><Link to={`../mannschaften/${props.team.status.toLowerCase()}/${props.team.id}`} ><img src={hgsLogo} alt="hgs" /></Link></div>}

        </div>

        </div>
        </Card>}
        </div>
        </div>
       
      
        </div>
        <div className="post-item__gallery-container">
        <ImageList variant="masonry" cols={3} gap={8}>
        {props.gallery && props.gallery.length > 0 && props.gallery.map(createGallery)}
</ImageList>
        </div>
        </div>
        )
 }

 export default PostItem;