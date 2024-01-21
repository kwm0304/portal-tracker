import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, TableHead } from "@mui/material";
import PropTypes from 'prop-types';
const PassingTable = ({ passing }) => {
  console.log('passing',typeof passing)

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
            <TableCell align="center" colSpan={9} style={tacklesCellStyle}>
              PASSING
            </TableCell>
          </TableRow>
          <TableRow style={{ backgroundColor: 'black'}}>
            <TableCell style={infoStyle}>Name</TableCell>
            <TableCell style={infoStyle}>Position</TableCell>
            <TableCell style={infoStyle}>Class</TableCell>
            <TableCell style={infoStyle}>Games</TableCell>
            <TableCell style={tacklesCellStyle}>CMP</TableCell>
            <TableCell style={tacklesCellStyle}>ATT</TableCell>
            <TableCell style={tacklesCellStyle}>PCT</TableCell>
            <TableCell style={tacklesCellStyle}>YDS</TableCell>
            <TableCell style={tacklesCellStyle}>Y/A</TableCell>
            <TableCell style={tacklesCellStyle}>AY/A</TableCell>
            <TableCell style={tacklesCellStyle}>TD</TableCell>
            <TableCell style={tacklesCellStyle}>INT</TableCell>
            <TableCell style={tacklesCellStyle}>RATE</TableCell>
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

export default PassingTable

PassingTable.propTypes = {
  passing: PropTypes.arrayOf(
    PropTypes.shape({
      playerInfo: PropTypes.object.isRequired,
      stats: PropTypes.object.isRequired,
    })
  ).isRequired,
};