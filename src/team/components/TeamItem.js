import './TeamItem.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Icon} from '@iconify/react';
import logo from '../../shared/assets/SVG/djk-green-ol.svg';
import ball from '../../shared/assets/SVG/ball-green.svg';

const TeamItem = props => {

    const createPlayerRows = (data, index) =>{


        const shortPre = data.prename.slice(0,1);

        return(
            <TableRow
              id={data.id}
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {data.number}
              </TableCell>
              <TableCell>{shortPre}. {data.name}</TableCell>
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
            <TableCell align="center"><a href={`tel:${data.tel}`}><Icon className="djk-icon" icon="carbon:phone-filled" height="30px" color="#4BB05A" /></a></TableCell>
            <TableCell align="center"><a href={`mailto:${data.email}`}><Icon className="djk-icon" icon="clarity:email-solid" height="35px" color="#4BB05A" /></a></TableCell>
         
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
            <TableCell align="center">{data.start}-{data.end}</TableCell>
            <TableCell align="right">{data.location}</TableCell>
          </TableRow>
        )
    }

   return(
       <div id={props.id} className="team-item">
       <div className="team-item__header">
       <div className="team-item__header-img-container">
       <img src={ process.env.REACT_APP_AWS_URL + `/${props.imageUrl}`} alt={props.title} />
       </div>
       <div className="team-item__header-content-container">
       <h2>{props.title}</h2>

<p>{props.status} | <b>{props.gender}</b> | {props.league} </p>

<p className="team-content__paragraph" >{props.content}</p>
<div className="social-icons-container">
    <a href={props.fb}><Icon className="djk-icon" icon="akar-icons:instagram-fill" height="40px" color="#4BB05A" /></a>
    <a href={props.insta}><Icon className="djk-icon" icon="akar-icons:facebook-fill" height="40px" color="#4BB05A" /></a>
</div>
       </div>
       </div>
      
       <div className="team-item__stats-container">
       {props.players.length !== 0 && <div className="stats-container__short">
        <h2>Spieler</h2>
        <TableContainer sx={{maxHeight: 420}} component={Paper}>
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell component="th" scope="row">Nr</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Position</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.players.map(createPlayerRows)} 
          </TableBody>
        </Table>

      </TableContainer>
        </div>}
        {props.players.length === 0 && <div className="stats-container__short">
      <div className="no-players"> 
      <img src={logo} width="150" alt="logo" />
      <img src={ball} width="100" alt="ball" />
      </div>
     
        </div>}
        <div className="stats-container__long">
        <div>
        <h2>Trainingszeiten</h2>
        <TableContainer sx={{maxHeight: 420}} component={Paper}>
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
        {props.trainings.length === 0 && <h2 style={{textAlign: "center"}}>Diese Mannschaft hat derzeit keine Trainingszeiten.</h2>}

      </TableContainer>

        </div>
       {props.players.length !== 0 &&  <div>
        <a className="tabellen-link" href={props.link}>Spiele und Tabelle</a>
        </div>}
        </div>
       
        <div className="stats-container__short">
        <h2>Trainer</h2>
        <TableContainer sx={{maxHeight: 420}} component={Paper}>
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
        {props.trainers.length === 0 && <h2 style={{textAlign: "center"}}>Diese Mannschaft hat derzeit keine Trainer.</h2>}

      </TableContainer>
        </div>
       </div>
       </div>
       )
}

export default TeamItem;