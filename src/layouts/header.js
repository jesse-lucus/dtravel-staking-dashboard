import { Box } from "@material-ui/core";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { BiExit } from "react-icons/bi";
import { LogoIcon, LogoRoundedIcon, ListIcon } from "../elements/icons";

const Header = () => {
    let navigate = useNavigate();
    return (
        <>
                <LogoIcon size={"40px"} color="#0B2336" />
                <Box fontSize={"20px"}>TRVL APR DASHBOARD</Box>
            {/* <StyledComponent>

                <Mark
                display={"flex"}
                alignItems={"center"}
                gridGap={"10px"}
                onClick={() => {
                    navigate("/");
                    window.scrollTo(0, 0);
                    // set_current_tab(0);
                }}
                >

                </Mark>
            </StyledComponent> */}
        </>
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