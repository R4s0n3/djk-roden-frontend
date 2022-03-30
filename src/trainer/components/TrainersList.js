import './TrainersList.css';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TrainersListItem from './TrainersListItem';


const TrainersList = props => {

    const createRows = (data, index) =>{
        console.log(data.team)
        return(
            <TrainersListItem 
                key={index}
                id={data.id}
                name={data.name}
                prename={data.prename}
                email={data.email}
                tel={data.tel}
                team={data.team.name}
                onDelete={props.onDeleteTrainer}
            />
        )

    }
    
    return(
        <TableContainer sx={{maxHeight: 420}} component={Paper}>
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>E-Mail</TableCell>
              <TableCell>Telefon</TableCell>
              <TableCell>Team</TableCell>
              <TableCell align="center">Edit</TableCell>
              <TableCell align="center">Löschen</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.items.map(createRows)} 
          </TableBody>
        </Table>
        {props.items.length === 0 && <h2 style={{textAlign: "center"}}>Sorry, noch keine Trainer.</h2>}

      </TableContainer>
    )
}

export default TrainersList;