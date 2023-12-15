import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { compareTeams, schoolTransfersIn, schoolTransfersOut } from '../../helpers';
import { ThemeProvider, createTheme } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const theme = createTheme({
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          fontSize: '1.5rem',
        },
        columnHeaderTitle: {
          fontWeight: 'bold',
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

const columns = [
  { field: 'teamName', headerName: 'Team Name', width: 250, headerClassName: 'boldHeader' },
  { field: 'ratingDifference', headerName: 'Rating Difference', type: 'number', width: 250,
  renderCell: renderRatingCell},
  { field: 'playersTransferredIn', headerName: 'Transferred In', type: 'number', width: 250,
  renderCell: renderRatingCell},
  { field: 'playersTransferredOut', headerName: 'Transferred Out', type: 'number', width: 250,
  renderCell: renderRatingCell},
];

const RatingTable = () => {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [year, setYear] = useState(2021);
  const [prevYear, setPrevYear] = useState(2020);
  const [sport, setSport] = useState('ncaab');

  useEffect(() => {
    const fetchYearData = async () => {
      try {
        const { ratingDifferences } = await compareTeams(prevYear, year, sport);
        const transferredOutData = await schoolTransfersOut(year, sport);
        const transferredInData = await schoolTransfersIn(year, sport);
  
        const outMap = new Map(transferredOutData.map(item => [item.name, item.count]));
        const inMap = new Map(transferredInData.map(item => [item.name, item.count]));
        console.log(inMap)
        const allResults = ratingDifferences.map((item, index) => ({
          id: index,
          teamName: item.name,
          ratingDifference: item.ratingDifference,
          playersTransferredOut: outMap.get(item.name) ,
          playersTransferredIn: inMap.get(item.name) ,
        }));
        console.log('allresults', allResults)
  
        setRows(allResults);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchYearData();
  }, [year, prevYear, sport]);


  if (isLoading) {
    return <div>Loading...</div>;
  }
console.log('sprot', sport)
console.log('year', year)
console.log('prevyear', prevYear)
  const handleYearChange = (event) => {
    setYear(event.target.value);
    setPrevYear(event.target.value - 1);
  }
  const handleSportChange = (event) => {
    setSport(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
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
    </div>
    </ThemeProvider>
  );
};

export default RatingTable;
