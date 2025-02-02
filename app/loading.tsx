import { Box, CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <CircularProgress color="primary" />
    </Box>
  );
};

export default Loading;
