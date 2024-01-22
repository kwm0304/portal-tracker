import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, TableHead } from "@mui/material";
import PropTypes from 'prop-types';
import { cellFourVariant, cellThreeVariant, cellZeroVariant } from "../../../styles";
const SpecialTeamsTable = ({ specialTeams }) => {
  console.log('passing',typeof passing)
  
  const findPassArray = (player) => {
    const relevantArray = player.stats.find(subArr =>
      'xpa' in subArr || 'punt' in subArr || 'fga' in subArr
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
            <TableCell align="center" colSpan={9} style={cellThreeVariant}>
              PASSING
            </TableCell>
          </TableRow>
          <TableRow style={{ backgroundColor: 'black'}}>
            <TableCell style={cellFourVariant}>Name</TableCell>
            <TableCell style={cellFourVariant}>Position</TableCell>
            <TableCell style={cellFourVariant}>Class</TableCell>
            <TableCell style={cellFourVariant}>Games</TableCell>
            <TableCell style={cellThreeVariant}>PUNTS</TableCell>
            <TableCell style={cellThreeVariant}>YDS</TableCell>
            <TableCell style={cellThreeVariant}>AVG</TableCell>
            <TableCell style={cellThreeVariant}>XPM</TableCell>
            <TableCell style={cellThreeVariant}>XPA</TableCell>
            <TableCell style={cellThreeVariant}>XP%</TableCell>
            <TableCell style={cellThreeVariant}>FGM</TableCell>
            <TableCell style={cellThreeVariant}>FGA</TableCell>
            <TableCell style={cellThreeVariant}>FG%</TableCell>
            <TableCell style={cellThreeVariant}>PTS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {specialTeams.map((player, index) => {
            const playerStats = findPassArray(player)
            return (
              <TableRow key={index}>
                <TableCell style={cellZeroVariant}>{player.playerInfo.firstName} {player.playerInfo.lastName}</TableCell>
                <TableCell style={cellZeroVariant}>{player.playerInfo.position}</TableCell>
                <TableCell style={cellZeroVariant}>{player.playerInfo.year}</TableCell>
                <TableCell style={cellZeroVariant}>{playerStats.g}</TableCell>
                <TableCell style={cellThreeVariant}>{playerStats.punt}</TableCell>
                <TableCell style={cellThreeVariant}>{playerStats.punt_yds}</TableCell>
                <TableCell style={cellThreeVariant}>{playerStats.punt_yds_per_punt}</TableCell>
                <TableCell style={cellThreeVariant}>{playerStats.xpm}</TableCell>
                <TableCell style={cellThreeVariant}>{playerStats.xpa}</TableCell>
                <TableCell style={cellThreeVariant}>{playerStats.xp_pct}</TableCell>
                <TableCell style={cellThreeVariant}>{playerStats.fgm}</TableCell>
                <TableCell style={cellThreeVariant}>{playerStats.fga}</TableCell>
                <TableCell style={cellThreeVariant}>{playerStats.fg_pct}</TableCell>
                <TableCell style={cellThreeVariant}>{playerStats.kick_points}</TableCell>
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
      stats: PropTypes.object.isRequired,
    })
  ),
};