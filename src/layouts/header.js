import { Box } from "@material-ui/core";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import CustomButton from "../elements/buttons";
import { LogoIcon, LogoRoundedIcon, ListIcon } from "../elements/icons";




const Header = () => {
  const [username, setUsername] = useState(null);
  const [header, setHeader] = useState(false);
  let navigate = useNavigate();

    useEffect(() => {
      const getUserdata = async() =>{
        let user = await JSON.parse(localStorage.getItem('user'));
        if(user.email) {setUsername(user.firstName + user.lastName); setHeader(true);}
        else setHeader(false);
      }
      getUserdata();
    }, [navigate]);
    
    const logout_handler = () => {
      localStorage.removeItem('user');
      navigate('/');
      setHeader(false);
    }

    if (header) return (
        <StyledComponent>
            <Mark
            display={"flex"}
            alignItems={"center"}
            gridGap={"10px"}
            onClick={() => {
                navigate("/dashboard");
                window.scrollTo(0, 0);
            }}
            >
            </Mark>
            <LogoIcon size={"40px"} color="#0B2336" />
            <Box fontSize={"20px"}>DASHBOARD</Box>       
            <Box display={"flex"} flex="1" alignItems={"center"} width={"100%"} justifyContent={"flex-end"}>
              <Box
                  display={"flex"}
                  justifyContent={"flex-end"}
                  width={"100%"}
                  onClick={() => {
                      logout_handler();
                  }}
              >
                  <CustomButton str={"LOGOUT"} width={"120px"} height={"56px"} color={"#D4EEE9"} bgcolor={"#0B2336"} fsize={"16px"} fweight={"400"} bradius={"100px"}></CustomButton>
              </Box>  
            </Box>           
        </StyledComponent>
    )

};

const StyledComponent = styled(Box)`
  position: relative;
  display: flex;
  align-items: center;
  grid-gap: 56px;
  width: 100%;
  /* height: 150px; */
  padding: 16px 0px;
  border-bottom: 1px solid #0b2336;
`;

const Mark = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 38px;
  line-height: 32px;
  color: #0b2336;
  &:hover {
    cursor: pointer;
  }
`;

export default Header;