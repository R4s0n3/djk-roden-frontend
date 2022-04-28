import './LeadsList.css';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import LeadsListItem from './LeadsListItem';


const LeadsList = props => {

    const createRows = (data, index) =>{
        return(
            <LeadsListItem 
                key={index}
                id={data.id}
                name={data.name}
                prename={data.prename}
                tel={data.tel}
                email={data.email}
                image={data.image}
                category={data.category.title}
                onDelete={props.onDeleteLead}
            />
        )

    }
    
    return(  
        <TableContainer sx={{maxHeight: 420}} component={Paper}>
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
            <TableCell component="th" scope="row"></TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Telefon</TableCell>
            <TableCell>E-Mail</TableCell>
            <TableCell>Kategorie</TableCell>
            <TableCell align="center">Edit</TableCell>
            <TableCell align="center">Löschen</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.items.map(createRows)} 
          </TableBody>
        </Table>
        {props.items.length === 0 && <h2 style={{textAlign: "center"}}>Sorry, noch keine Vorstandsmitglieder.</h2>}

      </TableContainer>
    )
}

export default LeadsList;