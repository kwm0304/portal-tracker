import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, TableHead } from "@mui/material";
import PropTypes from 'prop-types';
import { cellFourVariant,  cellZeroVariant } from "../../../styles";
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
        <TableHead style={{ backgroundColor: '#347a2b', color: 'white'}}>
          <TableRow>
            <TableCell align="center" colSpan={4}>
            </TableCell>
            <TableCell align="center" colSpan={4} style={cellFourVariant}>
              RUSHING
            </TableCell>
            <TableCell align="center" colSpan={4} style={cellFourVariant}>
              RECEIVING
            </TableCell>
            <TableCell align="center" colSpan={4} style={cellFourVariant}>
              SCRIMMAGE
            </TableCell>
          </TableRow>
          <TableRow style={{ backgroundColor: '#347a2b'}}>
            <TableCell style={cellFourVariant}>Name</TableCell>
            <TableCell style={cellFourVariant}>Position</TableCell>
            <TableCell style={cellFourVariant}>Class</TableCell>
            <TableCell style={cellFourVariant}>Games</TableCell>
            <TableCell style={cellFourVariant}>ATT</TableCell>
            <TableCell style={cellFourVariant}>YDS</TableCell>
            <TableCell style={cellFourVariant}>AVG</TableCell>
            <TableCell style={cellFourVariant}>TD</TableCell>
            <TableCell style={cellFourVariant}>REC</TableCell>
            <TableCell style={cellFourVariant}>YDS</TableCell>
            <TableCell style={cellFourVariant}>AVG</TableCell>
            <TableCell style={cellFourVariant}>TD</TableCell>
            <TableCell style={cellFourVariant}>Plays</TableCell>
            <TableCell style={cellFourVariant}>YDS</TableCell>
            <TableCell style={cellFourVariant}>AVG</TableCell>
            <TableCell style={cellFourVariant}>TD</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rushingAndReceiving.map((player, index) => {
            const playerStats = findRushRecArray(player)
            const isEvenRow = index % 2 === 0;
            return (
            <TableRow key={index} style={{backgroundColor: isEvenRow ? '#9bd494' : '#5aa150' }}>
              <TableCell style={cellZeroVariant}>{player.playerInfo.firstName} {player.playerInfo.lastName}</TableCell>
                <TableCell style={cellZeroVariant}>{player.playerInfo.position}</TableCell>
                <TableCell style={cellZeroVariant}>{player.playerInfo.year}</TableCell>
                <TableCell style={cellZeroVariant}>{playerStats.g}</TableCell>
                <TableCell style={cellZeroVariant}>{playerStats.rush_att}</TableCell>
                <TableCell style={cellZeroVariant}>{playerStats.rush_yds}</TableCell>
                <TableCell style={cellZeroVariant}>{playerStats.rush_yds_per_att}</TableCell>
                <TableCell style={cellZeroVariant}>{playerStats.rush_td}</TableCell>
                <TableCell style={cellZeroVariant}>{playerStats.rec}</TableCell>
                <TableCell style={cellZeroVariant}>{playerStats.rec_yds}</TableCell>
                <TableCell style={cellZeroVariant}>{playerStats.rec_yds_per_rec}</TableCell>
                <TableCell style={cellZeroVariant}>{playerStats.rec_td}</TableCell>
                <TableCell style={cellZeroVariant}>{playerStats.scrim_att}</TableCell>
                <TableCell style={cellZeroVariant}>{playerStats.scrim_yds}</TableCell>
                <TableCell style={cellZeroVariant}>{playerStats.scrim_yds_per_att}</TableCell>
                <TableCell style={cellZeroVariant}>{playerStats.scrim_td}</TableCell>
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
      stats: PropTypes.object,
    })
  ).isRequired,
};