import React from "react";
import { useNavigate } from "react-router-dom"
import { Box, Typography } from "@mui/material";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridToolbar,
  GridEventListener 
} from "@mui/x-data-grid";

const operationsArr = [
  {
    opcode: "O_T2312DA4",
    title: "Basic Firefight Training",
    description: "A short 4 hour training for incoming firefighters",
    department: "Alexandra Fire Station",
    status: "Ongoing",
    sensor_group_uuid: "8247e4c4-cdef-42ad-aa93-852e56342052"
  },
  {
    opcode: "O_S7642FE2",
    title: "Special Operation",
    description: "Classified",
    department: "SPF Special Ops Command",
    status: "Completed",
    sensor_group_uuid: "75274a62-9f9b-453a-ba33-19be5a2844fe"
  },
  {
    opcode: "O_Y9811AZ0",
    title: "Goldmile Tower On-duty Call",
    description: "Put out fire at Goldmile Tower",
    department: "SCDF, SPF",
    status: "Completed",
    sensor_group_uuid: "395b63b6-a02d-40df-9141-366b8e5e9df5"
  },
];

const rows: GridRowsProp = operationsArr.map((e, index) => {
  return {
    id: index + 1,
    opcode: e.opcode,
    title: e.title,
    description: e.description,
    department: e.department,
    status: e.status,
    sensor_group_uuid: e.sensor_group_uuid
  };
});

const cols: GridColDef[] = [
  { field: "opcode", headerName: "Operation Code", minWidth: 150 },
  { field: "title", headerName: "Title", flex: 1, maxWidth: 350 },
  { field: "description", headerName: "Description", flex: 1, minWidth: 250 },
  { field: "department", headerName: "Department", minWidth: 350 },
  { field: "status", headerName: "Status", minWidth: 150 },
  { field: "sensor_group_uuid", headerName: "Sensor Group", maxWidth: 150 }
];

const Operations = () => {
  const navigate = useNavigate();

  const handleRowDoubleClick: GridEventListener<'rowDoubleClick'> = (params) => {
    console.log("Selected Operation with Code:", params.row.opcode);
    navigate("/ops/overview", {
      state: {
        operation: params.row
      }
    });
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Operations List
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
          }}
          onRowDoubleClick={handleRowDoubleClick}
        />
      </Box>
    </div>
  );
};

export default Operations;
