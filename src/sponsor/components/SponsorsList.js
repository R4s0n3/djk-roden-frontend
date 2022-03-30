import './SponsorsList.css';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SponsorsListItem from './SponsorsListItem';


const SponsorsList = props => {

    const createRows = (data, index) =>{
        return(
            <SponsorsListItem 
                key={index}
                id={data.id}
                name={data.name}
                category={data.category.title}
                onDelete={props.onDeleteSponsor}
            />
        )

    }
    
    return(  
        <TableContainer sx={{maxHeight: 420}} component={Paper}>
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
            <TableCell component="th" scope="row">Name</TableCell>
            <TableCell align="center" >Kategorie</TableCell>
            <TableCell align="center">Edit</TableCell>
            <TableCell align="center">Löschen</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.items.map(createRows)} 
          </TableBody>
        </Table>
        {props.items.length === 0 && <h2 style={{textAlign: "center"}}>Sorry, noch keine Sponsoren.</h2>}

      </TableContainer>
    )
}

export default SponsorsList;