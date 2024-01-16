import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { compareTeams, schoolTransfersIn, schoolTransfersOut, getTransfers } from '../../helpers';
import { ThemeProvider, createTheme, Modal, Box, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PlayerTable from './PlayerTable';

const theme = createTheme({
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          fontSize: '1.5rem',
        },
        columnHeaderTitle: {
          fontWeight: 'bold',
          textAlign: 'center',
        },
        cell: { 
          textAlign: 'center',
          justifyContent: 'center',
        },
        }
    }
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

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  overflowY: 'auto',
  maxHeight: '80vh',
};

const RatingTable = () => {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [year, setYear] = useState(2021);
  const [prevYear, setPrevYear] = useState(2020);
  const [sport, setSport] = useState('ncaab');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [playerData, setPlayerData] = useState([]);
  console.log('YEAR', year)

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

  const handleOpenModal = async (teamName) => {
    setSelectedTeam(teamName);
    setModalOpen(true);
    const players = await getPlayersByTeam(teamName, year, sport);
    setPlayerData(players);
  }

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedTeam(null);
    setPlayerData([]);
  }

  const columns = [
    { field: 'teamName', headerName: 'Team Name', width: 250, headerClassName: 'boldHeader',
    renderCell: (params) => (
      <div style={{ cursor: 'pointer' }} onClick={() => handleOpenModal(params.value)}>
        {params.value}
      </div>
      ),
    },
    { field: 'ratingsYear1', headerName: `${year} Rating`, type: 'number', width: 150 },
    { field: 'ratingsYear2', headerName: `${prevYear} Rating`, type: 'number', width: 150 },
    { field: 'ratingDifference', headerName: 'Rating Diff.', type: 'number', width: 150, renderCell: renderRatingCell },
    { field: 'playersTransferredIn', headerName: '# In', type: 'number', width: 150 },
    { field: 'playersTransferredOut', headerName: '# Out', type: 'number', width: 150 }
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

    const response = await getTransfers(teamName, year, sport);
    console.log('response', response)
    return response;
  }

  console.log('playerData',playerData)

  return (
    <ThemeProvider theme={theme}>
      <div className='container'>
      <div>
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
            value={sport}
            onChange={handleSportChange}
          >
            <MenuItem value="ncaab">Basketball</MenuItem>
            <MenuItem value="ncaaf">Football</MenuItem>
          </Select>
        </FormControl>
      </div>
    <div style={{ height: '90vh', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
      />
      <Modal
     open={modalOpen}
     onClose={handleCloseModal}
     aria-labelledby="modal-modal-title"
     aria-describedby="modal-modal-description"
   >
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h4" component="h2">
        {selectedTeam} {year} Transfers
        </Typography>
        <PlayerTable playerData={playerData} />
      </Box>
      </Modal>
    </div>
    </div>
    </ThemeProvider>
  );
};

export default RatingTable;
