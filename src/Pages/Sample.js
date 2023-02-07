import Workspace from "../components/Workspace";
import { mockWorkspaces, mockTasks } from "./testData";

const Sample = () => {
  return (
    <Workspace workspaceData={mockWorkspaces} taskData={mockTasks}></Workspace>
  );
};

export default Sample;
