import { Outlet, useParams } from "react-router-dom";

export const Main = () => {
  const { color1 } = useParams();
  console.log("main");
  return (
    <div
      className="main flex align-items justify-content"
      style={{
        backgroundColor: `${color1}`,
      }}
    >
      <Outlet />
    </div>
  );
};
