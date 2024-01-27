import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { compareTeams, schoolTransfersIn, schoolTransfersOut, getTransfers, getTeamStats, getFootballPlayerStatsByParams, noNewSchools, getTransfersOut } from '../../helpers';
import { ThemeProvider, createTheme, Modal, Box, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TeamSplitesTable from './TeamSplitesTable';
import FootballAccordian from './FootballAccordian';
import { modalStyle } from '../../styles';
import TransferTable from './TransferTable';

const theme = createTheme({
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          fontSize: '1.5rem',
          textAlign: 'start',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          border: 'none',
        },
        columnHeaderTitle: {
          fontWeight: 'bold',
          textAlign: 'start',
          justifyContent: 'start',
          color: 'white',
          width: 'auto'
        },
        columnHeaderRow: {
          backgroundColor: '#4186ba'
        },
        sortIcon: {
          color: 'white'
        }
        }}
    }
})

const renderRatingCell = (params) => (
  <span style={{
    color: params.value > 0 ? 'green' : 'red',
    textAlign: 'center',
    display: 'inline-block',
    width: '100%',
  }}>
    {params.value}
  </span>
);

const renderRankingCell = (params) => (
  <span style={{
    textAlign: 'center',
    justifyContent: 'center',
    display: 'inline-block',
    width: '100%',
  }}>
    {params.value}
  </span>
)


