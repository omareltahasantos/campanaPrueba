import React from 'react'
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { Button } from '@mui/material';
import { Fragment } from 'react';

export const ExportToExcel = ({ apiData, fileName }) => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
  
    const exportToCSV = (apiData, fileName) => {
      const ws = XLSX.utils.json_to_sheet(apiData);
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, fileName + fileExtension);
    };
  
    return (
        <Fragment>
            <Button onClick={(e) => exportToCSV(apiData, fileName)} variant="contained" size='medium' style={{background: '#522F10'}}  sx={{ mt: 4, mb: 3, ml: 0 }}>exportar</Button>
        </Fragment>
    );
  };