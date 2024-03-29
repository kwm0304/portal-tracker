import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, TableHead } from "@mui/material";
import PropTypes from 'prop-types';
import { cellFourVariant, cellThreeVariant, cellZeroVariant } from "../../../styles";
const PassingTable = ({ passing }) => {
  console.log('passing',typeof passing)
  
  const findPassArray = (player) => {
    const relevantArray = player.stats.find(subArr =>
      'pass_att' in subArr
    )
    return relevantArray || {}
  }

  
  return (
    <div style={{ width: '100%'}}>
      <TableContainer component={Paper}>
      <Table>
        <TableHead style={{ backgroundColor: '#4186ba', fontColor: 'white'}}>
          <TableRow>
            <TableCell align="center" colSpan={4}>
            </TableCell>
            <TableCell align="center" colSpan={9} style={{ fontWeight: 'bold', color: 'white' }}>
              PASSING
            </TableCell>
          </TableRow>
          <TableRow style={{ backgroundColor: ''}}>
            <TableCell style={cellFourVariant}>Name</TableCell>
            <TableCell style={cellFourVariant}>Position</TableCell>
            <TableCell style={cellFourVariant}>Class</TableCell>
            <TableCell style={cellFourVariant}>Games</TableCell>
            <TableCell style={cellFourVariant}>CMP</TableCell>
            <TableCell style={cellFourVariant}>ATT</TableCell>
            <TableCell style={cellFourVariant}>PCT</TableCell>
            <TableCell style={cellFourVariant}>YDS</TableCell>
            <TableCell style={cellFourVariant}>Y/A</TableCell>
            <TableCell style={cellFourVariant}>AY/A</TableCell>
            <TableCell style={cellFourVariant}>TD</TableCell>
            <TableCell style={cellFourVariant}>INT</TableCell>
            <TableCell style={cellFourVariant}>RATE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {passing.map((player, index) => {
            const playerStats = findPassArray(player)
            const isEvenRow = index % 2 === 0;
            return (
              <TableRow key={index} style={{ backgroundColor: isEvenRow ? '#b5d3eb' : '#7db6e3'}}>
                <TableCell style={cellZeroVariant}>{player.playerInfo.firstName} {player.playerInfo.lastName}</TableCell>
                <TableCell style={cellZeroVariant}>{player.playerInfo.position}</TableCell>
                <TableCell style={cellZeroVariant}>{player.playerInfo.year}</TableCell>
                <TableCell style={cellZeroVariant}>{playerStats.g}</TableCell>
                <TableCell style={cellThreeVariant}>{playerStats.pass_cmp}</TableCell>
                <TableCell style={cellThreeVariant}>{playerStats.pass_att}</TableCell>
                <TableCell style={cellThreeVariant}>{playerStats.pass_cmp_pct}</TableCell>
                <TableCell style={cellThreeVariant}>{playerStats.pass_yds}</TableCell>
                <TableCell style={cellThreeVariant}>{playerStats.pass_yds_per_att}</TableCell>
                <TableCell style={cellThreeVariant}>{playerStats.adj_pass_yds_per_att}</TableCell>
                <TableCell style={cellThreeVariant}>{playerStats.pass_td}</TableCell>
                <TableCell style={cellThreeVariant}>{playerStats.pass_int}</TableCell>
                <TableCell style={cellThreeVariant}>{playerStats.pass_rating}</TableCell>
              </TableRow>
            )
          })}
          
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
  ),
};