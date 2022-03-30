import './TeamsList.css';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TeamListItem from './TeamsListItem';


const TeamsList = props => {

    const createRows = (data, index) =>{

        return(
            <TeamListItem 
                key={index}
                id={data.id}
                name={data.name}
                status={data.status}
                desc={data.desc}
                gender={data.gender}
                players={data.players}
                trainers={data.trainers}
                reports={data.reports}
                league={data.league}
                onDelete={props.onDeleteTeam}
            />
        )

    }
    
    return(
        <TableContainer component={Paper}>
        <Table  aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Gender</TableCell>
              <TableCell align="center">Liga</TableCell>
              <TableCell align="center">Spieler</TableCell>
              <TableCell align="center">Trainer</TableCell>
              <TableCell align="center">Berichte</TableCell>
              <TableCell align="center">Edit</TableCell>
              <TableCell align="center">Löschen</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.items.map(createRows)} 
          </TableBody>
        </Table>
        {props.items.length === 0 && <h2 style={{textAlign: "center"}}>Sorry, noch keine Teams</h2>}

      </TableContainer>
    )
}

export default TeamsList;