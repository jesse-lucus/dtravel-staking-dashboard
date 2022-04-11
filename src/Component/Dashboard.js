import React, { useState, useEffect } from "react";
import { createBrowserHistory } from 'history'
import { useNavigate } from "react-router-dom";
import { Box, Modal, TextField, Link } from "@material-ui/core";
import styled from "styled-components";
import CustomButton from "../elements/buttons";
import { TailSpin } from "react-loader-spinner";
import { LogoRoundedIcon } from "../elements/icons";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import { GiCancel } from "react-icons/gi";
import { NotificationContainer, NotificationManager } from "react-notifications";
import Cookies from 'universal-cookie';
import { API } from '../helpers/api'

const Dashboard = () => {
    let navigate = useNavigate();

    const [flag_spin_load_free, set_spin_load_free] = useState(false);
    const [email, setEmail] = useState(null);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(0);
    const [title, setTitle] = useState('TRVL APR');
    const [trvl, setTRVL] = useState(0);
    const [lptrvl, setLPTRVL] = useState(0);
    const [freetrvl, setFTRVL] = useState(0);
    const [modal, setModal] = useState(0);
    const handleClose = () => setOpen(false);



    useEffect(() => {
        get_apr();
        get_email();
      }, [open]);

    const get_email = async () => {
        let user = await JSON.parse(localStorage.getItem('user'));
        if(!user) navigate("/"); 
        let user_email = user.email;
        setEmail(user_email);
    }
    
    const get_apr = async () => {
        const res = await API.getAPR();
        if(res.message == "Operation success")
        {
            setTRVL(parseInt(res.data.trvlStaking));
            setLPTRVL(parseInt(res.data.lpTrvlStaking));
            setFTRVL(parseInt(res.data.freeTrvlStaking));
        }
    }

    const update_apr = async () => {
        const stakingTypes = ["trvlStaking", "lpTrvlStaking", "freeTrvlStaking"];
        const token = localStorage.getItem("token");
        API.setAPR(stakingTypes[modal], value);
        setOpen(false);
        get_apr();
    }

    const themeLight = createTheme({
        palette: {
          background: {
            default: "#e4f0e2"
          }
        }
      });
  
    return (
        <>
        {email && 
        <>
            <MuiThemeProvider theme={themeLight}>
                <Box justify-content= {"space-around"}>
                    <StyledComponent sx={{ marginTop: { xs: "64px", sm: "80px" } }}>
                        <MainPart>
                            <Box display={"grid"} width={"800px"} alignContent={"center"}>
                                <Box margin={"10px"}>
                                    <TitleText01>
                                    <LogoRoundedIcon size="32px" />
                                        {"\u00a0"}
                                        {"\u00a0"}Dashboard
                                    </TitleText01>
                                </Box>
                                <Box marginTop={"10%"}>
                                    <Row01 sx={{ display: { xs: "none", sm: "none", md: "flex" } }}>
                                        <Box display={"flex"} flex="1.4" alignItems={"center"}>
                                            Name
                                        </Box>
                                        <Box display={"flex"} flex="1.6" alignItems={"center"} justifyContent={""}>
                                            APR Value
                                        </Box>
                                        <Box display={"flex"} flex="1" alignItems={"center"} justifyContent={"flex-end"}></Box>
                                    </Row01>
                                    <Row02 sx={{ flexDirection: { xs: "column", sm: "column", md: "row" } }}>
                                        <Box display={"flex"} flex="1.4" alignItems={"center"} justifyContent={"space-between"}>
                                        <Box sx={{ display: { xs: "flex", sm: "flex", md: "none" } }}>Name</Box>
                                        <Box mr={"8px"}  display={"flex"} alignItems={"center"}>
                                            <Box mr={"8px"}><LogoRoundedIcon size="24px" /></Box>
                                            <Box>TRVL APR</Box>
                                        </Box>
                                        </Box>
                                        <Box display={"flex"} flex="1.6" alignItems={"center"} justifyContent={"space-between"}>
                                        <Box sx={{ display: { xs: "flex", sm: "flex", md: "none" } }}>APR Value</Box>
                                            <Box display={"flex"} flex="1" alignItems={"center"} justifyContent={""}>
                                                {trvl}<PercentageText>%</PercentageText></Box>
                                        </Box>
                                        <Box display={"flex"} flex="1" alignItems={"center"} width={"100%"} justifyContent={"flex-end"}>
                                            <Box
                                                display={"1"}
                                                width={"100%"}
                                                onClick={() => {
                                                    setModal(0);
                                                    setValue(trvl);
                                                    setTitle("TRVL APR");
                                                    setOpen(true);
                                                }}
                                            >
                                                <CustomButton str={"Edit"} width={"80%"} height={"56px"} color={"#D4EEE9"} bgcolor={"#0B2336"} fsize={"16px"} fweight={"400"} bradius={"100px"}></CustomButton>
                                            </Box>
                                        </Box>
                                    </Row02>
                                    <Row02 sx={{ flexDirection: { xs: "column", sm: "column", md: "row" } }}>
                                        <Box display={"flex"} flex="1.4" alignItems={"center"} justifyContent={"space-between"}>
                                        <Box sx={{ display: { xs: "flex", sm: "flex", md: "none" } }}>Name</Box>
                                        <Box mr={"8px"}  display={"flex"} alignItems={"center"}>
                                            <Box mr={"8px"}><LogoRoundedIcon size="24px" /></Box>
                                            <Box>LP TRVL ARP</Box>
                                        </Box>
                                        </Box>
                                        <Box display={"flex"} flex="1.6" alignItems={"center"} justifyContent={"space-between"}>
                                        <Box sx={{ display: { xs: "flex", sm: "flex", md: "none" } }}>APR Value</Box>
                                        <Box display={"flex"} flex="1" alignItems={"center"} justifyContent={""}>
                                                {lptrvl}<PercentageText>%</PercentageText></Box>
                                        </Box>
                                        <Box display={"flex"} flex="1" alignItems={"center"} width={"100%"} justifyContent={"flex-end"}>
                                            <Box
                                                display={"1"}
                                                width={"100%"}
                                                onClick={() => {
                                                    setModal(1);
                                                    setValue(lptrvl);
                                                    setTitle("LPTRVL APR");
                                                    setOpen(true);
                                                }}
                                            >
                                                <CustomButton str={"Edit"} width={"80%"} height={"56px"} color={"#D4EEE9"} bgcolor={"#0B2336"} fsize={"16px"} fweight={"400"} bradius={"100px"}></CustomButton>
                                            </Box>
                                        </Box>
                                    </Row02>
                                    <Row02 sx={{ flexDirection: { xs: "column", sm: "column", md: "row" } }}>
                                        <Box display={"flex"} flex="1.4" alignItems={"center"} justifyContent={"space-between"}>
                                        <Box sx={{ display: { xs: "flex", sm: "flex", md: "none" } }}>Name</Box>
                                        <Box mr={"8px"}  display={"flex"} alignItems={"center"}>
                                            <Box mr={"8px"}><LogoRoundedIcon size="24px" /></Box>
                                            <Box>FREE TRVL ARP</Box>
                                        </Box>
                                        </Box>
                                        <Box display={"flex"} flex="1.6" alignItems={"center"} justifyContent={"space-between"}>
                                        <Box sx={{ display: { xs: "flex", sm: "flex", md: "none" } }}>APR Value</Box>
                                            <Box display={"flex"} flex="1" alignItems={"center"} justifyContent={""}>
                                                {freetrvl}<PercentageText>%</PercentageText></Box>
                                            </Box>
                                        <Box display={"flex"} flex="1" alignItems={"center"} width={"100%"} justifyContent={"flex-end"}>
                                            <Box
                                                display={"1"}
                                                width={"100%"}
                                                onClick={() => {
                                                    setModal(2);
                                                    setValue(freetrvl);
                                                    setTitle("FREE TRVL APR");
                                                    setOpen(true);
                                                }}
                                            >
                                                <CustomButton str={"Edit"} width={"80%"} height={"56px"} color={"#D4EEE9"} bgcolor={"#0B2336"} fsize={"16px"} fweight={"400"} bradius={"100px"}></CustomButton>
                                            </Box>
                                        </Box>
                                    </Row02>                                                                                           
                                </Box>                          
                            </Box>
                        </MainPart>
                        <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                            <ModalBox>
                            <CancelBox01
                                onClick={() => {
                                handleClose();
                                set_spin_load_free(false);
                                setValue(0);
                                }}
                            >
                                <GiCancel></GiCancel>
                            </CancelBox01>
                            <TitleText01>
                            <LogoRoundedIcon size="32px" />
                                {"\u00a0"}
                                {"\u00a0"}
                                {title}
                            </TitleText01>
                            <SmText04>APR Value</SmText04>
                            <Box display={"flex"} alignItems={"center"} borderBottom={"1px solid #0b2336"}>
                                <InputAmount
                                component={"input"}
                                width={"100%"}
                                value={value}
                                type={"number"}
                                onChange={(e) => {
                                    if (flag_spin_load_free === true) {
                                    NotificationManager.error("Please wait while processing.", "Hi.", 2000);
                                    return;
                                    }
                                    setValue(e.target.value);
                                }}
                                />
                            </Box>
                            <Box
                                display={"flex"}
                                width={"100%"}
                                marginTop={"5%"}
                                position={"relative"}
                                onClick={() => {
                                if (flag_spin_load_free === true) {
                                    NotificationManager.error("Please wait while processing.", "Hi.", 2000);
                                    return;
                                }
                                update_apr();
                                }}
                            >
                                {flag_spin_load_free ? (
                                <Box display={"flex"} position={"absolute"} left={"50%"} justifyContent={"center"} alignItems={"center"} top="-150%">
                                    <TailSpin color="#05070c" height={35} width={35} />
                                </Box>
                                ) : (
                                <></>
                                )}
                                <CustomButton str={"Update"} width={"100%"} height={"56px"} color={"#D4EEE9"} bgcolor={"#0B2336"} fsize={"16px"} fweight={"400"} bradius={"100px"} />
                            </Box>
                            </ModalBox>
                        </Modal>
                    </StyledComponent>
                </Box>
            </MuiThemeProvider>
        </>}
        </>
    );
  };

