import * as React from 'react';
import Button from 'material-ui/Button';
import { auth } from 'withRoot';
import Dialog, { DialogTitle, DialogContent } from 'material-ui/Dialog';
import { isAuthenticated } from 'lib/Auth';
import Box from 'components/UI/Box';

export class Login extends React.Component {
  state = {
    open: false,
  };

  handleLoginClick = () => {
    // auth.login
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleLoginWithGoogle = () => {
    auth.loginWithGoogle(this.handleLoginDone);
  };

  handleLoginWithFacebook = () => {
    auth.loginWithFacebook(this.handleLoginDone);
  };

  handleLoginDone = () => {
    this.handleClose();
  };

  handleLogoutCick = () => {
    auth.logout();
  };

  render() {
    const { open } = this.state;
    return (
      <>
        {!isAuthenticated() && (
          <Button onClick={this.handleLoginClick} color="inherit">
            Login
          </Button>
        )}
        {isAuthenticated() && (
          <Button onClick={this.handleLogoutCick} color="inherit">
            Logout
          </Button>
        )}
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="loginDialog"
        >
          <DialogTitle id="loginDialog">Login</DialogTitle>
          <DialogContent>
            <Box mB={1}>
              <Button
                fullWidth
                onClick={this.handleLoginWithGoogle}
                style={{ background: '#357ae8', color: '#fff' }}
              >
                Login with Google
              </Button>
            </Box>
            <Button
              fullWidth
              onClick={this.handleLoginWithFacebook}
              style={{ background: '#3b5998', color: '#fff' }}
            >
              Login with Facebook
            </Button>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

export default Login;
