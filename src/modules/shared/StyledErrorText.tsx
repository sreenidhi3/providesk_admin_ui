import { Typography } from '@mui/material';
export const StyledErrorText = ({ text, sx }: { text: string; sx?: any }) => {
  return (
    <>
      <Typography
        variant='caption'
        sx={{
          fontSize: '11px',
          color: '#f44336',
          display: 'flex',
          alignItems: 'center',
          ...sx,
        }}
      >
        {text}
      </Typography>
    </>
  );
};
