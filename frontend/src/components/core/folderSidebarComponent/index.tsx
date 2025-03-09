import { useLocation } from "react-router-dom";
import { FolderType } from "../../../pages/MainPage/entities";
import SideBarFoldersButtonsComponent from "./components/sideBarFolderButtons";

type SidebarNavProps = {
  handleChangeFolder?: (id: string) => void;
  handleDeleteFolder?: (item: FolderType) => void;
  className?: string;
};

export default function FolderSidebarNav({
  className,
  handleChangeFolder,
  handleDeleteFolder,
  ...props
}: SidebarNavProps) {
  const location = useLocation();

  return <>
    <h1>folder sidebar main page</h1>
    <SideBarFoldersButtonsComponent
      handleChangeFolder={handleChangeFolder}
      handleDeleteFolder={handleDeleteFolder}
    />
    </>
}
