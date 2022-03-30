import './TrainingsList.css';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TrainingsListItem from './TrainingsListItem';


const TrainingsList = props => {

    const createRows = (data, index) =>{
        return(
            <TrainingsListItem 
                key={index}
                id={data.id}
                start={data.start}
                end={data.end}
                day={data.day}
                team={data.team.name}
                location={data.location}
                onDelete={props.onDeleteTraining}
            />
        )

    }
    
    return(
        <TableContainer sx={{maxHeight: 420}} component={Paper}>
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Tag</TableCell>
              <TableCell>Uhrzeit</TableCell>
              <TableCell>Ort</TableCell>
              <TableCell>Team</TableCell>
              <TableCell align="center">Edit</TableCell>
              <TableCell align="center">Löschen</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.items.map(createRows)} 
          </TableBody>
        </Table>
        {props.items.length === 0 && <h2 style={{textAlign: "center"}}>Sorry, noch keine Trainings.</h2>}

      </TableContainer>
    )
}

export default TrainingsList;