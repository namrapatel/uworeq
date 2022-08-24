import { observer } from "mobx-react";
import React, { useState } from "react";
import { AppContext } from "../AppContext";
import styled from "styled-components";
import { Course } from "../types";

interface Props {}

export const CoursesPage = observer(function(props: Props) {
    const { applicationStore } = React.useContext(AppContext);
    const courses: Course[] = applicationStore.selectedSubject.courses;
    
    const courseItems = courses.map(course => {
        return (
            <CourseItem key={course.url}>
                <input 
                    onChange={() => applicationStore.handleCourseAdditionOrRemoval(course)}
                    type="checkbox" />
                <span>{course.name}</span>
            </CourseItem>
        );
    });

    return (
        <div>
            {courseItems}
        </div>
    );
});

const CourseItem = styled.div`
    font-size: 1em;
    font-weight: 13;
    margin-bottom: 0.5em;
`