import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { compareTeams } from '../../helpers';
import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          fontSize: '1.5rem',
        },
        columnHeaderTitle: {
          fontWeight: 'bold',
        }
    }
  }
}
})

const columns = [
  { field: 'teamName', headerName: 'Team Name', width: 250, headerClassName: 'boldHeader' },
  { field: 'ratingDifference', headerName: 'Rating Difference', type: 'number', width: 225,
  renderCell: (params) => (
    <span style={{ color: params.value > 0 ? 'green' : 'red',
    textAlign: 'center',
    display: 'inline-block',
    width: '100%',
    }}>
      {params.value}
    </span>
  )
},
];

const RatingTable = () => {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRatingsDifferences = async () => {
      try {
        let allResults = [];

          const { ratingDifferences } = await compareTeams(2020, 2021);
          allResults = allResults.concat(ratingDifferences.map((item, index) => ({
            id: index,
            teamName: item.name,
            ratingDifference: item.ratingDifference,
          })));
        

        setRows(allResults);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRatingsDifferences();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
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
