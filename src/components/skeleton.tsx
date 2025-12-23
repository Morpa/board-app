import type { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

interface Props extends ComponentProps<"div"> {}

export function Skeleton({ className, ...props }: Props) {
    return (
        <div
            className={twMerge(
                "bg-navy-700 rounded-lg animate-pulse",
                className,
            )}
            {...props}
        />
    )
}
