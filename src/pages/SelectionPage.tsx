import { observer } from "mobx-react";
import styled from "styled-components";
import React, { useState } from "react";
import { AppContext } from "../AppContext";
import { CoursesView } from "../views/CoursesView";
import { SubjectsView } from "../views/SubjectsView"; 

interface Props {}

export const SelectionPage = observer(function(props: Props) {
  const { applicationStore } = React.useContext(AppContext);

  return (
      <Container>
        <PageContainer id="subjects">
          <SubjectsView></SubjectsView>
        </PageContainer>
        <PageContainer id="courses">
          <CoursesView></CoursesView>
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
