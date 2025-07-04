import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    borderRadius: '16px',
    objectFit: 'cover',
    width: '100%',
    maxHeight: '500px',
    height: 'auto',
    boxShadow: theme.shadows[3],
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  section: {
    borderRadius: '16px',
    margin: '10px',
    flex: 1,
  },
  imageSection: {
    marginLeft: '20px',
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      marginTop: theme.spacing(2),
    },
  },
  recommendedPosts: {
    display: 'flex',
    gap: '16px',
    marginTop: theme.spacing(3),
    flexWrap: 'wrap',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  loadingPaper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '15px',
    height: '39vh',
  },
  commentsOuterContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  commentsInnerContainer: {
    height: '200px',
    overflowY: 'auto',
    marginRight: '30px',
  },
}));
