import SignInPage from "@/app/api/(auth)/signin/page";
import { authOptions } from "@/lib/authOptions"
import { getServerSession } from "next-auth"


const page = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    return(
      <h2>DashBoard - Welcome to the Dashboard, {session?.user.username}!</h2>
    )
  }
  return(
    <SignInPage/>
  )
};

export default page;