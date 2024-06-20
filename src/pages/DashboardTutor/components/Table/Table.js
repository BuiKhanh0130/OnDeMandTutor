import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";

function createData(name, trackingId, date, status) {
  return { name, trackingId, date, status };
}

const rows = [
  createData("English", 10, "5 June 2022", "In Progress"),
  createData("Literature", 12, "15 May 2024", "In Progress"),
  createData("Math", 10, "5 April 2024", "Well Done"),
  createData("Chemistry", 11, "2 January 2024", "Well Done"),
  createData("Informatics", 11, "10 December 2023", "Well Done"),
  createData("Physical", 12, "23 October 2023", "Well Done"),
  createData("biology", 12, "12 January 2023", "Well Done"),
  createData("Informatics", 12, "12 August 2023", "Well Done"),
  createData("English", 12, "30 June 2023", "Well Done"),
  createData("Literature", 12, "25 April 2023", "Well Done"),
  createData("Math", 11, "20 March 2023", "Well Done"),
  createData("Chemistry", 12, "10 February 2023", "Well Done"),
  createData("Physical", 12, "12 January 2023", "Well Done"),
];


const makeStyle=(status)=>{
  if(status === 'Well Done')
  {
    return {
      background: 'rgb(145 254 159 / 47%)',
      color: 'green',
    }
  }
  else{
    return{
      background: 'orange',
      color: 'white',
    }
  }
}

export default function BasicTable() {
  return (
      <div className="Table">
      <h3>Recent Classes</h3>
        <TableContainer
          component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Lession</TableCell>
                <TableCell align="left">Grade</TableCell>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">More</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
              {rows.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{row.trackingId}</TableCell>
                  <TableCell align="left">{row.date}</TableCell>
                  <TableCell align="left">
                    <span className="status" style={makeStyle(row.status)}>{row.status}</span>
                  </TableCell>
                  <TableCell align="left" className="Details">Details</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  );
}
