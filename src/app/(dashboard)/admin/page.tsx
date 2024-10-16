'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // If the user is not authenticated, redirect them to the sign-in page
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/signin");
    }
  }, [status, router]);

  // Optionally, you can show a loading state while the session is being checked
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // If the user is authenticated, show the dashboard content
  return (
    <div>Welcome to the dashboard, {session?.user?.email}!</div>
  );
};

export default Dashboard;

