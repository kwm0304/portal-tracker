import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { compareTeams, schoolTransfersIn, schoolTransfersOut } from '../../helpers';
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
{ field: 'playersIn', headerName: 'Transferred In', type: 'number', width: 225 },
{ field: 'playersOut', headerName: 'Transferred Out', type: 'number', width: 225 },
];

const RatingTable = () => {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRatingsDifferences = async () => {
      try {
        const { ratingDifferences } = await compareTeams(2020, 2021);
        const transferredOutData = await schoolTransfersOut(2021);
        const transferredInData = await schoolTransfersIn(2021);

        // Convert transfer data to a map for easy access
        const outMap = new Map(transferredOutData.map(item => [item.name, item.count]));
        console.log('outmap', outMap)
        const inMap = new Map(transferredInData.map(item => [item.name, item.count]));

        const allResults = ratingDifferences.map((item, index) => ({
          id: index,
          teamName: item.name,
          ratingDifference: item.ratingDifference,
          playersTransferredOut: outMap.get(item.name) || 0,
          playersTransferredIn: inMap.get(item.name) || 0,
        }));

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
