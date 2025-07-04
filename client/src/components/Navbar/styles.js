import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    padding: '10px 30px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'stretch',
      gap: '10px',
    },
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
  },
  image: {
    marginLeft: '10px',
    height: '40px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '10px',
    width: 'auto',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
  },
  profile: {
    display: 'flex',
    alignItems: 'center',
  },
  profileContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px', 
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      gap: '12px',
    },
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  userName: {
    fontWeight: 500,
    fontSize: '1.05rem', 
    maxWidth: '160px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  logout: {
    padding: '6px 14px',
    marginLeft: '4px',
    textTransform: 'none',
    fontSize: '0.95rem', 
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));
