import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, TableHead } from "@mui/material";
import PropTypes from 'prop-types';
import { cellFourVariant, cellZeroVariant } from "../../../styles";
const OLineTable = ({ offensiveLineman }) => {
  console.log("olineman", offensiveLineman)
  return (
    <div style={{ width: '100%'}}>
      <TableContainer component={Paper}>
      <Table>
        <TableHead style={{ backgroundColor: '#f79839'}}>
          <TableRow >
            <TableCell style={cellFourVariant}>Name</TableCell>
            <TableCell style={cellFourVariant}>Position</TableCell>
            <TableCell style={cellFourVariant}>Class</TableCell>
            <TableCell style={cellFourVariant}>Games</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {offensiveLineman.map((player, index) => {
            const isEvenRow = index % 2 === 0;
            return (
              <TableRow key={index} style={{ backgroundColor: isEvenRow ? '#f5c18e' : '#ed9f53' }}>
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
      stats: PropTypes.object,
    })
  ),
};