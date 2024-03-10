import { Navigate, Outlet, useParams } from "react-router-dom";
import { Note } from "../../types";

interface LayoutProps {
  notes: Note[];
}

const Layout = ({ notes }: LayoutProps) => {
  // get id from url
  const { id } = useParams();
  // find the matching note
  const found = notes.find((note) => note.id === id);
  // if note not found direct to mainPage
  if (!found) return <Navigate to={"/"} replace />;
  // send note to the route
  return <Outlet context={found} />;
};

export default Layout;
