import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, TableHead } from "@mui/material";
import PropTypes from 'prop-types';
const DefensiveTable = ({ defense }) => {
  console.log('defense', defense)

  const fumbleCellStyle = { color: 'red', fontWeight: 'bold', textAlign: 'center' }
  const intCellStyle = { color: 'green', fontWeight: 'bold', textAlign: 'center' }
  const tacklesCellStyle = { color: '#4287f5', fontWeight: 'bold', textAlign: 'center' }
  const infoStyle = { color: 'white', fontWeight: 'bold', textAlign: 'center' }
  const cellStyle = { fontWeight: 'bold', textAlign: 'center' }

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
              <TableCell align="center" colSpan={5} style={tacklesCellStyle}>
                TACKLES
              </TableCell>
              <TableCell align="center" colSpan={5} style={intCellStyle}>
                INTERCEPTIONS
              </TableCell>
              <TableCell align="center" colSpan={4} style={fumbleCellStyle}>
                FUMBLES
              </TableCell>
            </TableRow>
            <TableRow style={{ backgroundColor: 'black' }}>
              <TableCell id="name" style={infoStyle}>Name</TableCell>
              <TableCell id="position" style={infoStyle}>Position</TableCell>
              <TableCell id="class" style={infoStyle}>Class</TableCell>
              <TableCell id="g" style={infoStyle}>Games</TableCell>
              <TableCell id="tackles_solo" style={tacklesCellStyle}>SOLO</TableCell>
              <TableCell id="tackles_assists" style={tacklesCellStyle}>AST</TableCell>
              <TableCell id="tackles_total" style={tacklesCellStyle}>TOT</TableCell>
              <TableCell style={tacklesCellStyle}>LOSS</TableCell>
              <TableCell style={tacklesCellStyle}>SK</TableCell>
              <TableCell style={intCellStyle}>INT</TableCell>
              <TableCell style={intCellStyle}>YDS</TableCell>
              <TableCell style={intCellStyle}>AVG</TableCell>
              <TableCell style={intCellStyle}>TD</TableCell>
              <TableCell style={intCellStyle}>PD</TableCell>
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
                  <TableCell style={cellStyle}>{player.playerInfo.firstName} {player.playerInfo.lastName}</TableCell>
                  <TableCell style={cellStyle}>{player.playerInfo.position}</TableCell>
                  <TableCell style={cellStyle}>{player.playerInfo.year}</TableCell>
                  <TableCell style={cellStyle}>{playerStats.g}</TableCell>
                  <TableCell style={tacklesCellStyle}>{playerStats.tackles_solo}</TableCell>
                  <TableCell style={tacklesCellStyle}>{playerStats.tackles_assists}</TableCell>
                  <TableCell style={tacklesCellStyle}>{playerStats.tackles_total}</TableCell>
                  <TableCell style={tacklesCellStyle}>{playerStats.tackles_loss}</TableCell>
                  <TableCell style={tacklesCellStyle}>{playerStats.sacks}</TableCell>
                  <TableCell style={intCellStyle}>{playerStats.def_int}</TableCell>
                  <TableCell style={intCellStyle}>{playerStats.def_int_yds}</TableCell>
                  <TableCell style={intCellStyle}>{playerStats.def_int_yds_per_int}</TableCell>
                  <TableCell style={intCellStyle}>{playerStats.def_int_td}</TableCell>
                  <TableCell style={intCellStyle}>{playerStats.pass_defended}</TableCell>
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