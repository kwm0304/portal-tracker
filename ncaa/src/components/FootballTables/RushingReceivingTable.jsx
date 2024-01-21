import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, TableHead } from "@mui/material";
import PropTypes from 'prop-types';
const RushingReceivingTable = ({rushingAndReceiving}) => {
  console.log('rushrec',typeof rushingAndReceiving)

  const fumbleCellStyle = { color: 'red', fontWeight: 'bold', textAlign: 'center'}
  const intCellStyle = { color: 'green', fontWeight: 'bold', textAlign: 'center'}
  const tacklesCellStyle = { color: '#4287f5', fontWeight: 'bold', textAlign: 'center'}
  const infoStyle = { color: 'white', fontWeight: 'bold', textAlign: 'center'}
  return (
    <div style={{ width: '100%'}}>
      <TableContainer component={Paper}>
      <Table>
        <TableHead style={{ backgroundColor: 'black'}}>
          <TableRow>
            <TableCell align="center" colSpan={4}>
            </TableCell>
            <TableCell align="center" colSpan={4} style={tacklesCellStyle}>
              RUSHING
            </TableCell>
            <TableCell align="center" colSpan={4} style={intCellStyle}>
              RECEIVING
            </TableCell>
            <TableCell align="center" colSpan={4} style={fumbleCellStyle}>
              SCRIMMAGE
            </TableCell>
          </TableRow>
          <TableRow style={{ backgroundColor: 'black'}}>
            <TableCell style={infoStyle}>Name</TableCell>
            <TableCell style={infoStyle}>Position</TableCell>
            <TableCell style={infoStyle}>Class</TableCell>
            <TableCell style={infoStyle}>Games</TableCell>
            <TableCell style={tacklesCellStyle}>ATT</TableCell>
            <TableCell style={tacklesCellStyle}>YDS</TableCell>
            <TableCell style={tacklesCellStyle}>AVG</TableCell>
            <TableCell style={tacklesCellStyle}>TD</TableCell>
            <TableCell style={tacklesCellStyle}>REC</TableCell>
            <TableCell style={intCellStyle}>YDS</TableCell>
            <TableCell style={intCellStyle}>AVG</TableCell>
            <TableCell style={intCellStyle}>TD</TableCell>
            <TableCell style={intCellStyle}>Plays</TableCell>
            <TableCell style={intCellStyle}>YDS</TableCell>
            <TableCell style={fumbleCellStyle}>AVG</TableCell>
            <TableCell style={fumbleCellStyle}>TD</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      </TableContainer>
    </div>
  )
}

export default RushingReceivingTable

RushingReceivingTable.propTypes = {
  rushingAndReceiving: PropTypes.arrayOf(
    PropTypes.shape({
      playerInfo: PropTypes.object.isRequired,
      stats: PropTypes.object.isRequired,
    })
  ).isRequired,
};