import {
  Timeline,
  TimelineDot,
  TimelineConnector,
  TimelineSeparator,
  TimelineItem,
  TimelineContent,
  TimelineOppositeContent,
} from '@mui/lab';
import { Chip, Paper } from '@mui/material';
import { ticketStatusColours } from '../constants';

export const TimelineComponent = ({ activities }: any) => {
  return (
    <>
      <Timeline>
        {activities?.map((item) => {
          return (
            <>
              <TimelineItem>
                <TimelineOppositeContent>
                  <TimelineLeft date={new Date().toDateString()} />{' '}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector></TimelineConnector>
                </TimelineSeparator>
                <TimelineContent>
                  <TimeLineDescription activity={item} />
                </TimelineContent>
              </TimelineItem>
            </>
          );
        })}
      </Timeline>
    </>
  );
};

const TimelineLeft = ({ date }: { date: string }) => {
  return (
    <div
      style={{
        margin: '0.3rem 0',
        width: '10vw',
        maxWidth: '100%',
        textAlign: 'right',
      }}
    >
      {date}
    </div>
  );
};

const TimeLineDescription = ({ activity }: { activity: any }) => {
  return (
    <Paper elevation={8} style={{ width: '40vw', maxWidth: '100%' }}>
      <div className='p-2 m-2'>
        <p>{activity?.description}</p>
        <Chip
          label={activity?.current_ticket_status}
          style={{
            backgroundColor:
              ticketStatusColours[activity.current_ticket_status] || 'default',
            color: '#ffffff',
          }}
        />
      </div>
    </Paper>
  );
};
