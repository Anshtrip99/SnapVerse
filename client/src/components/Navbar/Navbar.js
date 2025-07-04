import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { 
  AppBar, 
  Avatar, 
  Typography, 
  Toolbar, 
  Button,
  useMediaQuery,
  useTheme,
  IconButton,
  Menu,
  MenuItem,
  Box
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import decode from 'jwt-decode';
import SnapVerse from '../../images/memoriesText.png';
import SnapVerseLogo from '../../images/memoriesLogo.png';

const Navbar = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [anchorEl, setAnchorEl] = useState(null);
  const [imageError, setImageError] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    setUser(null);
    handleMenuClose();
    history.push('/'); 
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    const profileData = localStorage.getItem('profile');
    const parsedProfile = profileData ? JSON.parse(profileData) : null;
    setUser(parsedProfile);
    setImageError(false);
  }, [location]);

  const getProfileImageUrl = () => {
    if (imageError || !user?.result) return null;

    const possibleUrls = [
      user?.result?.picture,
      user?.result?.imageUrl,
      user?.result?.avatar,
      user?.result?.profilePicture,
      user?.result?.photo,
      user?.result?.image?.url,
      user?.result?.image,
    ];

    for (let url of possibleUrls) {
      if (url && typeof url === 'string') {
        if (url.includes('googleusercontent.com')) {
          return url.replace(/=s\d+-c/, '').replace(/\?.*$/, '') + '?sz=96';
        }
        return url;
      }
    }

    return null;
  };

  const handleImageError = (e) => {
    console.log('Failed to load image:', e?.target?.src);
    setImageError(true);
  };

  const truncateName = (name, maxLength = 15) => {
    if (!name) return '';
    return name.length > maxLength ? `${name.substring(0, maxLength)}...` : name;
  };

  const profileImageUrl = getProfileImageUrl();

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img src={SnapVerse} alt="icon" height="45px" />
        <img className={classes.image} src={SnapVerseLogo} alt="icon" height="40px" />
      </Link>
      
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            {isMobile ? (
              <>
                <IconButton
                  edge="end"
                  onClick={handleMenuOpen}
                  color="inherit"
                >
                  <Avatar 
                    className={classes.purple} 
                    alt={user?.result?.name} 
                    src={profileImageUrl}
                    onError={handleImageError}
                  >
                    {user?.result?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                  <MenuItem disabled>
                    <Typography variant="body2">
                      {user?.result?.name}
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <div className={classes.profileContainer}>
                <Avatar 
                  className={classes.purple} 
                  alt={user?.result?.name} 
                  src={profileImageUrl}
                  onError={handleImageError}
                >
                  {user?.result?.name?.charAt(0)?.toUpperCase() || 'U'}
                </Avatar>
                <Box className={classes.userInfo}>
                  <Typography 
                    className={classes.userName} 
                    variant="body1"
                    title={user?.result?.name}
                  >
                    {truncateName(user?.result?.name)}
                  </Typography>
                </Box>
                <Button 
                  variant="contained" 
                  className={classes.logout} 
                  color="secondary" 
                  onClick={logout}
                  size="small"
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        ) : (
          <Button 
            component={Link} 
            to="/auth" 
            variant="contained" 
            color="primary"
            size={isMobile ? "small" : "medium"}
            onClick={() => history.push('/auth')}
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
