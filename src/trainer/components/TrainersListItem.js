import React, {useState, useContext} from 'react';
import './TrainersListItem.css';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Modal from '../../shared/components/UIElements/Modal';
import Button from '../../shared/components/FormElements/Button';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Icon } from '@iconify/react';

const TrainersListItem = props => {

    const auth = useContext(AuthContext);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();


    const showDeleteWarningHandler = () => {
      setShowConfirmModal(true);
    };
  
    const cancelDeleteHandler = () => {
      setShowConfirmModal(false);
    };

    const confirmDeleteHandler = async () => {
        setShowConfirmModal(false);
        try {
            console.log(props.id);
          sendRequest(process.env.REACT_APP_BACKEND_URL + `/trainers/${props.id}`, 'DELETE',null, {Authorization: 'Bearer ' + auth.token});
          props.onDelete(props.id);
        } catch (error) {
          
        }
      };
      const shortPre = props.prename.slice(0,1);
    return(
        <React.Fragment>
    <ErrorModal error={error} onClear={clearError} />
    {isLoading && <LoadingSpinner asOverlay/>}
      
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Bist du sicher?"
        footerClass="trainer-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              ZURÜCK
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              LÖSCHEN
            </Button>
          </React.Fragment>
        }
      >
        <p>
        Möchtest du fortfahren und diesen Spieler löschen?
        Bitte beachte, dass dieser Vorgang
        danach nicht mehr rückgängig gemacht werden kann.
        </p>
      </Modal>
          <TableRow
              key={props.index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {shortPre}. {props.name}
              </TableCell>
              <TableCell align="center">{props.email}</TableCell>
              <TableCell align="center">{props.tel}</TableCell>
              <TableCell align="center">{props.team}</TableCell>
              <TableCell align="center"><Button to={`../dashboard/trainers/${props.id}`}><Icon className="djk-icon" icon="akar-icons:edit" height="20px" color="#fff" /></Button></TableCell>
              <TableCell align="center"><Button danger onClick={showDeleteWarningHandler}><Icon className="djk-icon" icon="fluent:delete-16-regular" height="20px" color="#fff" /></Button></TableCell>
            </TableRow>
            </React.Fragment>
    )
}

export default TrainersListItem;