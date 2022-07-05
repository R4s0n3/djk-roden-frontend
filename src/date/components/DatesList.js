import './DatesList.css';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DatesListItem from './DatesListItem';


const DatesList = props => {

    const createRows = (data, index) =>{
        return(
            <DatesListItem 
                key={index}
                id={data.id}
                title={data.title}
                date={data.date}
                time={data.time}
                home={data.home}
                guest={data.guest}
                category={data.category.title}
                onDelete={props.onDeleteDate}
            />
        )

    }
    
    return(  
        <TableContainer sx={{maxHeight: 420}} component={Paper}>
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
            <TableCell component="th" scope="row">Titel</TableCell>
            <TableCell align="center" >Start</TableCell>
            <TableCell align="center" >Kategorie</TableCell>
            <TableCell align="center">Edit</TableCell>
            <TableCell align="center">Löschen</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.items.map(createRows)} 
          </TableBody>
        </Table>
        {props.items.length === 0 && <h2 style={{textAlign: "center"}}>Sorry, noch keine Termine.</h2>}

      </TableContainer>
    )
}

export default DatesList;