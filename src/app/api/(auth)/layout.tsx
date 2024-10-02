import { ReactNode } from "react";


interface AuthLayoutProps {
    children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({children}) =>{
    return(
        <div className="bg-slate-200 rounded-md">{children}</div>
    )
};

export default AuthLayout;