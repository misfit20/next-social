"use client"

import { signOut } from "next-auth/react";
import React from "react";
import { Button } from "./button";
import { redirect } from "next/navigation";


const UserAccount = () => {
    return (
        <div>
            <Button onClick={ () => signOut({
                redirect: true,
                callbackUrl: `${window.location.origin}/api/signin`,
            })
        }
            >
                Sign Out
                </Button>
        </div>
    )
}

export default UserAccount;