import React, { useState } from "react";
import { useAuthCheck } from "../../Hooks/useAuthCheck";
import RenderProjects from "../projects/renderer/ProjectRenderer";
import { useNavigate } from "react-router-dom";

import Grid from "../../assets/grid.svg";
import Flex from "../../assets/flex.svg";

const Dashboard: React.FC = React.memo(() => {
  const isAuthenticated = useAuthCheck();
  const navigate = useNavigate();
  const [lIndex, setlIndex] = useState<number>(0);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return (
    <section className="w-full h-full px-10 py-5 bg-gray-100">
      {isAuthenticated ? (
        <>
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-[1.7rem] font-md text-opacity-75 font-[Poppins]">
                Dashboard
              </h2>
              <p className="font-[Roboto]">Welcome back!</p>
            </div>
            <button
              onClick={() => navigate("/project/create-project")}
              className="rounded-2xl bg-emerald-500  hover:bg-emerald-600 px-4 shadow-sm hover:shadow-md h-10"
            >
              create project
            </button>
          </div>
          <div>
            <div className="flex justify-between items-center mt-4">
              <h4 className="font-[Poppins] text-[1.6rem]">Recent Projects</h4>
              <button onClick={() => setlIndex((n) => (n === 0 ? 1 : 0))}>
                {lIndex === 1 ? (
                  <img src={Grid} alt="grid view icon" />
                ) : (
                  <img src={Flex} alt="flex view icon" />
                )}
              </button>
            </div>
            
              <RenderProjects lIndex={lIndex}/>
            
          </div>
        </>
      ) : (
        <div className="w-1/2 h-1/2 flex justify-center items-center">
          Redirecting...
        </div>
      )}
    </section>
  );
});

export default Dashboard;
