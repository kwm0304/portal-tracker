import { Grid, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Typography } from "@mui/material";
import PropTypes from 'prop-types';

const TeamSplitesTable = ({ teamData, year }) => {
  if (!teamData || !teamData.statsYear1 || !teamData.statsYear2) {
    return <div>Loading...</div>;
  }
  const year1Data = teamData.statsYear1[0];
  const year2Data = teamData.statsYear2[0];

  const renderTable = (teamData) => {
    return Object.entries(teamData).map(([key, value], index) => {
      const isEvenRow = index % 2 === 0;
      const rowStyle = { backgroundColor: isEvenRow ? '#9bd494' : '#5aa150' };

      const formattedKey = key.charAt(0).toUpperCase() + key.slice(1).replace(/[A-Z]/g, letter => ` ${letter}`);

      return (
        <TableRow key={key} style={rowStyle}>
          <TableCell style={cellStyle}>{formattedKey}</TableCell>
          <TableCell style={cellStyle}>{value}</TableCell>
        </TableRow>
      )
    })
  }

  const cellStyle = { fontWeight: 'bold', textAlign: 'center' }
  //consts for diff column
  const prevYear = year - 1;
  const ratingDiff = year2Data.rating - year1Data.rating;
  const winsDiff = year1Data.wins - year2Data.wins;
  const lossesDiff = year1Data.losses - year2Data.losses;
  const ppgDiff = (year1Data.ppg - year2Data.ppg).toFixed(1);
  const oppPpgDiff = (year1Data.oppPpg - year2Data.oppPpg).toFixed(1);
  const movDiff = (year1Data.mov - year2Data.mov).toFixed(1);
  const sosDiff = (year1Data.sos - year2Data.sos).toFixed(1);
  const osrsDiff = (year1Data.osrs - year2Data.osrs).toFixed(1);
  const dsrsDiff = (year1Data.dsrs - year2Data.dsrs).toFixed(1);
  const srsDiff = (year1Data.srs - year2Data.srs).toFixed(1);
  const offRatingDiff = (year1Data.offRating - year2Data.offRating).toFixed(1);
  const defRatingDiff = (year1Data.defRating - year2Data.defRating).toFixed(1);
  const netRatingDiff = (year1Data.netRating - year2Data.netRating).toFixed(1);
  return (
    <Grid container spacing={2}>
      <Grid item xs={5}>
          <Typography variant='h6' style={{ textAlign: 'center',marginTop: '32px', paddingTop: '12px', paddingBottom: '12px', fontWeight: 'bold', color: 'white', backgroundColor: '#347a2b', alignItems: 'center'}}>
            {year}
          </Typography>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              
              <TableBody>
                {renderTable(year1Data)}
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
                <TableRow style={{ backgroundColor: '#e0e0e0'}}>
                  <TableCell style={cellStyle}>Conf.</TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#9c9c9c'}}>
                  <TableCell style={cellStyle}>{ratingDiff}</TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#e0e0e0'}}>
                  <TableCell style={cellStyle}>{winsDiff}</TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#9c9c9c'}}>
                  <TableCell style={cellStyle}>{lossesDiff}</TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#e0e0e0'}}>
                  <TableCell style={cellStyle}>{ppgDiff}</TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#9c9c9c'}}>
                  <TableCell style={cellStyle}>{oppPpgDiff}</TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#e0e0e0'}}>
                  <TableCell style={cellStyle}>{movDiff}</TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#9c9c9c'}}>
                  <TableCell style={cellStyle}>{sosDiff}</TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#e0e0e0'}}>
                  <TableCell style={cellStyle}>{osrsDiff}</TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#9c9c9c'}}>
                  <TableCell style={cellStyle}>{dsrsDiff}</TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#e0e0e0'}}>
                  <TableCell style={cellStyle}>{srsDiff}</TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#9c9c9c'}}>
                  <TableCell style={cellStyle}>{offRatingDiff}</TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#e0e0e0'}}>
                  <TableCell style={cellStyle}>{defRatingDiff}</TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#9c9c9c'}}>
                  <TableCell style={cellStyle}>{netRatingDiff}</TableCell>
                </TableRow>
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
                {renderTable(year2Data)}
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