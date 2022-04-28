import React, {useState, useContext} from 'react';
import './PostListItem.css';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Modal from '../../shared/components/UIElements/Modal';
import Button from '../../shared/components/FormElements/Button';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';

import TableCell from '@mui/material/TableCell';
import Switch from '@mui/material/Switch';
import TableRow from '@mui/material/TableRow';
import { Icon } from '@iconify/react';

const PostListItem = props => {

    const auth = useContext(AuthContext);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showConfirmPublish, setShowConfirmPublish] = useState(false);
    const [showConfirmHighlight, setShowConfirmHighlight] = useState(false);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    

    const showDeleteWarningHandler = () => {
      setShowConfirmModal(true);
    };
  
    const cancelDeleteHandler = () => {
      setShowConfirmModal(false);
      
    };
    const cancelPublishHandler = () => {
      setShowConfirmPublish(false);
      setIsPublished(publishBool);
    };
    const cancelHighlightHandler = () => {
      setShowConfirmHighlight(false);
      setIsHighlighted(highlightBool);
    };


    const confirmDeleteHandler = async () => {
        setShowConfirmModal(false);
        try {
            console.log(props.id);
          sendRequest(process.env.REACT_APP_BACKEND_URL + `/posts/${props.id}`, 'DELETE',null, {Authorization: 'Bearer ' + auth.token});
          props.onDelete(props.id);
        } catch (error) {
          
        }
      };

    const confirmPublishHandler = async () => {
      setShowConfirmPublish(false);
      try {
       const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/posts/publish/${props.id}`,
          'PATCH',
          JSON.stringify({
           published: isPublished.toString()
          }),
          { 'Content-Type': 'application/json', Authorization: 'Bearer ' + auth.token
        }
       
        );
        const responseBool = (responseData.post.published.toLowerCase() === 'true')
        console.log(responseBool);
        setIsPublished(responseBool);
        
      } catch (error) {
        
      }
    }
    const confirmHighlightHandler = async () => {
      setShowConfirmHighlight(false);
      try {
       const responseHighlight = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/posts/highlight/${props.id}`,
          'PATCH',
          JSON.stringify({
           highlighted: isHighlighted.toString()
          }),
          { 'Content-Type': 'application/json', Authorization: 'Bearer ' + auth.token
        }
       
        );
        const newBool = (responseHighlight.post.highlighted.toLowerCase() === 'true')
        setIsHighlighted(newBool);
        
      } catch (error) {
        
      }
    }

    const publishBool = (props.published.toLowerCase() === 'true');
    const highlightBool = (props.highlighted.toLowerCase() === 'true');
    
      const [isPublished, setIsPublished] = useState(publishBool);
      const [isHighlighted, setIsHighlighted] = useState(highlightBool);

      const handlePublish = event => {
        setIsPublished(event.target.checked);
        setShowConfirmPublish(true);
      };
      const handleHighlight = event => {
        setIsHighlighted(event.target.checked);
        setShowConfirmHighlight(true);
      };
      
    return(
        <React.Fragment>
    <ErrorModal error={error} onClear={clearError} />
    {isLoading && <LoadingSpinner asOverlay/>}
      
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Bist du sicher?"
        footerClass="post-item__modal-actions"
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
        Möchtest du fortfahren und diesen Post löschen?
        Bitte beachte, dass dieser Vorgang
        danach nicht mehr rückgängig gemacht werden kann.
        </p>
      </Modal>
      
      <Modal
        show={showConfirmPublish}
        onCancel={cancelPublishHandler}
        header="Bist du sicher?"
        footerClass="post-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelPublishHandler}>
              ZURÜCK
            </Button>
            <Button danger onClick={confirmPublishHandler}>
              PUBLISH
            </Button>
          </React.Fragment>
        }
      >
  
        <p>
        Möchtest du fortfahren und diesen Post veröffentlichen?
        </p>
      
      
      </Modal>
      <Modal
        show={showConfirmHighlight}
        onCancel={cancelHighlightHandler}
        header="Bist du sicher?"
        footerClass="post-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelHighlightHandler}>
              ZURÜCK
            </Button>
            <Button danger onClick={confirmHighlightHandler}>
              HIGHLIGHT
            </Button>
          </React.Fragment>
        }
      >
     
        <p>
        Möchtest du fortfahren und diesen Post {isHighlighted ? 'highlighten' : 'enthighlighten'}?
        </p>
       
      
      </Modal>
          <TableRow
              key={props.index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {props.title}
              </TableCell>
              <TableCell align="center">{props.category.title}</TableCell>
              <TableCell align="center"><Switch checked={isPublished} onChange={handlePublish}  /></TableCell>
              <TableCell align="center"><Switch checked={isHighlighted} onChange={handleHighlight} /></TableCell>
              <TableCell align="center"><Button to={`../dashboard/posts/${props.id}`}><Icon className="djk-icon" icon="akar-icons:edit" height="20px" color="#fff" /></Button></TableCell>
              <TableCell align="center"><Button danger onClick={showDeleteWarningHandler}><Icon className="djk-icon" icon="fluent:delete-16-regular" height="20px" color="#fff" /></Button></TableCell>
            </TableRow>
            </React.Fragment>
    )
}

export default PostListItem;