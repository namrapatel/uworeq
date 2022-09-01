import { observer } from "mobx-react";
import React, { useState } from "react";
import { AppContext } from "../AppContext";
import styled from "styled-components";
import { SubjectsView } from "../views/SubjectsView"; 
import { CoursesView } from "../views/CoursesView";

interface Props {}

export const SelectionPage = observer(function(props: Props) {
  const { applicationStore } = React.useContext(AppContext);

  return (
      <Container>
        <PageContainer id="subjects">
          <SubjectsView></SubjectsView>
        </PageContainer>
        <PageContainer id="courses">
          <SubjectsView></SubjectsView>
        </PageContainer>
        <PageContainer id="results"></PageContainer>
      </Container>
  );
});

const PageContainer = styled.div` 
  border: 1px solid #000;
 ` 

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;
