import './PlayersList.css';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PlayerListItem from './PlayerListItem';


const PlayersList = props => {

    const createRows = (data, index) =>{

        return(
            <PlayerListItem 
                key={index}
                id={data.id}
                age={data.age}
                position={data.position}
                number={data.number}
                name={data.name}
                prename={data.prename}
                onDelete={props.onDeletePlayer}
            />
        )

    }
    
    return(
        <TableContainer sx={{maxHeight: 420}} component={Paper}>
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Alter</TableCell>
              <TableCell align="center">Position</TableCell>
              <TableCell align="center">Nummer</TableCell>
              <TableCell align="center">Edit</TableCell>
              <TableCell align="center">Löschen</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.items.map(createRows)} 
          </TableBody>
        </Table>
        {props.items.length === 0 && <h2 style={{textAlign: "center"}}>Sorry, noch keine Spieler.</h2>}

      </TableContainer>
    )
}

export default PlayersList;