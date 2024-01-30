import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, TableHead } from "@mui/material";
import PropTypes from 'prop-types';
import {  cellFourVariant, cellZeroVariant } from "../../../styles";
const DefensiveTable = ({ defense }) => {
  console.log('defense', defense)

  

  const findDefArray = (player) => {
    const relevantArray = player.stats.find(subArr =>
      'tackles_total' in subArr
    )
    return relevantArray || {}
  }
  return (
    <div style={{ width: '100%' }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{ backgroundColor: '#a31c1c', color: 'white'}}>
            <TableRow >
              <TableCell align="center" colSpan={4}>

              </TableCell>
              <TableCell align="center" colSpan={5} style={{ fontWeight: 'bold', color: 'white' }}>
                TACKLES
              </TableCell>
              <TableCell align="center" colSpan={5} style={cellFourVariant}>
                INTERCEPTIONS
              </TableCell>
              <TableCell align="center" colSpan={4} style={cellFourVariant}>
                FUMBLES
              </TableCell>
            </TableRow>
            <TableRow style={{ backgroundColor: '#a31c1c' }}>
              <TableCell id="name" style={cellFourVariant}>Name</TableCell>
              <TableCell id="position" style={cellFourVariant}>Position</TableCell>
              <TableCell id="class" style={cellFourVariant}>Class</TableCell>
              <TableCell id="g" style={cellFourVariant}>Games</TableCell>
              <TableCell id="tackles_solo" style={cellFourVariant}>SOLO</TableCell>
              <TableCell id="tackles_assists" style={cellFourVariant}>AST</TableCell>
              <TableCell id="tackles_total" style={cellFourVariant}>TOT</TableCell>
              <TableCell style={cellFourVariant}>LOSS</TableCell>
              <TableCell style={cellFourVariant}>SK</TableCell>
              <TableCell style={cellFourVariant}>INT</TableCell>
              <TableCell style={cellFourVariant}>YDS</TableCell>
              <TableCell style={cellFourVariant}>AVG</TableCell>
              <TableCell style={cellFourVariant}>TD</TableCell>
              <TableCell style={cellFourVariant}>PD</TableCell>
              <TableCell style={cellFourVariant}>FR</TableCell>
              <TableCell style={cellFourVariant}>YDS</TableCell>
              <TableCell style={cellFourVariant}>TD</TableCell>
              <TableCell style={cellFourVariant}>FF</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {defense.map((player, index) => {
              const playerStats = findDefArray(player)
              const isEvenRow = index % 2 === 0; 
              return (
                <TableRow key={index} style={{ backgroundColor: isEvenRow ? '#de8a8a' : '#c95353' }}>
                  <TableCell style={cellZeroVariant}>{player.playerInfo.firstName} {player.playerInfo.lastName}</TableCell>
                  <TableCell style={cellZeroVariant}>{player.playerInfo.position}</TableCell>
                  <TableCell style={cellZeroVariant}>{player.playerInfo.year}</TableCell>
                  <TableCell style={cellZeroVariant}>{playerStats.g}</TableCell>
                  <TableCell style={cellZeroVariant}>{playerStats.tackles_solo}</TableCell>
                  <TableCell style={cellZeroVariant}>{playerStats.tackles_assists}</TableCell>
                  <TableCell style={cellZeroVariant}>{playerStats.tackles_total}</TableCell>
                  <TableCell style={cellZeroVariant}>{playerStats.tackles_loss}</TableCell>
                  <TableCell style={cellZeroVariant}>{playerStats.sacks}</TableCell>
                  <TableCell style={cellZeroVariant}>{playerStats.def_int}</TableCell>
                  <TableCell style={cellZeroVariant}>{playerStats.def_int_yds}</TableCell>
                  <TableCell style={cellZeroVariant}>{playerStats.def_int_yds_per_int}</TableCell>
                  <TableCell style={cellZeroVariant}>{playerStats.def_int_td}</TableCell>
                  <TableCell style={cellZeroVariant}>{playerStats.pass_defended}</TableCell>
                  <TableCell style={cellZeroVariant}>{playerStats.fumbles_rec}</TableCell>
                  <TableCell style={cellZeroVariant}>{playerStats.fumbles_rec_yds}</TableCell>
                  <TableCell style={cellZeroVariant}>{playerStats.fumbles_recovered_td}</TableCell>
                  <TableCell style={cellZeroVariant}>{playerStats.fumbles_forced}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default DefensiveTable

DefensiveTable.propTypes = {
  defense: PropTypes.arrayOf(
    PropTypes.shape({
      playerInfo: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        position: PropTypes.string,
        school: PropTypes.string,
      }).isRequired,
      stats: PropTypes.shape({
        school_name: PropTypes.string,
        g: PropTypes.string,
        tackles_solo: PropTypes.string,
        tacles_assists: PropTypes.string,
        tackles_total: PropTypes.string,
        tackles_loss: PropTypes.string,
        sacks: PropTypes.string,
        interceptions: PropTypes.string,
        interception_yards: PropTypes.string,
        interception_avg: PropTypes.string,
        interception_td: PropTypes.string,
        passes_defended: PropTypes.string,
        fumbles_recovered: PropTypes.string,
        fumbles_recovered_yards: PropTypes.string,
        fumbles_recovered_td: PropTypes.string,
        fumbles_forced: PropTypes.string,
      }),
    })
  ),
};