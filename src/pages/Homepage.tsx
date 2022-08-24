import { observer } from "mobx-react";
import React, { useState } from "react";
import { AppContext } from "../AppContext";
import styled from "styled-components";

interface Props {}

export const Homepage = observer(function(props: Props) {
  const { applicationStore } = React.useContext(AppContext);
  const [buttonText, setButtonText] = useState("All subjects")
  const subjects = applicationStore.subjects;

  // Generate a DropdownItem for each subject in the subjects array
  const subjectItems = subjects.map(subject => {
    return (
      <DropdownItem key={subject.name} onClick={() => {
        setButtonText(subject.name);
        applicationStore.setSelectedSubject(subject);
      } }>{subject.name}</DropdownItem>
    );
  });

  return (
      <div>
        <DropdownButton>{buttonText}</DropdownButton>
        <DropdownMenu>
          {subjectItems}
        </DropdownMenu>
      </div>
  );
});

const DropdownButton = styled.button`
`

const DropdownMenu = styled.div`
`

const DropdownItem = styled.button`
`
