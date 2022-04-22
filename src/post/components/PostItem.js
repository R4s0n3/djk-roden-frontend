 import './PostItem.css';
import Card from '../../shared/components/UIElements/Card';
import hgsLogo from '../../shared/assets/PNG/hgs-logo.png'
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
    return(
        <div id={props.id} className="post-item">
        <div className="post-item__header">
        <img src={ process.env.REACT_APP_AWS_URL + `/${props.imageUrl}`} alt={props.title} />
        </div>
        <div className="post-item_content">
        <div className="post-item_content__inner">
        <h2>{props.title}</h2>

<p>{props.author} | <b>{props.category}</b> | {formatDate(props.date)} </p>

<p className="post-content__paragraph" >{props.content}</p>
        </div>
        <div className="post-item_content__inner">
        <div className="post-report-item">
        {props.category === "Spielbericht" && <h2>Übersicht</h2>}
       {props.category === "Spielbericht" && <Card id={props.reportId} className="report-card">
        
        <div className="report-stats">
        {props.category === "Spielbericht" && props.homematch === "false" && <div><h3>{props.opponent}</h3></div>}
        {props.category === "Spielbericht" && props.homematch === "true" && <div className="logo-container"><img src={hgsLogo} alt="hgs" /></div>}
        <div className="report-stats__count">
            <div></div>
            {props.category === "Spielbericht" && <div><h2> {props.eshome} : {props.esguest}</h2></div>}
            {props.category === "Spielbericht" && <div><p>({props.htshome} : {props.htsguest})</p></div>}
        </div>
        <div>
        {props.category === "Spielbericht" && props.homematch === "true" && <div><h3>{props.opponent}</h3></div>}
        {props.category === "Spielbericht" && props.homematch === "false" && <div className="logo-container"><img src={hgsLogo} alt="hgs" /></div>}

        </div>

        </div>
        </Card>}
        </div>
        </div>
       
      
        </div>
      
        </div>
        )
 }

 export default PostItem;