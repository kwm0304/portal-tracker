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
        cell: { // This targets the cells of the DataGrid
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



const RatingTable = () => {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [year, setYear] = useState(2021);
  const [prevYear, setPrevYear] = useState(2020);
  const [sport, setSport] = useState('ncaab');

  useEffect(() => {
    const fetchYearData = async () => {
      try {
        const { ratingsYear1, ratingsYear2 } = await compareTeams(year, prevYear, sport);
        console.log("year", year)
        console.log("prevYear", prevYear)
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

 

  const columns = [
    { field: 'teamName', headerName: 'Team Name', width: 250, headerClassName: 'boldHeader' },
    { field: 'ratingsYear1', headerName: `${year} Rating`, type: 'number', width: 150 },
    { field: 'ratingsYear2', headerName: `${prevYear} Rating`, type: 'number', width: 150 },
    { field: 'ratingDifference', headerName: 'Rating Diff.', type: 'number', width: 150, renderCell: renderRatingCell },
    { field: 'playersTransferredIn', headerName: 'Transferred In', type: 'number', width: 150 },
    { field: 'playersTransferredOut', headerName: 'Transferred Out', type: 'number', width: 150 }
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
