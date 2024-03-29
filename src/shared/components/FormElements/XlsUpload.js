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
                console.log('before: ', worksheet);
                json.shift();
                for (let i = 0; i < json.length; i++) {
                    json[i].id = uuidv4();
                    json[i].team = json[i]["HG_Saarlouis.csv"]; 
                    // delete json[i].HG_Saarlouis.csv;
                    json[i].date = json[i]["__EMPTY_1"];
                    delete json[i].__EMPTY_1;
                    json[i].time = (json[i]["__EMPTY_2"] || "00:00");
                    delete json[i].__EMPTY_2;              
                    json[i].location = `${json[i]["__EMPTY_6"]}, ${json[i]["__EMPTY_7"]} ${json[i]["__EMPTY_8"]}`;
                    delete json[i].__EMPTY_6;              
                    delete json[i].__EMPTY_3;              
                    delete json[i].__EMPTY_7;              
                    delete json[i].__EMPTY_8;
                    delete json[i].__EMPTY_9;
                    json[i].home = json[i]["__EMPTY_4"];
                    delete json[i].__EMPTY_4;              
                    json[i].guest = json[i]["__EMPTY_5"];
                    delete json[i].__EMPTY_5;                          
                }
                setJSONdata(json);
                console.log('after: ', json);
            };
            reader.readAsArrayBuffer(e.target.files[0]);
            
        }
    }
    const handleMultiUpload = async event => {
        event.preventDefault();
        const filteredDates = JSONdata.filter((date) => selectedDates.includes(date.id));
          const formatDate = (date, time) => {
            console.log(date)
            console.log(time)
          var regex = /(\d{2})\.(\d{2})\.(\d{2})/ || /(\d{2})\/(\d{2})\/(\d{2})/;
          var match = regex.exec(date);
          var year = match[3];
          var month = match[2];
          var day = match[1];
          var dateString = "20" + year + "-" + month + "-" + day + "T" + time + ":00.000Z";
          return new Date(dateString).toISOString()
        };
        try{
            for (let i = 0; i < filteredDates.length; i++){
              const formattedDate = formatDate(filteredDates[i].date, filteredDates[i].time)
             console.log(filteredDates[i]);
             console.log(formattedDate);
                await sendRequest(
                    process.env.REACT_APP_BACKEND_URL + '/dates',
                    'POST',
                    JSON.stringify({
                     title: "Spieltermin",
                     date: formattedDate,
                     guest: filteredDates[i].guest,
                     home:  filteredDates[i].home,
                     team: filteredDates[i].team,
                     category: '6239156487b6da644f43d199',
                     location: filteredDates[i].location
                    }),{
                      'Content-Type': 'application/json',
                      Authorization: 'Bearer ' + auth.token
                    });
                    

                }
                document.location.reload();
            }catch(e){
              console.log(e);
            }
        
    }
    const columns = [
        {
          field: 'location',
          headerName: 'Halle',
          width: 150,
          editable: false,
        },
        {
          field: 'date',
          headerName: 'Datum',
          width: 150,
          sortable: true,
          editable: true,
        },
        {
          field: 'time',
          headerName: 'Zeit',
          width: 110,
          editable: true,
        },
        {
          field: 'home',
          headerName: 'Heim',
          sortable: false,
          width: 160
        },
        {
          field: 'guest',
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