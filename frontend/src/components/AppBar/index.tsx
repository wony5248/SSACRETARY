import * as React from 'react';
import MuiAppBar from '@mui/material/AppBar';

function AppBar(props:any) {
  return <MuiAppBar elevation={0} position="fixed" {...props} />;
}

export default AppBar;
