import React from "react";
import { Outlet } from "react-router-dom";

const Auth: React.FC = React.memo(() => {
  return <Outlet />;
});

export default Auth;
