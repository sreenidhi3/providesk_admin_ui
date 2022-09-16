import { Typography } from "@mui/material";
export const StyleLabel = ({
  text,
  sx,
  required,
}: {
  text: string;
  sx?: any;
  required?: boolean;
}) => {
  return (
    <>
      <Typography
        sx={{
          fontFamily: "Open Sans",
          fontWeight: 700,
          fontSize: "13px",
          display: "flex",
          alignItems: "center",
          ...sx,
        }}
      >
        {text}
        {required && "*"}
      </Typography>
    </>
  );
};
