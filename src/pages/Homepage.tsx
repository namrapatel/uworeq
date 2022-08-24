import { observer } from "mobx-react";
import React, { useState } from "react";
import { AppContext } from "../AppContext";
import styled from "styled-components";
import { SubjectsPage } from "./SubjectsPage"; 

interface Props {}

export const HomePage = observer(function(props: Props) {
  const { applicationStore } = React.useContext(AppContext);

  return (
      <div>
        <PageContainer id="subjects">
          <SubjectsPage></SubjectsPage>
        </PageContainer>
        <PageContainer id="courses"></PageContainer>
        <PageContainer id="results"></PageContainer>
      </div>
  );
});

const PageContainer = styled.div`
  height: 100%;
  width: 33%;
  border: 1px solid black;
 ` 
