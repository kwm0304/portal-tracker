import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, TableHead } from "@mui/material";
import PropTypes from 'prop-types';
const DefensiveTable = ({defense}) => {
  console.log('defense',typeof defense)

  const fumbleCellStyle = { color: 'red', fontWeight: 'bold', textAlign: 'center'}
  const intCellStyle = { color: 'green', fontWeight: 'bold', textAlign: 'center'}
  const tacklesCellStyle = { color: '#4287f5', fontWeight: 'bold', textAlign: 'center'}
  const infoStyle = { color: 'white', fontWeight: 'bold', textAlign: 'center'}
  return (
    <div style={{ width: '100%'}}>
      <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow style={{ backgroundColor: 'black'}}>
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
          <TableRow style={{ backgroundColor: 'black'}}>
            <TableCell style={infoStyle}>Name</TableCell>
            <TableCell style={infoStyle}>Position</TableCell>
            <TableCell style={infoStyle}>Class</TableCell>
            <TableCell style={infoStyle}>Games</TableCell>
            <TableCell style={tacklesCellStyle}>SOLO</TableCell>
            <TableCell style={tacklesCellStyle}>AST</TableCell>
            <TableCell style={tacklesCellStyle}>TOT</TableCell>
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
          <TableRow>
            <TableCell>{}</TableCell>
          </TableRow>
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
      playerInfo: PropTypes.object.isRequired,
      stats: PropTypes.object.isRequired,
    })
  ).isRequired,
};