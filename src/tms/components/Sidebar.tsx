import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  Divider,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MapIcon from '@mui/icons-material/Map';
import PeopleIcon from '@mui/icons-material/People';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import taxslipsLogo from '../../images/taxslip-logo.png';

const DRAWER_WIDTH = 260;

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const menuItems = [
  { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
  { label: 'Loads', path: '/loads', icon: <LocalShippingIcon /> },
  { label: 'Dispatch Board', path: '/dispatch', icon: <MapIcon /> },
  { label: 'Drivers', path: '/drivers', icon: <PeopleIcon /> },
  { label: 'Vehicles', path: '/vehicles', icon: <DirectionsCarIcon /> },
  { label: 'Invoices', path: '/invoices', icon: <ReceiptIcon /> },
];

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <img src={taxslipsLogo} alt="Backup Logistics" style={{ height: 36 }} />
          <Typography variant="subtitle1" fontWeight={700} sx={{ color: '#064422' }}>
            Backup TMS
          </Typography>
        </Box>
        {isMobile && (
          <IconButton onClick={onClose} size="small">
            <ChevronLeftIcon />
          </IconButton>
        )}
      </Box>
      <Divider />
      <List sx={{ flex: 1, pt: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
          return (
            <ListItem key={item.path} disablePadding sx={{ px: 1, mb: 0.5 }}>
              <ListItemButton
                onClick={() => { navigate(item.path); if (isMobile) onClose(); }}
                sx={{
                  borderRadius: 2,
                  backgroundColor: isActive ? '#064422' : 'transparent',
                  color: isActive ? '#fff' : '#333',
                  '&:hover': {
                    backgroundColor: isActive ? '#064422' : '#f0f7f4',
                  },
                }}
              >
                <ListItemIcon sx={{ color: isActive ? '#fff' : '#064422', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{ fontSize: 14, fontWeight: isActive ? 600 : 400 }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography variant="caption" color="text.secondary">
          Backup Logistics TMS v1.0
        </Typography>
      </Box>
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        sx={{ '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box' } }}
      >
        {drawerContent}
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="permanent"
      open
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box', borderRight: '1px solid #e0e0e0' },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;
