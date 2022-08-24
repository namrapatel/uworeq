import { observer } from "mobx-react";
import React, { useState } from "react";
import { AppContext } from "../AppContext";
import styled from "styled-components";
import { Subject } from "../types";

interface Props {}

export const CoursesPage = observer(function(props: Props) {
    const { applicationStore } = React.useContext(AppContext);
    const subjects = applicationStore.subjects;

    const handleCheck = (subject: Subject) => {
        if (applicationStore.selectedSubject === subject) {
            return true;
        } else {
            return false;
        }
    }
    
    // Generate a list with a checkbox beside each item in the subjects array
    const subjectItems = subjects.map(subject => {
        return (
            <SubjectItem key={subject.name}>
                <input 
                    onChange={() => applicationStore.setSelectedSubject(subject)}
                    type="radio"
                    checked={handleCheck(subject)} />
                <span>{subject.name}</span>
            </SubjectItem>
        );
    });

    return (
        <div>
            {subjectItems}
        </div>
    );
});

const SubjectItem = styled.div`
    font-size: 1em;
    font-weight: 13;
    margin-bottom: 0.5em;
`