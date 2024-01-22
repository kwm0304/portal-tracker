import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { FaChevronDown } from "react-icons/fa";
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import PassingTable from './FootballTables/PassingTable';
import RushingReceivingTable from './FootballTables/RushingReceivingTable.jsx';
import DefensiveTable from './FootballTables/DefensiveTable';

const FootballAccordian = ({ playerData }) => {
  const passing = playerData.filter(player => player.playerInfo.position === 'QB')
  const rushingAndReceiving = playerData.filter(player =>
    player.stats.some(stat =>
      'rush_att' in stat || 'rec_yds' in stat
    )
  );
  const defense = playerData.filter(player =>
    player.stats.some(stat =>
      'tackles_total' in stat || 'tackles_assists' in stat
    )
  );
console.log('pass', passing)
console.log('defense', defense)
console.log('rushrec',rushingAndReceiving)
console.log("football player data", playerData)
  return (
    <div>
      <Accordion style={{  fontWeight: 'bold'}}>
        <AccordionSummary
          expandIcon={<FaChevronDown />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Passing
        </AccordionSummary>
        <AccordionDetails>
          {passing.length > 0 ?
          <PassingTable passing={passing} />
          : <h4>No Passing Data</h4>}
        </AccordionDetails>
      </Accordion>
      <Accordion style={{ fontWeight: 'bold'}}>
        <AccordionSummary
          expandIcon={<FaChevronDown />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          Rushing & Receiving
        </AccordionSummary>
        <AccordionDetails>
          {rushingAndReceiving.length > 0 ?
            <RushingReceivingTable rushingAndReceiving={rushingAndReceiving} />
            : <h4>No Rushing or Receiving Data</h4>
        }
        </AccordionDetails>
      </Accordion>
      <Accordion style={{ fontWeight: 'bold'}}>
        <AccordionSummary
          expandIcon={<FaChevronDown />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          Defense
        </AccordionSummary>
        <AccordionDetails>
          {defense.length > 0 ?
            <DefensiveTable defense={defense} />
            : <h4>No Defensive Data</h4>
          }
        </AccordionDetails>
        <AccordionActions>
          <Button>Cancel</Button>
          <Button>Agree</Button>
        </AccordionActions>
      </Accordion>
    </div>
  );
}

export default FootballAccordian;

FootballAccordian.propTypes = {
  playerData: PropTypes.arrayOf(
    PropTypes.shape({
      playerInfo: PropTypes.object.isRequired,
      stats: PropTypes.object.isRequired,
    })
  ).isRequired,
};