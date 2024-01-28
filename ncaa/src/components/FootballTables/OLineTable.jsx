import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, TableHead } from "@mui/material";
import PropTypes from 'prop-types';
import { cellFourVariant, cellZeroVariant } from "../../../styles";
const OLineTable = ({ offensiveLineman }) => {
  
  return (
    <div style={{ width: '100%'}}>
      <TableContainer component={Paper}>
      <Table>
        <TableHead style={{ backgroundColor: 'black'}}>
          <TableRow>
            <TableCell align="center" colSpan={4}>
            </TableCell>
          </TableRow>
          <TableRow style={{ backgroundColor: 'black'}}>
            <TableCell style={cellFourVariant}>Name</TableCell>
            <TableCell style={cellFourVariant}>Position</TableCell>
            <TableCell style={cellFourVariant}>Class</TableCell>
            <TableCell style={cellFourVariant}>Games</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {offensiveLineman.map((player, index) => {
            return (
              <TableRow key={index}>
                <TableCell style={cellZeroVariant}>{player.playerInfo.firstName} {player.playerInfo.lastName}</TableCell>
                <TableCell style={cellZeroVariant}>{player.playerInfo.position}</TableCell>
                <TableCell style={cellZeroVariant}>{player.playerInfo.year}</TableCell>
                <TableCell style={cellZeroVariant}>{player.stats.g}</TableCell>
              </TableRow>
            )
          })}
          
        </TableBody>
      </Table>
      </TableContainer>
    </div>
  )
}

export default OLineTable

OLineTable.propTypes = {
  offensiveLineman: PropTypes.arrayOf(
    PropTypes.shape({
      playerInfo: PropTypes.object.isRequired,
      stats: PropTypes.object.isRequired,
    })
  ),
};