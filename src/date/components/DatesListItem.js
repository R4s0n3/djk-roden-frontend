import React, {useState, useContext} from 'react';
import './DatesListItem.css';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Modal from '../../shared/components/UIElements/Modal';
import Button from '../../shared/components/FormElements/Button';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Icon } from '@iconify/react';

const DatesListItem = props => {

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
        sendRequest(process.env.REACT_APP_BACKEND_URL + `/dates/${props.id}`, 'DELETE',null, {Authorization: 'Bearer ' + auth.token});
        props.onDelete(props.id);
        } catch (error) {
        }
    };

    
    return(
    <React.Fragment>
    <ErrorModal error={error} onClear={clearError} />
    {isLoading && <LoadingSpinner asOverlay/>}

    <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Bist du sicher?"
        footerClass="date-item__modal-actions"
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
        Möchtest du fortfahren und diesen Termin löschen?
        Bitte beachte, dass dieser Vorgang
        danach nicht mehr rückgängig gemacht werden kann.
        </p>
      </Modal>
          <TableRow
              key={props.index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {props.title || props.home + " - " + props.guest} 
              </TableCell>
              <TableCell align="center">{new Date(props.date).toLocaleDateString()} <br /> {new Date(props.date).toLocaleTimeString().slice(0,5)}h</TableCell>
              <TableCell align="center">{props.home || "--"}</TableCell>
              <TableCell align="center">{props.guest || "--"}</TableCell>
              <TableCell align="center">{props.location || "--"}</TableCell>
              <TableCell align="center">{props.category}</TableCell>
              <TableCell align="center"><Button to={`../dashboard/dates/${props.id}`}><Icon className="djk-icon" icon="akar-icons:edit" height="20px" color="#fff" /></Button></TableCell>
              <TableCell align="center"><Button danger onClick={showDeleteWarningHandler}><Icon className="djk-icon" icon="fluent:delete-16-regular" height="20px" color="#fff" /></Button></TableCell>
            </TableRow>
            </React.Fragment>
    )
}

export default DatesListItem;