const RatingTable = () => {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [year, setYear] = useState(2021);
  const [prevYear, setPrevYear] = useState(2020);
  const [sport, setSport] = useState('ncaab');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [playerData, setPlayerData] = useState([]);
  const [oldPlayerData, setOldPlayerData] = useState([]); 
  const [teamData, setTeamData] = useState([]);
  const [missingPlayerCount, setMissingPlayerCount] = useState(0);
  const [totalPlayerCount, setTotalPlayerCount] = useState(0);

  useEffect(() => {
    const fetchYearData = async () => {
      try {
        const { ratingsYear1, ratingsYear2 } = await compareTeams(year, prevYear, sport);
        const transferredOutData = await schoolTransfersOut(year, sport);
        const transferredInData = await schoolTransfersIn(year, sport);
  
        const outMap = new Map(transferredOutData.map(item => [item.name, item.count]));
        const inMap = new Map(transferredInData.map(item => [item.name, item.count]));

        const allResults = ratingsYear1.map((item, index) => {
          const teamName = item[0];
          const ratingYear1 = item[1];
          const ratingYear2Entry = ratingsYear2.find(([name]) => name === teamName);
          const ratingYear2 = ratingYear2Entry ? ratingYear2Entry[1] : null; 

          return {
            id: index,
            teamName,
            ratingsYear1: ratingYear1,
            ratingsYear2: ratingYear2,
            ratingDifference: ratingYear2 - ratingYear1,
            playersTransferredIn: inMap.get(teamName) || 0,
            playersTransferredOut: outMap.get(teamName) || 0,
          }
        });
  
        setRows(allResults);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchYearData();
  }, [year, prevYear, sport]);

  useEffect(() => {
    const fetchMissingPlayers = async () => {
      try {
        const [length, total] = await noNewSchools(year, sport);
        setMissingPlayerCount(length);
        setTotalPlayerCount(total);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchMissingPlayers();
  }, [year, sport])

  const handleOpenModal = async (teamName) => {
    setSelectedTeam(teamName);
    setModalOpen(true);
    const players = await getPlayersByTeam(teamName, year, sport);
    const oldPlayers = await getOldPlayersByTeam(teamName, year, sport);
    const teamSplits = await getTeamSplits(teamName, year, sport);
    setPlayerData(players);
    setOldPlayerData(oldPlayers);
    setTeamData(teamSplits);
  }
  console.log('playerData', playerData)
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedTeam(null);
    setPlayerData([]);
    setOldPlayerData([]);
    setTeamData([]);
  }

  const columns = [
    { field: 'teamName', headerName: 'Team Name', width: 300, headerClassName: 'boldHeader', 
    renderCell: (params) => (
      <div style={{ cursor: 'pointer', hover: {color: 'blue'}, textAlign: 'start', justifyContent: 'start'  }} onClick={() => handleOpenModal(params.value)} >
        {params.value}
      </div>
      ),
    },
    { field: 'ratingsYear1', headerName: `${year} Rating`, type: 'number', width: 200, style: { textAlign: 'center' }, renderCell: renderRankingCell },
    { field: 'ratingsYear2', headerName: `${prevYear} Rating`, type: 'number', width: 200, style: { textAlign: 'center' }, renderCell: renderRankingCell },
    { field: 'ratingDifference', headerName: 'Rating Diff.', type: 'number', width: 150, renderCell: renderRatingCell },
    { field: 'playersTransferredIn', headerName: '# In', type: 'number', width: 150, style: { textAlign: 'center' } },
    { field: 'playersTransferredOut', headerName: '# Out', type: 'number', width: 150, style: { textAlign: 'center' } }
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleYearChange = (e) => {
    e.preventDefault()
    setYear(e.target.value);
    setPrevYear(e.target.value - 1);
  }
  const handleSportChange = (event) => {
    setSport(event.target.value);
  };

  const getPlayersByTeam = async (teamName, year, sport) => {
    console.log(teamName, year, sport)
    let response;
    if (sport === "ncaab") {
      response = await getTransfers(teamName, year, sport);
    } else {
      response = await getFootballPlayerStatsByParams(teamName, year);
    }
    console.log("player response", response)
    return response;
  }

  const getOldPlayersByTeam = async (teamName, year, sport) => {
    let response;
    if (sport === "ncaab") {
      response = await getTransfersOut(teamName, year, sport);
    } else {
      response = await getFootballPlayerStatsByParams(teamName, year);
    }
    return response;
  }

  const getTeamSplits = async (teamName, year, sport) => {
    const response = await getTeamStats(teamName, year, sport);
    return response;
  }

  return (
    <div style={{ width: '100%', paddingTop: '8px'}}>
    <ThemeProvider theme={theme} >
      <div className='container'>
      <div className='input-box'>
        <FormControl>
          <InputLabel id="year-select-label">Year</InputLabel>
          <Select
          labelId="year-select-label"
          id="year-select"
          label="Year"
          value={year}
          onChange={handleYearChange}
          >
            <MenuItem value={2021}>2021</MenuItem>
            <MenuItem value={2022}>2022</MenuItem>
            <MenuItem value={2023}>2023</MenuItem>
            <MenuItem value={2024}>2024</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="sport-select-label">Sport</InputLabel>
          <Select
            labelId="sport-select-label"
            id="sport-select"
            label="Sport"
            value={sport}
            onChange={handleSportChange}
          >
            <MenuItem value="ncaab">Basketball</MenuItem>
            <MenuItem value="ncaaf">Football</MenuItem>
          </Select>
        </FormControl>
        
      </div>
      <Typography variant="h4" component="h6" style={{ textAlign: 'center', paddingBottom: '18px', fontSize: '24px'}}>
          Players without new school/Total: {missingPlayerCount}/{totalPlayerCount}
      </Typography>
      <div style={{ width: '100%'}}>
      
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        style={{ width: '100%'}}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'evenRow' : 'oddRow'
        }
      />
      </div>
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h4" component="h2" style={{ textAlign: 'center', paddingBottom: '18px'}}>
        {selectedTeam} {year}
        </Typography>
        {sport === "ncaab" ? 
        <>
        <TransferTable playerData={playerData} oldPlayerData={oldPlayerData}/>
        </>
        : <FootballAccordian playerData={playerData} />
        }
        <TeamSplitesTable teamData={teamData} year={year}/>
      </Box>
      </Modal>
    </div>
    </ThemeProvider>
    </div>
  );
};

export default RatingTable;
