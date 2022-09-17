import {
  Timeline,
  TimelineDot,
  TimelineConnector,
  TimelineSeparator,
  TimelineItem,
  TimelineContent,
} from "@mui/lab";

export const TimeLineCom = () => {
  const k = [{}, ""];
  return (
    <>
      <Timeline>
        {k.map((item) => {
          return (
            <>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector></TimelineConnector>
                </TimelineSeparator>
                <TimelineContent>
                  <TimeLineDescription />
                </TimelineContent>
              </TimelineItem>
            </>
          );
        })}
      </Timeline>
    </>
  );
};

export const TimeLineDescription = () => {
  return (
    <>
      <div
        className='m-2 border border-dark d-flex'
        style={{ height: "200px", border: "1px solid black" }}
      >
        <div className='d-flex'>
          <p className='fw-bold'>Assign:</p>
          <p>Name</p>
        </div>
        <div className='d-flex'>
          <p className='fw-bold mx-2'>description:</p>
          <p>description</p>
        </div>
        <div className='d-flex'>
          <p className='fw-bold mx-2'>updatedOn:</p>
          <p>description</p>
        </div>
      </div>
    </>
  );
};
