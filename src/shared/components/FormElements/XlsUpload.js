import * as xlsx from 'xlsx';
import React,{useState, useContext} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import Button from './Button';
import { AuthContext} from '../../context/auth-context';
import { useHttpClient } from '../../hooks/http-hook';
import LoadingSpinner from '../UIElements/LoadingSpinner';
import ErrorModal from '../UIElements/ErrorModal';

const XlsUpload = () => {
    const auth = useContext(AuthContext);

    const [gridSelection, setGridSelection] = useState([]);
    const [selectedDates, setSelectedDates] = useState([]);
    const [JSONdata, setJSONdata]   = useState();

    const {isLoading, error, clearError, sendRequest} = useHttpClient();

    const readUploadFile = (e) => {
        e.preventDefault();
        if (e.target.files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = xlsx.read(data);
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = xlsx.utils.sheet_to_json(worksheet);
                for (let i = 0; i < json.length; i++) {
                    json[i].id = uuidv4();
                    console.log(json[i].__EMPTY);              ;
                }
                setJSONdata(json);
                console.log(json);
            };
            reader.readAsArrayBuffer(e.target.files[0]);
            
        }
    }
    const handleMultiUpload = async event => {
        event.preventDefault();
        const filteredDates = JSONdata.filter((date) => selectedDates.includes(date.id));
  

        const formatDate = (date, time) => {
          var regex = /(\d{2})\.(\d{2})\.(\d{4})/;
          var match = regex.exec(date);
          var year = match[3];
          var month = match[2];
          var day = match[1];
          var dateString = year + "-" + month + "-" + day + "T" + time + ":00.000Z";
          return new Date(dateString).toISOString()
        };
        try{
            for (let i = 0; i < filteredDates.length; i++){
              const formattedDate = formatDate(filteredDates[i].Datum, filteredDates[i].Zeit)
             
             
                await sendRequest(
                    process.env.REACT_APP_BACKEND_URL + '/dates',
                    'POST',
                    JSON.stringify({
                     title: "Spieltermin",
                     date: formattedDate,
                     guest:filteredDates[i].Gast,
                     home:  filteredDates[i].Heim,
                     category: '6239156487b6da644f43d199',
                     location: filteredDates[i].Halle
                    }),{
                      'Content-Type': 'application/json',
                      Authorization: 'Bearer ' + auth.token
                    });
                    

                }
                document.location.reload();
            }catch(e){}
        
    }
    const columns = [
        { field: 'id', headerName: 'id', width: 90 },
        {
          field: 'Halle',
          headerName: 'Halle',
          width: 150,
          editable: false,
        },
        {
          field: 'Datum',
          headerName: 'Datum',
          width: 150,
          sortable: true,
          editable: true,
        },
        {
          field: 'Zeit',
          headerName: 'Zeit',
          width: 110,
          editable: true,
        },
        {
          field: 'Heim',
          headerName: 'Heim',
          sortable: false,
          width: 160
        },
        {
          field: 'Gast',
          headerName: 'Gast',
          sortable: true,
          width: 160
        }
      ];
    
    return (<>
    {isLoading && <LoadingSpinner asOverlay/>}
    <ErrorModal error={error} onClear={clearError} />

        <div>
    <form>
        <label htmlFor="upload">Upload File</label>
        <input
            type="file"
            name="upload"
            id="upload"
            accept=".xlsx,.csv"
            onChange={readUploadFile}
        />
    </form>
    {JSONdata && <div style={{height: "420px"}}>
    <DataGrid
        rows={JSONdata}
        columns={columns}
        headerHeight={40}
        disableColumnSelector
        selectionModel={gridSelection}
        onSelectionModelChange={(newSelection) => {
          console.log(newSelection);
          setSelectedDates(newSelection);
          setGridSelection(newSelection.selectionModel);
        }}
        checkboxSelection

      />
      <Button type="submit" onClick={handleMultiUpload}>Spiele importieren</Button>
        </div>}
    </div>

    </>
    )
    
}

export default XlsUpload;