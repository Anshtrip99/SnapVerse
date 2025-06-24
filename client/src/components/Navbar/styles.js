import { makeStyles } from '@material-ui/core/styles'
import { deepPurple } from '@material-ui/core/colors'

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      padding: '10px 15px',
      margin: '20px 0',
    },
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
    textDecoration: 'none',
    fontSize: '2em',
    fontWeight: 300,
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5em',
    },
  },
  image: {
    marginLeft: '15px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '10px',
    },
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      justifyContent: 'center',
      marginTop: '10px',
    },
  },
  profile: {
    display: 'flex',
    alignItems: 'center',
    width: 'auto',
  },
  profileContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    maxWidth: '300px', // Prevent overflow
    [theme.breakpoints.down('md')]: {
      maxWidth: '200px',
    },
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    minWidth: 0, // Allow text to shrink
    flex: 1,
  },
  userName: {
    fontWeight: 600,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '100%',
    cursor: 'default',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '10px',
    },
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  logout: {
    marginLeft: '10px',
    whiteSpace: 'nowrap',
    minWidth: 'auto',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '5px',
    },
  },
}));