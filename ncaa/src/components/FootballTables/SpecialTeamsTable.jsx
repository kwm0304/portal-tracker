import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, TableHead } from "@mui/material";
import PropTypes from 'prop-types';
import { cellFourVariant,  cellZeroVariant } from "../../../styles";
const SpecialTeamsTable = ({ specialTeams }) => {
  console.log('passing',typeof passing)
  console.log('special', specialTeams)
  const findRelArray = (player) => {
    const relevantArray = player.stats.find(subArr =>
      'xpa' in subArr || 'punt' in subArr || 'fga' in subArr
    )
    return relevantArray || {}
  }
  return (
    <div style={{ width: '100%'}}>
      <TableContainer component={Paper}>
      <Table>
        <TableHead style={{ backgroundColor: '#8544b3'}}>
          <TableRow>
            <TableCell align="center" colSpan={4}>
            </TableCell>
            <TableCell align="center" colSpan={10} style={cellFourVariant}>
              PASSING
            </TableCell>
          </TableRow>
          <TableRow style={{ backgroundColor: '#8544b3'}}>
            <TableCell style={cellFourVariant}>Name</TableCell>
            <TableCell style={cellFourVariant}>Position</TableCell>
            <TableCell style={cellFourVariant}>Class</TableCell>
            <TableCell style={cellFourVariant}>Games</TableCell>
            <TableCell style={cellFourVariant}>PUNTS</TableCell>
            <TableCell style={cellFourVariant}>YDS</TableCell>
            <TableCell style={cellFourVariant}>AVG</TableCell>
            <TableCell style={cellFourVariant}>XPM</TableCell>
            <TableCell style={cellFourVariant}>XPA</TableCell>
            <TableCell style={cellFourVariant}>XP%</TableCell>
            <TableCell style={cellFourVariant}>FGM</TableCell>
            <TableCell style={cellFourVariant}>FGA</TableCell>
            <TableCell style={cellFourVariant}>FG%</TableCell>
            <TableCell style={cellFourVariant}>PTS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {specialTeams.map((player, index) => {
            const playerStats = findRelArray(player)
            const isEvenRow = index % 2 === 0;
            return (
              <TableRow key={index} style={{ backgroundColor: isEvenRow ? '#d3b2eb' : '#b98dd9'}}>
                <TableCell style={cellZeroVariant}>{player.playerInfo.firstName} {player.playerInfo.lastName}</TableCell>
                <TableCell style={cellZeroVariant}>{player.playerInfo.position}</TableCell>
                <TableCell style={cellZeroVariant}>{player.playerInfo.year}</TableCell>
                <TableCell style={cellZeroVariant}>{playerStats.g}</TableCell>
                <TableCell style={cellZeroVariant}>{playerStats.punt}</TableCell>
                <TableCell style={cellZeroVariant}>{playerStats.punt_yds}</TableCell>
                <TableCell style={cellZeroVariant}>{playerStats.punt_yds_per_punt}</TableCell>
                <TableCell style={cellZeroVariant}>{playerStats.xpm}</TableCell>
                <TableCell style={cellZeroVariant}>{playerStats.xpa}</TableCell>
                <TableCell style={cellZeroVariant}>{playerStats.xp_pct}</TableCell>
                <TableCell style={cellZeroVariant}>{playerStats.fgm}</TableCell>
                <TableCell style={cellZeroVariant}>{playerStats.fga}</TableCell>
                <TableCell style={cellZeroVariant}>{playerStats.fg_pct}</TableCell>
                <TableCell style={cellZeroVariant}>{playerStats.kick_points}</TableCell>
              </TableRow>
            )
          })}
          
        </TableBody>
      </Table>
      </TableContainer>
    </div>
  )
}

export default SpecialTeamsTable

SpecialTeamsTable.propTypes = {
  specialTeams: PropTypes.arrayOf(
    PropTypes.shape({
      playerInfo: PropTypes.object.isRequired,
      stats: PropTypes.object,
    })
  ),
};