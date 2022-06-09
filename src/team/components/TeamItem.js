import React,{useState} from 'react';
import './TeamItem.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ImageModal from '../../shared/components/UIElements/ImageModal';
import {Icon} from '@iconify/react';
import Avatar from '../../shared/components/UIElements/Avatar';

const TeamItem = props => {
    const [imgBox, setImgBox] = useState(false);
    
    const noNumbers = props.players.filter(p => p.number === null);
    let withNumbers = props.players.filter(p => p.number !== null).sort((a,b) => a.number - b.number);
withNumbers.push(...noNumbers);

    const createPlayerRows = (data, index) =>{


        const shortPre = data.prename.slice(0,1);
        return(
            <TableRow
              id={data.id}
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              <Avatar name={data.name} prename={data.prename} imgSrc={data.image} alt={data.name} height="50px" width="50px" />

              </TableCell>
              <TableCell>{shortPre}. {data.name}</TableCell>
              <TableCell >
                {data.number}
              </TableCell>
            
              <TableCell align="center">{data.position}</TableCell>
            </TableRow>
        )

    }

    const createTrainerRows = (data, index) => {
        return(
            <TableRow
            key={index}
            id={data.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {data.prename} {data.name}
            </TableCell>
            <TableCell align="center">{data.tel && <a href={`tel:${data.tel}`}><Icon className="djk-icon" icon="carbon:phone-filled" height="30px" color="#006400" /></a>}</TableCell>
            <TableCell align="center"><a href={`mailto:${data.email}`}><Icon className="djk-icon" icon="clarity:email-solid" height="35px" color="#006400" /></a></TableCell>
         
          </TableRow>
        )
    }
    const createTrainingRows = (data,index) =>{
        const shortDay = data.day.slice(0,2);

        return(
            <TableRow
            key={index}
            id={data.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {shortDay}
            </TableCell>
            <TableCell align="center">{data.start} - {data.end}</TableCell>
            <TableCell align="right"><a className="contact-link" href={data.link}>{data.location}</a></TableCell>
          </TableRow>
        )
    }

    const handleImgClick = () =>{
      setImgBox(true);

    }

    const handleZoom = (e) =>{
      console.log(e.target)
      e.target.classList.add("zooming");
    }

    const handleZoomOut = (e) =>{
      e.target.classList.remove("zooming"); 
      console.log(e.target)
    }
    
   return(<React.Fragment>

   <ImageModal
   show={imgBox}
        onCancel={()=>setImgBox(false)}
        footerClass="player-item__modal-actions"
          >
       
        <img src={ process.env.REACT_APP_AWS_URL + `/${props.imageUrl}`} alt={props.title} />
  
   </ImageModal>

       <div id={props.id} className="team-item">
       <div className="team-item__header">
       <div className="team-item__header-img-container" onMouseOut={handleZoomOut} onMouseOver={handleZoom} onClick={handleImgClick}>
       <img className="team-image" src={ process.env.REACT_APP_AWS_URL + `/${props.imageUrl}`} alt={props.title} />
       </div>
       <div className="team-item__header-content-container">
       <h2>{props.title}</h2>

<p>{props.status} | <b>{props.gender}</b> | {props.league} </p>

<p className="team-content__paragraph" >{props.content}</p>
<div className="social-icons-container">
    {props.insta && <a href={props.insta} target="_blank" rel="noreferrer"><Icon className="djk-icon" icon="akar-icons:instagram-fill" height="40px" color="#006400" /></a>}
    {props.fb && <a href={props.fb} target="_blank" rel="noreferrer"><Icon className="djk-icon" icon="akar-icons:facebook-fill" height="40px" color="#006400" /></a>}
</div>
       </div>
       </div>
      
       <div className="team-item__stats-container">
       {props.players && <div className="stats-container__long">
        <h2>Spieler</h2>
        <TableContainer className="player-table" sx={{maxHeight: 420}} component={Paper}>
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell component="th" scope="row"></TableCell>
              <TableCell style={{minWidth:90}}>Name</TableCell>
              <TableCell>Nr</TableCell>
              <TableCell align="center">Position</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {withNumbers.map(createPlayerRows)} 
          </TableBody>
        </Table>
        {props.players.length === 0 && <h2 style={{textAlign: "center",padding:"0 0.5rem"}}>Diese Mannschaft hat derzeit keine Spieler.</h2>}

      </TableContainer>
      {props.link && <a className="tabellen-link" href={props.link}>Spiele und Tabelle</a>}

        </div>}
     
        <div className="stats-container__long">
        <div>
        <h2>Trainingszeiten</h2>
        <TableContainer sx={{maxHeight: 210}} component={Paper}>
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Tag</TableCell>
              <TableCell align="center">Uhrzeit</TableCell>
              <TableCell align="right">Ort</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.trainings.map(createTrainingRows)} 
          </TableBody>
        </Table>
        {props.trainings.length === 0 && <h2 style={{textAlign: "center",padding:"0 0.5rem"}}>Diese Mannschaft hat derzeit keine Trainingszeiten.</h2>}

      </TableContainer>
      <h2>Trainer</h2>
        <TableContainer sx={{maxHeight: 210}} component={Paper}>
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Telefon</TableCell>
              <TableCell align="center">Mail</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.trainers.map(createTrainerRows)} 
          </TableBody>
        </Table>
        {props.trainers.length === 0 && <h2 style={{textAlign: "center",padding:"0 0.5rem"}}>Diese Mannschaft hat derzeit keine Trainer.</h2>}

      </TableContainer>
        </div>
     
        </div>
       
       </div>
       </div>

   </React.Fragment>

 
       )
}

export default TeamItem;