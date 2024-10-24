import React from 'react'
import { Box, Typography } from '@mui/material'
import { DataGrid, GridRowsProp, GridColDef, GridToolbar } from '@mui/x-data-grid';

const officersArr = [
  {
    "name": "Alice",
    "ic": "S1234567A",
    "history_of_heat": true,
    "department": "Central Police Division"
  },
  {
    "name": "John",
    "ic": "S9876543B",
    "history_of_heat": false,
    "department": "Paya Lebar Police Station"
  },
  {
    "name": "Sarah",
    "ic": "S3456789C",
    "history_of_heat": true,
    "department": "Singapore Civil Defence Force"
  },
  {
    "name": "Michael",
    "ic": "S4567890D",
    "history_of_heat": false,
    "department": "Jurong Police Division"
  },
  {
    "name": "Emma",
    "ic": "S2345678E",
    "history_of_heat": true,
    "department": "Fire Station 10"
  },
  {
    "name": "Daniel",
    "ic": "S8765432F",
    "history_of_heat": false,
    "department": "Tanglin Police Division"
  },
  {
    "name": "Chloe",
    "ic": "S5432167G",
    "history_of_heat": true,
    "department": "Singapore Police Force"
  },
  {
    "name": "Liam",
    "ic": "S1357924H",
    "history_of_heat": false,
    "department": "Bedok Police Division"
  },
  {
    "name": "Sophia",
    "ic": "S8642091I",
    "history_of_heat": true,
    "department": "Pasir Ris Fire Station"
  },
  {
    "name": "David",
    "ic": "S9081726J",
    "history_of_heat": false,
    "department": "Bukit Merah Police Division"
  },
  {
    "name": "Olivia",
    "ic": "S5678901K",
    "history_of_heat": true,
    "department": "Police Coast Guard"
  },
  {
    "name": "James",
    "ic": "S2468135L",
    "history_of_heat": false,
    "department": "Toa Payoh Police Division"
  },
  {
    "name": "Mia",
    "ic": "S1357246M",
    "history_of_heat": true,
    "department": "Ang Mo Kio Fire Station"
  },
  {
    "name": "Ethan",
    "ic": "S9870123N",
    "history_of_heat": false,
    "department": "Kallang Police Division"
  },
  {
    "name": "Ava",
    "ic": "S6543210O",
    "history_of_heat": true,
    "department": "Changi Fire Station"
  },
  {
    "name": "Noah",
    "ic": "S3210987P",
    "history_of_heat": false,
    "department": "Yishun Police Division"
  },
  {
    "name": "Isabella",
    "ic": "S4561238Q",
    "history_of_heat": true,
    "department": "Woodlands Fire Station"
  },
  {
    "name": "Lucas",
    "ic": "S7531596R",
    "history_of_heat": false,
    "department": "Serangoon Police Division"
  },
  {
    "name": "Ella",
    "ic": "S3692584S",
    "history_of_heat": true,
    "department": "Queenstown Fire Station"
  },
  {
    "name": "Alexander",
    "ic": "S1597538T",
    "history_of_heat": false,
    "department": "Tampines Police Division"
  }
];

const rows: GridRowsProp = officersArr.map((e, index) => {
  return {
    id: index + 1,
    ic: e.ic,
    name: e.name,
    department: e.department,
    history_of_heat: e.history_of_heat ? "Yes" : "No"
  };
});

const cols: GridColDef[] = [
  { field: 'ic', headerName: 'IC', minWidth: 150 },
  { field: 'name', headerName: 'Name', flex: 1, minWidth: 150 },
  { field: 'department', headerName: 'Department', flex: 1, minWidth: 150 },
  { field: 'history_of_heat', headerName: 'History of Heat Illnesses', minWidth: 250 },
];

const Officers = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Officers
      </Typography>
      <Box>
        <DataGrid 
          rows={rows} 
          columns={cols}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}/>
      </Box>
    </div>
  )
}

export default Officers;