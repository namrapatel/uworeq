import { observer } from "mobx-react";
import React, { useState } from "react";
import { AppContext } from "../AppContext";
import styled from "styled-components";
import { SubjectsPage } from "./SubjectsPage"; 
import { CoursesPage } from "./CoursesPage";

interface Props {}

export const SelectionPage = observer(function(props: Props) {
  const { applicationStore } = React.useContext(AppContext);

  return (
      <Container>
        <PageContainer id="subjects">
          <SubjectsPage></SubjectsPage>
        </PageContainer>
        <PageContainer id="courses">
          <CoursesPage></CoursesPage>
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
