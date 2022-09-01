import { observer } from "mobx-react";
import React, { useState } from "react";
import { AppContext } from "../AppContext";
import styled from "styled-components";
import { SubjectsPage } from "./SubjectsPage"; 
import { CoursesPage } from "./CoursesPage";

interface Props {}

export const LandingPage = observer(function(props: Props) {
  const { applicationStore } = React.useContext(AppContext);

  return (
      <Container>
       
      </Container>
  );
});

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;
