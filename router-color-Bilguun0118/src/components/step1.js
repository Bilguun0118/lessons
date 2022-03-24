import { Outlet, useParams } from "react-router-dom";

export const Step1 = () => {
  const { color2 } = useParams();
  console.log("step1");

  return (
    <div
    className="step1 flex align-items justify-content"
      style={{
        backgroundColor: `${color2}`,
      }}
    >
      <Outlet />
    </div>
  );
};
