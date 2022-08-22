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
    

  return (
      <div>
        {subjects}
      </div>
  );
});