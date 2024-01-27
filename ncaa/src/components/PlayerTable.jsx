import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { cellZeroVariant } from '../../styles';


const PlayerTable = ({ data, tableType }) => {
  const backgroundColor = tableType === 'Transferred In' ? '#4186ba' : '#f79839';
  const rowColors = tableType === 'Transferred In' ? ['#b5d3eb', '#7db6e3'] : ['#f5c18e', '#ed9f53'];

  return (
    <>
      <TableContainer component={Paper} style={{ margin: '12px 0' }}>
        <Typography variant='h6' style={{ fontWeight: 'bold', textAlign: 'center', marginTop: '12px', fontSize: '24px' }}>{tableType}</Typography>

        <Table aria-label="simple table" style={{ overflow: 'scroll', height: 'auto'}}>
          <TableHead className='tableHead'>
            <TableRow style={{ backgroundColor: backgroundColor, color: 'white', fontWeight: 'bold' }}>
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
            {data.map((player, index) => (
              <TableRow key={index} style={{ backgroundColor: rowColors[index % 2], textAlign: 'center', justifyContent: 'center' }}>
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
    </>
  );
};

PlayerTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
    })
  ).isRequired,
  tableType: PropTypes.oneOf(['Transferred In', 'Transferred Out']).isRequired,
};

export default PlayerTable;
