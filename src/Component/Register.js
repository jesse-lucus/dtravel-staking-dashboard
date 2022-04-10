import React, { useState, useEffect } from "react";
import { createBrowserHistory } from 'history'
import { useNavigate } from "react-router-dom";
import { Box, Modal, TextField, Link } from "@material-ui/core";
import styled from "styled-components";
import CustomButton from "../elements/buttons";
import { TailSpin } from "react-loader-spinner";
import { LogoRoundedIcon } from "../elements/icons";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import { NotificationContainer, NotificationManager } from "react-notifications";
import { API } from '../helpers/api';

const Register = () => {
    const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    let navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordconfirm, setPasswordConfirm] = useState('');
    const [lastname, setLastName] = useState('');
    const [firstname, setFirstName] = useState('');
    const [flag_spin_load_free, set_spin_load_free] = useState(false);

    const register_hander = async () => {
        if(!email.match(regexp)){
            NotificationManager.error("Email Address is Invalid", "Hi.", 3000); 
            return;
        }
        if(password.length < 6) {
            window.alert("Invalid password!"); 
            return;
        }
        if(lastname.length <= 0 && firstname.length <= 0) {
            window.alert("Invalid name!"); 
            return;
        }
        if(password != passwordconfirm){
            window.alert("Confirm password again!");
            return;
        }

        const res = await API.register(firstname, lastname, email, password);
        if(res.message == "Registration Success.") navigate("/login"); 
        else window.alert(res.message);
    }

    const themeLight = createTheme({
        palette: {
          background: {
            default: "#e4f0e2"
          }
        }
      });
  
    return (
        <MuiThemeProvider theme={themeLight}>
            <Box justify-content= {"space-around"}>
                <StyledComponent sx={{ marginTop: { xs: "64px", sm: "80px" } }}>
                    <MainPart>
                        <Box display={"grid"} width={"420px"} alignContent={"center"}>
                            <Box margin={"10px"}>
                                <TitleText01>
                                <LogoRoundedIcon size="32px" />
                                    {"\u00a0"}
                                    {"\u00a0"}Register
                                </TitleText01>
                            </Box>
                            <Box display={"grid"}>
                                <Box display={"flex"}>
                                    <LeftText01>LastName: </LeftText01>
                                    <TextField
                                    margin="normal"
                                    required
                                    id="lastname"
                                    name="lastname"
                                    variant="standard"
                                    autoFocus
                                    onChange={event => {const { value } = event.target; setLastName(value)}}
                                    />
                                </Box>
                                <Box display={"flex"}>
                                    <LeftText01>FirstName: </LeftText01>
                                    <TextField
                                    margin="normal"
                                    required
                                    id="firstname"
                                    name="firstname"
                                    variant="standard"
                                    autoFocus
                                    onChange={event => {const { value } = event.target; setFirstName(value)}}
                                    />
                                </Box>                                
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
                                <Box display={"flex"}>
                                    <LeftText01>Confirm Password: </LeftText01>
                                    <TextField
                                    margin="normal"
                                    required
                                    name="password_confirm"
                                    type="password"
                                    id="password_confirm"
                                    variant="standard"
                                    autoComplete="current-password"
                                    onChange={event => {const { value } = event.target; setPasswordConfirm(value)}}
                                    />                                    
                                </Box>
                            </Box>
                            <Box
                                display={"flex"}
                                width={"100%"}
                                marginTop={"5%"}
                                onClick={() => {
                                if (flag_spin_load_free === true) {
                                    NotificationManager.error("Please wait while processing.", "Hi.", 2000);
                                    return;
                                }
                                    register_hander();
                                }}
                            >
                                {flag_spin_load_free ? (
                                <Box display={"flex"} position={"absolute"} left={"50%"} justifyContent={"center"} alignItems={"center"} top="-150%">
                                    <TailSpin color="#05070c" height={35} width={35} />
                                </Box>
                                ) : (
                                <></>
                                )}
                                <CustomButton str={"REGISTER"} width={"100%"} height={"56px"} color={"#D4EEE9"} bgcolor={"#0B2336"} fsize={"16px"} fweight={"400"} bradius={"100px"} />
                            </Box>
                            <Box display={"flex"} justifyContent={"center"}>
                                <Box margin={"10px"}>
                                    <Link href="/login" variant="body2">
                                        {"Already have an account? Sign in"}
                                    </Link>                                
                                </Box>
                            </Box>                            
                        </Box>
                    </MainPart>
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
  
export default Register;
  