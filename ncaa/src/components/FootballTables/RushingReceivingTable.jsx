import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, TableHead } from "@mui/material";
import PropTypes from 'prop-types';
import { cellFourVariant, cellThreeVariant, cellTwoVariant, cellOneVariant, cellZeroVariant } from "../../../styles";
const RushingReceivingTable = ({rushingAndReceiving}) => {
  console.log('rushrec',typeof rushingAndReceiving)

  const findRushRecArray = (player) => {
    const relevantArray = player.stats.find(subArr =>
      'rush_att' in subArr || 'rec' in subArr
    )
    return relevantArray || {}
  }

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
            <TableCell align="center" colSpan={4} style={cellOneVariant}>
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
            <TableCell style={cellTwoVariant}>REC</TableCell>
            <TableCell style={cellTwoVariant}>YDS</TableCell>
            <TableCell style={cellTwoVariant}>AVG</TableCell>
            <TableCell style={cellTwoVariant}>TD</TableCell>
            <TableCell style={cellTwoVariant}>Plays</TableCell>
            <TableCell style={cellOneVariant}>YDS</TableCell>
            <TableCell style={cellOneVariant}>AVG</TableCell>
            <TableCell style={cellOneVariant}>TD</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rushingAndReceiving.map((player, index) => {
            const playerStats = findRushRecArray(player)
            return (
            <TableRow key={index}>
              <TableCell style={cellZeroVariant}>{player.playerInfo.firstName} {player.playerInfo.lastName}</TableCell>
                <TableCell style={cellZeroVariant}>{player.playerInfo.position}</TableCell>
                <TableCell style={cellZeroVariant}>{player.playerInfo.year}</TableCell>
                <TableCell style={cellZeroVariant}>{playerStats.g}</TableCell>
                <TableCell style={cellThreeVariant}>{playerStats.rush_att}</TableCell>
                <TableCell style={cellThreeVariant}>{playerStats.rush_yds}</TableCell>
                <TableCell style={cellThreeVariant}>{playerStats.rush_yds_per_att}</TableCell>
                <TableCell style={cellThreeVariant}>{playerStats.rush_td}</TableCell>
                <TableCell style={cellTwoVariant}>{playerStats.rec}</TableCell>
                <TableCell style={cellTwoVariant}>{playerStats.rec_yds}</TableCell>
                <TableCell style={cellTwoVariant}>{playerStats.rec_yds_per_rec}</TableCell>
                <TableCell style={cellTwoVariant}>{playerStats.rec_td}</TableCell>
                <TableCell style={cellTwoVariant}>{playerStats.scrim_att}</TableCell>
                <TableCell style={cellTwoVariant}>{playerStats.scrim_yds}</TableCell>
                <TableCell style={cellOneVariant}>{playerStats.scrim_yds_per_att}</TableCell>
                <TableCell style={cellOneVariant}>{playerStats.scrim_td}</TableCell>
            </TableRow>
            )
          })}
          
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