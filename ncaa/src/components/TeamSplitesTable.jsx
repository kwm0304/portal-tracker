import { Grid, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Typography } from "@mui/material";
import PropTypes from 'prop-types';

const TeamSplitesTable = ({ teamData, year }) => {
  if (!teamData || !teamData.statsYear1 || !teamData.statsYear2) {
    return <div>Loading...</div>;
  }
  const year1Data = teamData.statsYear1[0];
  const year2Data = teamData.statsYear2[0];

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
                <TableRow style={{ backgroundColor: '#9bd494'}}>
                  <TableCell style={cellStyle}>Conf.</TableCell>
                  <TableCell style={cellStyle}>{year1Data.conference}</TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#5aa150'}}>
                  <TableCell  style={cellStyle}>Rating</TableCell>
                  <TableCell  style={cellStyle}>{year1Data.rating}</TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#9bd494'}}>
                  <TableCell style={cellStyle}>Wins</TableCell>
                  <TableCell style={cellStyle}>{year1Data.wins}</TableCell>
                  </TableRow>
                <TableRow style={{ backgroundColor: '#5aa150'}}>
                  <TableCell style={cellStyle}>Losses</TableCell>
                  <TableCell style={cellStyle}>{year1Data.losses}</TableCell>  
                </TableRow>
                <TableRow style={{ backgroundColor: '#9bd494'}}>
                  <TableCell style={cellStyle}>PPG</TableCell>
                  <TableCell style={cellStyle}>{year1Data.ppg}</TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#5aa150'}}>
                  <TableCell style={cellStyle}>oppPPG</TableCell>
                  <TableCell style={cellStyle}>{year1Data.oppPpg}</TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#9bd494'}}>
                  <TableCell style={cellStyle}>MOV</TableCell>
                  <TableCell style={cellStyle}>{year1Data.mov}</TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#5aa150'}}>
                  <TableCell style={cellStyle}>SOS</TableCell>
                  <TableCell style={cellStyle}>{year1Data.sos}</TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#9bd494'}}>
                  <TableCell style={cellStyle}>OSRS</TableCell>
                  <TableCell style={cellStyle}>{year1Data.osrs}</TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#5aa150'}}>
                  <TableCell style={cellStyle}>DSRS</TableCell>
                  <TableCell style={cellStyle}>{year1Data.dsrs}</TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#9bd494'}}>
                  <TableCell style={cellStyle}>SRS</TableCell>
                  <TableCell style={cellStyle}>{year1Data.srs}</TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#5aa150'}}>
                  <TableCell style={cellStyle}>O.Rating</TableCell>
                  <TableCell style={cellStyle}>{year1Data.offRating}</TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#9bd494'}}>
                  <TableCell style={cellStyle}>D.Rating</TableCell>
                  <TableCell style={cellStyle}>{year1Data.defRating}</TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#5aa150'}}>
                  <TableCell style={cellStyle}>NET Rating</TableCell>
                  <TableCell style={cellStyle}>{year1Data.netRating}</TableCell>
                </TableRow>
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
                <TableRow style={{ backgroundColor: '#cc8181'}}>
                  <TableCell style={cellStyle}>Conf.</TableCell>
                  <TableCell style={cellStyle}>{year2Data.conference}</TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#b04c4c'}}>
                  <TableCell  style={cellStyle}>Rating</TableCell>
                  <TableCell  style={cellStyle}>{year2Data.rating}</TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#cc8181'}}>
                  <TableCell style={cellStyle}>Wins</TableCell>
                  <TableCell style={cellStyle}>{year2Data.wins}</TableCell>
                  </TableRow>
                <TableRow style={{ backgroundColor: '#b04c4c'}}>
                  <TableCell style={cellStyle}>Losses</TableCell>
                  <TableCell style={cellStyle}>{year2Data.losses}</TableCell>  
                </TableRow>
                <TableRow style={{ backgroundColor: '#cc8181'}}>
                  <TableCell style={cellStyle}>PPG</TableCell>
                  <TableCell style={cellStyle}>{year2Data.ppg}</TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#b04c4c'}}>
                  <TableCell style={cellStyle}>oppPPG</TableCell>
                  <TableCell style={cellStyle}>{year2Data.oppPpg}</TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#cc8181'}}>
                  <TableCell style={cellStyle}>MOV</TableCell>
                  <TableCell style={cellStyle}>{year2Data.mov}</TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#b04c4c'}}>
                  <TableCell style={cellStyle}>SOS</TableCell>
                  <TableCell style={cellStyle}>{year2Data.sos}</TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#cc8181'}}>
                  <TableCell style={cellStyle}>OSRS</TableCell>
                  <TableCell style={cellStyle}>{year2Data.osrs}</TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#b04c4c'}}>
                  <TableCell style={cellStyle}>DSRS</TableCell>
                  <TableCell style={cellStyle}>{year2Data.dsrs}</TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#cc8181'}}>
                  <TableCell style={cellStyle}>SRS</TableCell>
                  <TableCell style={cellStyle}>{year2Data.srs}</TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#b04c4c'}}>
                  <TableCell style={cellStyle}>O.Rating</TableCell>
                  <TableCell style={cellStyle}>{year2Data.offRating}</TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#cc8181'}}>
                  <TableCell style={cellStyle}>D.Rating</TableCell>
                  <TableCell style={cellStyle}>{year2Data.defRating}</TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#b04c4c'}}>
                  <TableCell style={cellStyle}>NET Rating</TableCell>
                  <TableCell style={cellStyle}>{year2Data.netRating}</TableCell>
                </TableRow>
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