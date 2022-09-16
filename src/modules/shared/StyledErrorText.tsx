import { Typography } from '@mui/material';
export const StyledErrorText = ({ text, sx }: { text: string; sx?: any }) => {
  return (
    <>
      <Typography
        sx={{
          fontFamily: 'Open Sans',
          fontWeight: 700,
          fontSize: '13px',
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
