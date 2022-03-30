import './UsersList.css';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import UsersListItem from './UsersListItem';


const UsersList = props => {

    const createRows = (data, index) =>{

        return(
            <UsersListItem
                key={index}
                id={data.id}
                email={data.email}
                name={data.name}
                posts={data.posts.length}
                onDelete={props.onDeleteUser}
            />
        )

    }
    
    return(
        <TableContainer component={Paper}>
        <Table  aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">E-Mail</TableCell>
              <TableCell align="center">Posts</TableCell>
              <TableCell align="center">Edit</TableCell>
              <TableCell align="center">Löschen</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.items.map(createRows)} 
          </TableBody>
        </Table>
      </TableContainer>
    )
}

export default UsersList;