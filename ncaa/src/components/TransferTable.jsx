import PropTypes from 'prop-types'
import PlayerTable from './PlayerTable';

const TransferTable = ({ playerData, oldPlayerData}) => {
  console.log(playerData);
  return (
    <div>
      <div><PlayerTable data={playerData} tableType="Transferred In"/></div>
      <div><PlayerTable data={oldPlayerData} tableType="Transferred Out"/></div>
      
      
    </div>
  )
}

export default TransferTable;

TransferTable.propTypes = {
  playerData: PropTypes.array.isRequired,
  oldPlayerData: PropTypes.array.isRequired,
};