const ModalBox = styled(Box)`
    display: flex;
    width: calc(100vw - 32px);
    max-width: 480px;
    box-sizing: border-box;
    flex-direction: column;
    background-color: #d4eee9;
    border: none;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    backdrop-filter: blur(100px) !important;
    border-radius: 24px !important;
    padding: 24px;
    transition: box-shadow 300ms;
    transition: transform 505ms cubic-bezier(0, 0, 0.2, 1) 0ms !important;
    outline: none;
    animation: back_animation1 0.5s 1;
    animation-timing-function: ease;
    animation-fill-mode: forwards;
    @keyframes back_animation1 {
    0% {
        opacity: 0%;
    }
    100% {
        opacity: 100%;
    }
}
`;

const CancelBox01 = styled(Box)`
  display: flex;
  position: absolute;
  right: 5%;
  top: 5%;
  font-size: 30px;
  color: #0b2336;
  opacity: 0.4;
  transition: 0.1s;
  &:hover {
    cursor: pointer;
    transition: 0.3s;
    color: #0b2336;
    opacity: 1;
  }
`;

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

const Row01 = styled(Box)`
  flex: 1;
  width: 100%;
  font-family: "Radio Grotesk";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  /* identical to box height, or 125% */
  letter-spacing: 0.1em;
  text-transform: uppercase;
  /* Main/Text */
  color: #0b2336;
`;

const Row02 = styled(Box)`
  display: flex;
  grid-gap: 16px;
  flex: 1;
  margin-top: 24px;
  width: 100%;
  padding-top: 24px;
  font-family: "Radio Grotesk";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #0b2336;
`;

const PercentageText = styled(Box)`
  font-family: "Reckless Neue";
  font-style: normal;
`

const SmText04 = styled(Box)`
  display: flex;
  width: 100%;
  font-family: "Radio Grotesk";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #0b2336;
  margin-top: 32px;
`;

const InputAmount = styled(Box)`
  display: flex;
  margin-top: 2%;
  height: 40px;
  outline: none;
  font-family: "Radio Grotesk";
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 32px;
  color: #0b2336;
  border: none;
  background: none;
`;
  
export default Dashboard;
  