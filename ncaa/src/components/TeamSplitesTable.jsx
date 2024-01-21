import { Grid, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Typography } from "@mui/material";
import PropTypes from 'prop-types';

const TeamSplitesTable = ({ teamData, year }) => {
  if (!teamData || !teamData.statsYear1 || !teamData.statsYear2) {
    return <div>Loading...</div>;
  }
  const year1Data = teamData.statsYear1[0];
  const year2Data = teamData.statsYear2[0];

  const calculateDifference = (year1Data, year2Data) => {
    let differences = {};
    Object.keys(year1Data).forEach(key => {
      if (typeof year1Data[key] === 'number' && typeof year2Data[key] === 'number') {
        differences[key] = (year1Data[key] - year2Data[key]).toFixed(1);
      }
    })
    return differences;
  }

  const differences = calculateDifference(year1Data, year2Data);

  const renderTable = (teamData, isYear1) => {
    return Object.entries(teamData).map(([key, value], index) => {
      const isEvenRow = index % 2 === 0;
      const year1RowStyle = { backgroundColor: isEvenRow ? '#9bd494' : '#5aa150' };
      const year2RowStyle = { backgroundColor: isEvenRow ? '#de8a8a' : '#c95353' };

      const rowStyle = isYear1 ? year1RowStyle : year2RowStyle;

      const formattedKey = key.charAt(0).toUpperCase() + key.slice(1).replace(/[A-Z]/g, letter => ` ${letter}`);

      return (
        <TableRow key={key} style={rowStyle}>
          <TableCell style={cellStyle}>{formattedKey}</TableCell>
          <TableCell style={cellStyle}>{value}</TableCell>
        </TableRow>
      )
    })
  }

  const renderDifferencesTable = (differences) => {
    return Object.values(differences).map((value, index) => {
      const isEvenRow = index % 2 === 0;
      const rowStyle = { backgroundColor: isEvenRow ? '#e0e0e0' : '#9c9c9c' };

      return (
        <TableRow key={index} style={rowStyle}>
          <TableCell style={cellStyle}>{value}</TableCell>
        </TableRow>
      );
    });
  };

  const cellStyle = { fontWeight: 'bold', textAlign: 'center' }
  //consts for diff column
  const prevYear = year - 1;
  return (
    <Grid container spacing={2}>
      <Grid item xs={5}>
          <Typography variant='h6' style={{ textAlign: 'center',marginTop: '32px', paddingTop: '12px', paddingBottom: '12px', fontWeight: 'bold', color: 'white', backgroundColor: '#347a2b', alignItems: 'center'}}>
            {year}
          </Typography>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              
              <TableBody>
                {renderTable(year1Data, true)}
              </TableBody>
            </Table>
          </TableContainer>
      </Grid>
      <Grid item xs={2}>
          <Typography variant='h6' style={{ textAlign: 'center',marginTop: '32px', paddingTop: '12px', fontWeight: 'bold', paddingBottom: '12px', color: 'white', backgroundColor: 'black', alignItems: 'center'}}>
            Difference
          </Typography>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableBody>
              <TableRow style={{ backgroundColor: '#e0e0e0' }}><TableCell style={cellStyle}>{year1Data.conference}</TableCell></TableRow>
              <TableRow style={{ backgroundColor: '#9c9c9c' }}><TableCell style={cellStyle}>{year1Data.name}</TableCell></TableRow>
                {renderDifferencesTable(differences)}
              </TableBody>
            </Table>
          </TableContainer>
      </Grid>
      <Grid item xs={5}>
          <Typography variant='h6' style={{ textAlign: 'center',marginTop: '32px', paddingTop: '12px', fontWeight: 'bold', paddingBottom: '12px', color: 'white', backgroundColor: '#a31c1c', alignItems: 'center'}}>
            {prevYear}
          </Typography>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableBody>
                {renderTable(year2Data, false)}
              </TableBody>
            </Table>
          </TableContainer>
      </Grid>
    </Grid>
  )
}

export default TeamSplitesTable

TeamSplitesTable.propTypes = {
  teamData: PropTypes.arrayOf(
    PropTypes.shape({
      teamName: PropTypes.string.isRequired,
      year: PropTypes.string.isRequired,
    })
  ).isRequired,
  year: PropTypes.number.isRequired,
};