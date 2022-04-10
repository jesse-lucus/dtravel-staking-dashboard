import React, { useState, useEffect } from "react";
import { createBrowserHistory } from 'history'
import { useNavigate, useHistory } from "react-router-dom";
import { Box, Modal, TextField, Link, Typography } from "@material-ui/core";
import styled from "styled-components";
import CustomButton from "../elements/buttons";
import { TailSpin } from "react-loader-spinner";
import { LogoRoundedIcon } from "../elements/icons";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import { NotificationContainer, NotificationManager } from "react-notifications";
import { API } from '../helpers/api'
import Cookies from 'universal-cookie';

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://dTravel.com/">
          DTRAVEL
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>    
    );
  }


const Login = () => {
    const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [flag_spin_load_free, set_spin_load_free] = useState(false);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    let navigate = useNavigate();
    const cookies = new Cookies();

    const login_handler = async () => {
        if(!email?.match(regexp))
            {window.alert("Email Address is Invalid"); return;}
        if(password)
            if(password?.length < 6) 
            {window.alert("Invalid password!"); return;}
        
        const res = await API.login(email, password);
        if(res.message == "Login Success.")
        {
            cookies.set('token', res.data.token, { path: '/' });
            navigate("/dashboard"); 
        }
        else window.alert(res.message);
    }

    const themeLight = createTheme({
        palette: {
          background: {
            default: "#D4EEE9"
          }
        }
      });
  
    return (
        <MuiThemeProvider theme={themeLight}>
            <Box justify-content= {"space-around"}>
                <StyledComponent sx={{ marginTop: { xs: "64px", sm: "80px" } }}>
                    {/* <NotificationContainer> */}
                        `<MainPart>
                            <Box display={"grid"} width={"420px"}>
                                <Box margin={"10px"}>
                                    <TitleText01>
                                    <LogoRoundedIcon size="32px" />
                                        {"\u00a0"}
                                        {"\u00a0"}Login
                                    </TitleText01>
                                </Box>                            
                                <Box display={"grid"}>
                                    <Box display={"flex"}>
                                        <LeftText01>Email: </LeftText01>
                                        <TextField
                                        margin="normal"
                                        required
                                        id="email"
                                        name="email"
                                        autoComplete="email"
                                        variant="standard"
                                        autoFocus
                                        onChange={event => {const { value } = event.target; setEmail(value)}}
                                        />
                                    </Box>
                                    <Box display={"flex"}>
                                        <LeftText01>Password: </LeftText01>
                                        <TextField
                                        margin="normal"
                                        required
                                        name="password"
                                        type="password"
                                        id="password"
                                        variant="standard"
                                        autoComplete="current-password"
                                        onChange={event => {const { value } = event.target; setPassword(value)}}
                                        />                                    
                                    </Box>

                                </Box>
                                <Box
                                    display={"flex"}
                                    width={"100%"}
                                    marginTop={"5%"}
                                    // position={"relative"}
                                    onClick={() => {
                                    if (flag_spin_load_free === true) {
                                        NotificationManager.error("Please wait while processing.", "Hi.", 2000);
                                        return;
                                    }
                                        login_handler();
                                    }}
                                >
                                    {flag_spin_load_free ? (
                                    <Box display={"flex"} position={"absolute"} left={"50%"} justifyContent={"center"} alignItems={"center"} top="-150%">
                                        <TailSpin color="#05070c" height={35} width={35} />
                                    </Box>
                                    ) : (
                                    <></>
                                    )}
                                    <CustomButton str={"LOGIN"} width={"100%"} height={"56px"} color={"#D4EEE9"} bgcolor={"#0B2336"} fsize={"16px"} fweight={"400"} bradius={"100px"} />
                                </Box> 
                                <Box display={"flex"} justifyContent={"center"}>
                                    <Box margin={"10px"}>
                                        <Link href="#" variant="body2">
                                            Forgot password?
                                        </Link>
                                    </Box>
                                    <Box margin={"10px"}>
                                        <Link href="/register" variant="body2">
                                            {"Don't have an account? Register"}
                                        </Link>                                
                                    </Box>
                                </Box>
                            </Box>
                        </MainPart>
                    {/* </NotificationContainer> */}
                </StyledComponent>
            </Box>
        </MuiThemeProvider>

    );
  };

const StyledComponent = styled(Box)`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 5%;
  flex-direction: column;
`;

const MainPart = styled(Box)`
  display: flex;
  width: 100%;
`;

const TitleText01 = styled(Box)`
  display: flex;
  flex: 1;
  align-items: center;
  font-family: "Radio Grotesk";
  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  line-height: 28px;
  color: #0b2336;
`;

const LeftText01 = styled(Box)`
  display: flex;
  flex: 1;
  font-family: "Reckless Neue";
  font-style: normal;
  font-weight: 300;
  line-height: 68px;
  letter-spacing: -0.015em;
  color: #0b2336;
`;
  
export default Login;
  