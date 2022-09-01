import { observer } from "mobx-react";
import styled from "styled-components";
import React, { useState } from "react";
import { AppContext } from "../AppContext";
import { CoursesView } from "../views/CoursesView";
import { SubjectsView } from "../views/SubjectsView"; 

interface Props {}

export const LandingPage = observer(function(props: Props) {
  const { applicationStore, uiStateStore } = React.useContext(AppContext);

  return (
      <Container>
        <Button onClick={() => {uiStateStore.setPage("SelectionPage")}}>Go to SelectionPage</Button>
      </Container>
  );
});

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const Button = styled.button`
`;
