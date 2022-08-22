import { observer } from "mobx-react";
import * as React from "react";
import { AppContext } from "../AppContext";

interface Props {}

export const Homepage = observer(function(props: Props) {
  const { applicationStore } = React.useContext(AppContext);

  // Create a ReactElement for each Subject in the applicationStore.subjects array
  const subjects = applicationStore.subjects.map(subject => {
    return <li key={subject.name}>{subject.name}</li>;
  }).reverse();



  // return a list item for each subject
  // const subjectList: JSX.IntrinsicElements = applicationStore.subjects.forEach(subject => {
  //   return (
  //     <li key={subject.name}>
  //       <a href={subject.url}>{subject.name}</a>
  //     </li>
  //   );
  // });
    
  return (
    <div>
      <h1>Homepage</h1>
      {subjects}
    </div>
  );


});