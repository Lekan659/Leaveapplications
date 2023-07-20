import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
// import { darken } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import JWTLoginTab from './tabs/JWTLoginTab';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#000',
    color: theme.palette.primary.contrastText,
  },
  leftSection: {},
  rightSection: {
    backgroundImage: `url("https://img.freepik.com/free-photo/attractive-stylish-young-dark-skinned-female-beige-shirt-sitting-kitchen-table-using-laptop-calculating-budget-planning-vacations-smiling-happily-self-employed-black-woman-working-from-home_343059-2637.jpg?t=st=1664178849~exp=1664179449~hmac=5a3dfa14f24ca09d2323862e049e5e9d295fd25355824cf95eabc595f673f404")`,
    //backgroundPosition: 'right 200%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    filter: 'drop-shadow(18px 10px 20px gray) contrast(110%)',
  },
}));

function Login() {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, 'flex flex-col flex-auto h-screen')}>
        <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex w-full shadow-2xl overflow-hidden h-full"
      >
                <Card
          className={clsx(
            classes.leftSection,
            'flex flex-1 flex-col h-full overflow-scroll w-6/12 shadow-0'
          )}
          square
        >
            <CardContent className="flex flex-col w-full items-center lg:px-72 px-16 justify-center h-screen lg:justify-start lg:h-auto">
            <div className="lg:w-full sm:w-4/5">
              <div className="flex flex-col items-start relative my-48">
                <img
                  className="absolute absolute-logo"
                   src="https://capitalbancorpgroup.com/img/logo_cbp.png"
                  alt="logo"
                />
              </div>
              <div className="flex flex-col">
                <Typography className="font-bold" mt={0} variant="h6">
                  Sign In
                </Typography>
                <Typography className="text-gray-500 mt-10 lg:w-3/5 leading-6">
                  Enter your username and password
                </Typography>
              </div>
              <JWTLoginTab />
            </div>
            </CardContent>
        </Card>
        <div
          className={clsx(
            classes.rightSection,
            'hidden md:flex items-center w-7/12 justify-center p-64 relative'
          )}
        >
          <div className="image-overlay" />
        </div>
      </motion.div>
    </div>
  );
}

export default Login;