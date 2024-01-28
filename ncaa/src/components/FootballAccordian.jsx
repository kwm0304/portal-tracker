import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { FaChevronDown } from "react-icons/fa";
import PropTypes from 'prop-types';
import PassingTable from './FootballTables/PassingTable';
import RushingReceivingTable from './FootballTables/RushingReceivingTable.jsx';
import DefensiveTable from './FootballTables/DefensiveTable';
import SpecialTeamsTable from './FootballTables/SpecialTeamsTable';

const FootballAccordian = ({ playerData }) => {
  const passing = playerData.filter(player => player.playerInfo.position === 'QB' || player.stats.some(stat =>
    'pass_att' in stat
  ));
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
  const specialTeams = playerData.filter(player => 
    player.stats.some(stat =>
      'punt' in stat || 'xpa' in stat || 'fga' in stat)
  );
  const offensiveLineman = playerData.filter(player =>
    player.playerInfo.position === 'IOL' ||
    player.playerInfo.position === 'OT' ||
    player.playerInfo.position === 'LS'   
  );

  
    
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
      </Accordion>
      <Accordion style={{ fontWeight: 'bold'}}>
        <AccordionSummary
          expandIcon={<FaChevronDown />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          Special Teams
        </AccordionSummary>
        <AccordionDetails>
          {specialTeams.length > 0 ?
            <SpecialTeamsTable specialTeams={specialTeams} />
            : <h4>No Special Teams Data</h4>
          }
        </AccordionDetails>
      </Accordion>
      <Accordion style={{ fontWeight: 'bold'}}>
        <AccordionSummary
          expandIcon={<FaChevronDown />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          Offensive Lineman
        </AccordionSummary>
        <AccordionDetails>
          {offensiveLineman.length > 0 ?
            <SpecialTeamsTable offensiveLineman={offensiveLineman} />
            : <h4>No Offensive Line Data</h4>
          }
        </AccordionDetails>
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