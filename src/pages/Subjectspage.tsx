import { observer } from "mobx-react";
import React, { useState } from "react";
import { AppContext } from "../AppContext";
import styled from "styled-components";

interface Props {}

export const Subjectspage = observer(function(props: Props) {
    const { applicationStore } = React.useContext(AppContext);
    const subjects = applicationStore.subjects;
    
    // Generate a list with a checkbox beside each item in the subjects array
    const subjectItems = subjects.map(subject => {

    });

    return (
        <div>
        </div>
    );
});

const SubjectText = styled.div`
    font-size: 1.5em;
    font-weight: bold;
    margin-bottom: 0.5em;
`