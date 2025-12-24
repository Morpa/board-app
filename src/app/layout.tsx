import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import "./globals.css"
import { ReactQueryProvider } from "@/lib/react-query"

export const metadata: Metadata = {
    title: {
        template: "%s | Product Roadmap",
        default: "Product Roadmap",
    },
    description: "Follow the development progress of our entire platform.",
}

const montserrat = Montserrat({ subsets: ["latin"] })

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" className={montserrat.className}>
            <body className="bg-navy-950 text-navy-50 antialiased">
                <ReactQueryProvider>
                    <NuqsAdapter>{children}</NuqsAdapter>
                </ReactQueryProvider>
            </body>
        </html>
    )
}
