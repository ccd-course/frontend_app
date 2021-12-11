import React from "react";
import Typography from "@mui/material/Typography";

/**
 * To be rendered when the use try to reach a page, which dose not exist
 */
export const PageNotFound = () => {
  return (
    <div>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        <div style={{ display: "inline" }}>Page Not Found</div>
      </Typography>
    </div>
  );
};
