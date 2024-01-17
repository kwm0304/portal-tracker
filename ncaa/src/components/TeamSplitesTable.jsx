import { Grid, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Typography } from "@mui/material";
import PropTypes from 'prop-types';

const TeamSplitesTable = ({ teamData }) => {
  console.log("teamData", teamData)
  const cellStyle = {  fontWeight: 'bold'}
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
          <Typography variant='h6' style={{ textAlign: 'center',marginTop: '32px', paddingTop: '12px', paddingBottom: '12px', fontWeight: 'bold', color: 'white', backgroundColor: '#347a2b', alignItems: 'center'}}>2023</Typography>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow style={{ backgroundColor: '#9bd494'}}>
                  <TableCell style={cellStyle}>Conf.</TableCell>
                  <TableCell style={cellStyle}>ACC</TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#5aa150'}}>
                  <TableCell  style={cellStyle}>Rating</TableCell>
                  <TableCell  style={cellStyle}>100</TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#9bd494'}}>
                  <TableCell style={cellStyle}>Wins</TableCell>
                  <TableCell style={cellStyle}>30</TableCell>
                  </TableRow>
                <TableRow style={{ backgroundColor: '#5aa150'}}>
                  <TableCell style={cellStyle}>Losses</TableCell>
                  <TableCell style={cellStyle}>20</TableCell>  
                </TableRow>
                <TableRow style={{ backgroundColor: '#9bd494'}}>
                  <TableCell style={cellStyle}>PPG</TableCell>
                  <TableCell style={cellStyle}>80</TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#5aa150'}}>
                  <TableCell style={cellStyle}>oppPPG</TableCell>
                  <TableCell style={cellStyle}>70</TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#9bd494'}}>
                  <TableCell style={cellStyle}>MOV</TableCell>
                  <TableCell style={cellStyle}>10</TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#5aa150'}}>
                  <TableCell style={cellStyle}>SOS</TableCell>
                  <TableCell style={cellStyle}>20</TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#9bd494'}}>
                  <TableCell style={cellStyle}>OSRS</TableCell>
                  <TableCell style={cellStyle}>100</TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#5aa150'}}>
                  <TableCell style={cellStyle}>DSRS</TableCell>
                  <TableCell style={cellStyle}>20</TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#9bd494'}}>
                  <TableCell style={cellStyle}>SRS</TableCell>
                  <TableCell style={cellStyle}>0</TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#5aa150'}}>
                  <TableCell style={cellStyle}>O.Rating</TableCell>
                  <TableCell style={cellStyle}>22</TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#9bd494'}}>
                  <TableCell style={cellStyle}>D.Rating</TableCell>
                  <TableCell style={cellStyle}>20</TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#5aa150'}}>
                  <TableCell style={cellStyle}>NET Rating</TableCell>
                  <TableCell style={cellStyle}>2</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
      </Grid>
      <Grid item xs={6}>
          <Typography variant='h6' style={{ textAlign: 'center',marginTop: '32px', paddingTop: '12px', paddingBottom: '12px', color: 'white', backgroundColor: '#a31c1c', alignItems: 'center'}}>
            2024
          </Typography>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow style={{ backgroundColor: '#cc8181'}}>
                  <TableCell style={cellStyle}>Conf.</TableCell>
                  <TableCell style={cellStyle}>ACC</TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#b04c4c'}}>
                  <TableCell  style={cellStyle}>Rating</TableCell>
                  <TableCell  style={cellStyle}>100</TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#cc8181'}}>
                  <TableCell style={cellStyle}>Wins</TableCell>
                  <TableCell style={cellStyle}>30</TableCell>
                  </TableRow>
                <TableRow style={{ backgroundColor: '#b04c4c'}}>
                  <TableCell style={cellStyle}>Losses</TableCell>
                  <TableCell style={cellStyle}>20</TableCell>  
                </TableRow>
                <TableRow style={{ backgroundColor: '#cc8181'}}>
                  <TableCell style={cellStyle}>PPG</TableCell>
                  <TableCell style={cellStyle}>80</TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#b04c4c'}}>
                  <TableCell style={cellStyle}>oppPPG</TableCell>
                  <TableCell style={cellStyle}>70</TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#cc8181'}}>
                  <TableCell style={cellStyle}>MOV</TableCell>
                  <TableCell style={cellStyle}>10</TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#b04c4c'}}>
                  <TableCell style={cellStyle}>SOS</TableCell>
                  <TableCell style={cellStyle}>20</TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#cc8181'}}>
                  <TableCell style={cellStyle}>OSRS</TableCell>
                  <TableCell style={cellStyle}>100</TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#b04c4c'}}>
                  <TableCell style={cellStyle}>DSRS</TableCell>
                  <TableCell style={cellStyle}>20</TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#cc8181'}}>
                  <TableCell style={cellStyle}>SRS</TableCell>
                  <TableCell style={cellStyle}>0</TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#b04c4c'}}>
                  <TableCell style={cellStyle}>O.Rating</TableCell>
                  <TableCell style={cellStyle}>22</TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#cc8181'}}>
                  <TableCell style={cellStyle}>D.Rating</TableCell>
                  <TableCell style={cellStyle}>20</TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: '#b04c4c'}}>
                  <TableCell style={cellStyle}>NET Rating</TableCell>
                  <TableCell style={cellStyle}>2</TableCell>
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
};