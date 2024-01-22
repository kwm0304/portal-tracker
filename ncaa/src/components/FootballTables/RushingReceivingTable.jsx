import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, TableHead } from "@mui/material";
import PropTypes from 'prop-types';
const RushingReceivingTable = ({rushingAndReceiving}) => {
  console.log('rushrec',typeof rushingAndReceiving)

  const fumbleCellStyle = { color: 'red', fontWeight: 'bold', textAlign: 'center'}
  const cellTwoVariant = { color: 'green', fontWeight: 'bold', textAlign: 'center'}
  const cellThreeVariant = { color: '#4287f5', fontWeight: 'bold', textAlign: 'center'}
  const cellFourVariant = { color: 'white', fontWeight: 'bold', textAlign: 'center'}
  return (
    <div style={{ width: '100%'}}>
      <TableContainer component={Paper}>
      <Table>
        <TableHead style={{ backgroundColor: 'black'}}>
          <TableRow>
            <TableCell align="center" colSpan={4}>
            </TableCell>
            <TableCell align="center" colSpan={4} style={cellThreeVariant}>
              RUSHING
            </TableCell>
            <TableCell align="center" colSpan={4} style={cellTwoVariant}>
              RECEIVING
            </TableCell>
            <TableCell align="center" colSpan={4} style={fumbleCellStyle}>
              SCRIMMAGE
            </TableCell>
          </TableRow>
          <TableRow style={{ backgroundColor: 'black'}}>
            <TableCell style={cellFourVariant}>Name</TableCell>
            <TableCell style={cellFourVariant}>Position</TableCell>
            <TableCell style={cellFourVariant}>Class</TableCell>
            <TableCell style={cellFourVariant}>Games</TableCell>
            <TableCell style={cellThreeVariant}>ATT</TableCell>
            <TableCell style={cellThreeVariant}>YDS</TableCell>
            <TableCell style={cellThreeVariant}>AVG</TableCell>
            <TableCell style={cellThreeVariant}>TD</TableCell>
            <TableCell style={cellThreeVariant}>REC</TableCell>
            <TableCell style={cellTwoVariant}>YDS</TableCell>
            <TableCell style={cellTwoVariant}>AVG</TableCell>
            <TableCell style={cellTwoVariant}>TD</TableCell>
            <TableCell style={cellTwoVariant}>Plays</TableCell>
            <TableCell style={cellTwoVariant}>YDS</TableCell>
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