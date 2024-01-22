import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, TableHead } from "@mui/material";
import PropTypes from 'prop-types';
import { cellThreeVariant, cellTwoVariant, cellFourVariant, cellZeroVariant, fumbleCellStyle } from "../../../styles";
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
          <TableHead>
            <TableRow style={{ backgroundColor: 'black' }}>
              <TableCell align="center" colSpan={4}>

              </TableCell>
              <TableCell align="center" colSpan={5} style={cellThreeVariant}>
                TACKLES
              </TableCell>
              <TableCell align="center" colSpan={5} style={cellTwoVariant}>
                INTERCEPTIONS
              </TableCell>
              <TableCell align="center" colSpan={4} style={fumbleCellStyle}>
                FUMBLES
              </TableCell>
            </TableRow>
            <TableRow style={{ backgroundColor: 'black' }}>
              <TableCell id="name" style={cellFourVariant}>Name</TableCell>
              <TableCell id="position" style={cellFourVariant}>Position</TableCell>
              <TableCell id="class" style={cellFourVariant}>Class</TableCell>
              <TableCell id="g" style={cellFourVariant}>Games</TableCell>
              <TableCell id="tackles_solo" style={cellThreeVariant}>SOLO</TableCell>
              <TableCell id="tackles_assists" style={cellThreeVariant}>AST</TableCell>
              <TableCell id="tackles_total" style={cellThreeVariant}>TOT</TableCell>
              <TableCell style={cellThreeVariant}>LOSS</TableCell>
              <TableCell style={cellThreeVariant}>SK</TableCell>
              <TableCell style={cellTwoVariant}>INT</TableCell>
              <TableCell style={cellTwoVariant}>YDS</TableCell>
              <TableCell style={cellTwoVariant}>AVG</TableCell>
              <TableCell style={cellTwoVariant}>TD</TableCell>
              <TableCell style={cellTwoVariant}>PD</TableCell>
              <TableCell style={fumbleCellStyle}>FR</TableCell>
              <TableCell style={fumbleCellStyle}>YDS</TableCell>
              <TableCell style={fumbleCellStyle}>TD</TableCell>
              <TableCell style={fumbleCellStyle}>FF</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {defense.map((player, index) => {
              const playerStats = findDefArray(player)
              return (
                <TableRow key={index}>
                  <TableCell style={cellZeroVariant}>{player.playerInfo.firstName} {player.playerInfo.lastName}</TableCell>
                  <TableCell style={cellZeroVariant}>{player.playerInfo.position}</TableCell>
                  <TableCell style={cellZeroVariant}>{player.playerInfo.year}</TableCell>
                  <TableCell style={cellZeroVariant}>{playerStats.g}</TableCell>
                  <TableCell style={cellThreeVariant}>{playerStats.tackles_solo}</TableCell>
                  <TableCell style={cellThreeVariant}>{playerStats.tackles_assists}</TableCell>
                  <TableCell style={cellThreeVariant}>{playerStats.tackles_total}</TableCell>
                  <TableCell style={cellThreeVariant}>{playerStats.tackles_loss}</TableCell>
                  <TableCell style={cellThreeVariant}>{playerStats.sacks}</TableCell>
                  <TableCell style={cellTwoVariant}>{playerStats.def_int}</TableCell>
                  <TableCell style={cellTwoVariant}>{playerStats.def_int_yds}</TableCell>
                  <TableCell style={cellTwoVariant}>{playerStats.def_int_yds_per_int}</TableCell>
                  <TableCell style={cellTwoVariant}>{playerStats.def_int_td}</TableCell>
                  <TableCell style={cellTwoVariant}>{playerStats.pass_defended}</TableCell>
                  <TableCell style={fumbleCellStyle}>{playerStats.fumbles_rec}</TableCell>
                  <TableCell style={fumbleCellStyle}>{playerStats.fumbles_rec_yds}</TableCell>
                  <TableCell style={fumbleCellStyle}>{playerStats.fumbles_recovered_td}</TableCell>
                  <TableCell style={fumbleCellStyle}>{playerStats.fumbles_forced}</TableCell>
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