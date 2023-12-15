import { Outlet } from "@remix-run/react";

export default function SCMDashboardRoute() {
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
}