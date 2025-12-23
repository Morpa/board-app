"use client"

import { authClient } from "@/lib/auth-client"
import { Loader2Icon, LogInIcon } from "lucide-react"

export function UserButton() {
    const { data: session, isPending } = authClient.useSession()

    async function handleSignin() {
        await authClient.signIn.social({
            provider: "github",
            callbackURL: "/",
        })
    }

    async function handleSignout() {
        await authClient.signOut()
    }

    return (
        <>
            {isPending ? (
                <div className="size-8 rounded-full bg-navy-700 border border-navy-500 flex items-center justify-center">
                    <Loader2Icon className="size-3.5 text-navy-200 animate-spin" />
                </div>
            ) : session?.user ? (
                <button
                    type="button"
                    onClick={handleSignout}
                    className="size-8 rounded-full overflow-hidden cursor-pointer"
                >
                    {/** biome-ignore lint/performance/noImgElement: Github already optimizes images */}
                    <img
                        src={session.user.image ?? ""}
                        alt={session.user.name}
                        className="size-8 rounded-full"
                    />
                </button>
            ) : (
                <button
                    type="button"
                    onClick={handleSignin}
                    className="size-8 rounded-full bg-navy-700 border border-navy-500 flex items-center justify-center hover:bg-navy-600 transition-colors duration-150 cursor-pointer"
                >
                    <LogInIcon className="size-3.5 text-navy-200" />
                </button>
            )}
        </>
    )
}
