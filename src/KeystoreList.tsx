import * as React from 'react';
import { DataGrid, GridCallbackDetails, GridColDef, GridRowParams, GridSelectionModel, GridValueGetterParams, MuiEvent } from '@mui/x-data-grid';
import './App.css';
import { useState } from 'react';
import { Box, Button } from '@mui/material';
import { useListFetcher } from './DataStore';

const columns: GridColDef[] = [
    { field: 'pubkey', headerName: 'Validating Public Key', flex: 1, headerClassName: 'tableHeader' },
    { field: 'readonly', headerName: 'Read Only', width: 120, align: 'right', headerAlign: 'right', headerClassName: 'tableHeader' },
];

interface Props {
    rows: readonly { [key: string]: any }[] 
    selectedRows: GridSelectionModel,
    setSelectedRows: (arg0: GridSelectionModel) => void;
}

export default function KeystoreList({ rows, selectedRows, setSelectedRows }: Props) {

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