import { useParams } from "react-router-dom";

export const Step2 = () => {
  const { color3 } = useParams();
  console.log("step2");
  console.log("step2");

  return (
    <div
    className="step2 flex align-items justify-content"
      style={{
        backgroundColor: `${color3}`,
      }}
    >

    </div>
  );
};
