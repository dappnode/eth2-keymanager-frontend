import * as React from 'react';
import { DataGrid, GridCallbackDetails, GridColDef, GridRowParams, GridSelectionModel, GridValueGetterParams, MuiEvent } from '@mui/x-data-grid';
import './App.css';
import { useState } from 'react';
import { Box, Button } from '@mui/material';

const columns: GridColDef[] = [
    { field: 'pubkey', headerName: 'Validating Public Key', flex: 1, headerClassName: 'tableHeader' },
    { field: 'status', headerName: 'Status', width: 150, align: 'right', headerAlign: 'right', headerClassName: 'tableHeader' },
    { field: 'readonly', headerName: 'Read Only', width: 150, align: 'right', headerAlign: 'right', headerClassName: 'tableHeader' },
];

const rows = [
    { id: '1', pubkey: "0x98d083489b3b06b8740da2dfec5cc3c01b2086363fe023a9d7dc1f907633b1ff11f7b99b19e0533e969862270061d884", status: 'Active', readonly: 'true' },
    { id: '2', pubkey: "0x98d083489b3b06b8740da2dfec5cc3c01b2086363fe023a9d7dc1f907633b1ff11f7b99b19e0533e969862270061d884", status: 'Active', readonly: 'false' },
    { id: '3', pubkey: "0x98d083489b3b06b8740da2dfec5cc3c01b2086363fe023a9d7dc1f907633b1ff11f7b99b19e0533e969862270061d884", status: 'Active', readonly: 'false' },
    { id: '4', pubkey: "0x98d083489b3b06b8740da2dfec5cc3c01b2086363fe023a9d7dc1f907633b1ff11f7b99b19e0533e969862270061d884", status: 'Active', readonly: 'true' },
    { id: '5', pubkey: "0x98d083489b3b06b8740da2dfec5cc3c01b2086363fe023a9d7dc1f907633b1ff11f7b99b19e0533e969862270061d884", status: 'Active', readonly: 'true' },
];

interface Props {
    selectedRows: GridSelectionModel,
    setSelectedRows: (arg0: GridSelectionModel) => void;
}

export default function KeystoreList({selectedRows, setSelectedRows}: Props) {
    // const [selectedRows, setSelectedRows] = useState<GridSelectionModel>([]);
    const selection = (selectionModel: GridSelectionModel, details: GridCallbackDetails) => {
        setSelectedRows(selectionModel)
    };

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
                onSelectionModelChange={selection}
            />
        </div>
    );
}