import './PostList.css';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PostListItem from './PostListItem';


const PostList = props => {

    const createRows = (data, index) =>{

        return(
            <PostListItem
                key={index}
                id={data.id}
                title={data.title}
                category={data.category}
                published={data.published}
                highlighted={data.highlighted}
                onDelete={props.onDeletePost}
            />
        )

    }
    
    return(
        <TableContainer component={Paper}>
        <Table  aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Titel</TableCell>
              <TableCell align="center">Kategorie</TableCell>
              <TableCell align="center">Public</TableCell>
              <TableCell align="center">Highlighted</TableCell>
              <TableCell align="center">Edit</TableCell>
              <TableCell align="center">Löschen</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.items.map(createRows)} 
          </TableBody>
        </Table>
        {props.items.length === 0 && <h2 style={{textAlign: "center"}}>Sorry, noch keine Posts</h2>}

      </TableContainer>
    )
}

export default PostList;