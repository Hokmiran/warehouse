import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { AppBar, IconButton, Toolbar, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import style from './dashboardNavbar.module.scss';


const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3]
}));

export const DashboardNavbar = (props) => {

  const { onSidebarOpen, ...other } = props;

  const handleLogout = () => {
    localStorage.clear()
    window.location.reload();
  }


  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280
          },
          width: {
            lg: 'calc(100% - 280px)'
          }
        }}
        {...other}>

        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'center'
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: 'inline-flex',
                lg: 'none'
              }
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          {/* <Box sx={{ flexGrow: 1 }} /> */}
          <Tooltip title="log out" >
            <svg onClick={() => handleLogout()} className={style.logout} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16 9v-4l8 7-8 7v-4h-8v-6h8zm-16-7v20h14v-2h-12v-16h12v-2h-14z" /></svg>
          </Tooltip>
        </Toolbar>

      </DashboardNavbarRoot >
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func
};
