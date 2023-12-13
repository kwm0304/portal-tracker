import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { compareTeams } from '../../helpers';

const columns = [
  { field: 'teamName', headerName: 'Team Name', width: 150 },
  { field: 'ratingDifference', headerName: 'Rating Difference', type: 'number', width: 150 },
  // Add more columns as needed
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
    <div style={{ height: '90vh', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
      />
    </div>
  );
};

export default RatingTable;
