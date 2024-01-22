import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import PropTypes from 'prop-types';

const cellZeroVariant = { color: 'white', fontWeight: 'bold', textAlign: 'center'}
//shape ncaaf player data differently or conditionally render different table 
const PlayerTable = ({ playerData }) => {
console.log("football player data", playerData)
  return (
    <TableContainer component={Paper} style={{ marginTop: '12px' }}>
      <Table aria-label="simple table">
        <TableHead className='tableHead'>
          <TableRow style={{ backgroundColor: '#4186ba',  color: 'white', fontWeight: 'bold' }}>
            
            <TableCell style={cellZeroVariant}>Name</TableCell>
            <TableCell style={cellZeroVariant}>GP</TableCell>
            <TableCell style={cellZeroVariant}>GS</TableCell>
            <TableCell style={cellZeroVariant}>FGM</TableCell>
            <TableCell style={cellZeroVariant}>FGA</TableCell>
            <TableCell style={cellZeroVariant}>FG%</TableCell>
            <TableCell style={cellZeroVariant}>FG2M</TableCell>
            <TableCell style={cellZeroVariant}>FG2A</TableCell>
            <TableCell style={cellZeroVariant}>FG2%</TableCell>
            <TableCell style={cellZeroVariant}>FG3M</TableCell>
            <TableCell style={cellZeroVariant}>FG3A</TableCell>
            <TableCell style={cellZeroVariant}>FG3%</TableCell>
            <TableCell style={cellZeroVariant}>FTM</TableCell>
            <TableCell style={cellZeroVariant}>FTA</TableCell>
            <TableCell style={cellZeroVariant}>FT%</TableCell>
            <TableCell style={cellZeroVariant}>REB</TableCell>
            <TableCell style={cellZeroVariant}>AST</TableCell>
            <TableCell style={cellZeroVariant}>STL</TableCell>
            <TableCell style={cellZeroVariant}>BLK</TableCell>
            <TableCell style={cellZeroVariant}>TOV</TableCell>
            <TableCell style={cellZeroVariant}>PTS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {playerData.map((player, index) => (
            <TableRow key={index} style={{ backgroundColor: index % 2 === 0 ? '#b5d3eb' : '#7db6e3', textAlign: 'center', justifyContent: 'center' }}>
              <TableCell style={{ whiteSpace: 'nowrap', fontWeight: 600 }}>{player.firstName} {player.lastName}</TableCell>
              <TableCell>{player.games}</TableCell>
              <TableCell>{player.gamesStarted}</TableCell>
              <TableCell>{player.fgm}</TableCell>
              <TableCell>{player.fga}</TableCell>
              <TableCell>{player.fgPercent}</TableCell>
              <TableCell>{player.fg2m}</TableCell>
              <TableCell>{player.fg2a}</TableCell>
              <TableCell>{player.fg2Percent}</TableCell>
              <TableCell>{player.fg3m}</TableCell>
              <TableCell>{player.fg3a}</TableCell>
              <TableCell>{player.fg3Percent}</TableCell>
              <TableCell>{player.ftm}</TableCell>
              <TableCell>{player.fta}</TableCell>
              <TableCell>{player.ftPercent}</TableCell>
              <TableCell>{player.reb}</TableCell>
              <TableCell>{player.ast}</TableCell>
              <TableCell>{player.stl}</TableCell>
              <TableCell>{player.blk}</TableCell>
              <TableCell>{player.tov}</TableCell>
              <TableCell>{player.pts}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PlayerTable;

PlayerTable.propTypes = {
  playerData: PropTypes.arrayOf(
    PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
    })
  ).isRequired,
};