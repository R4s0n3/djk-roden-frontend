import React, {useRef, useState} from 'react';

import Button from './Button';
import './GalleryUpload.css';

const GalleryUpload = props =>{
    const [files, setFiles] = useState();
    const [isValid, setIsValid] = useState(false);
    
    const filePickerRef = useRef();

   

    const pickedHandler = event => {
        let pickedFiles;
        let fileIsValid = isValid;
        if (event.target.files && event.target.files.length <= 8){
            pickedFiles = event.target.files;

           setFiles(pickedFiles);
            console.log(files)
            
            setIsValid(true);
            fileIsValid = true;
        }else{
            setIsValid(false);
            fileIsValid = false;
        }
        props.onInput(props.id, pickedFiles, fileIsValid);
     
    };

    const pickImageHandler = () => {
        filePickerRef.current.click();
    };

    return(
        <div className="form-control">
            <input 
            id={props.id} 
            ref={filePickerRef}
            style={{display:"none"}} 
            type="file"
            accept=".jpg,.png,.jpeg"
            onChange={pickedHandler}
            multiple
            />
            <div className={`image-upload ${props.center && "center"}`}>
                <div className="images-upload__preview">
                <p>{!files ? "0" : files.length} Bilder ausgewählt</p>
                </div>
                <Button type="button" onClick={pickImageHandler}>PICK IMAGES</Button>
                {!isValid && <p>{props.errorText}</p>}
            </div>
        </div>
    );
};

export default GalleryUpload;