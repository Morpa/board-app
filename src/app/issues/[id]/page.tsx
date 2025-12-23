import { getIssue } from "@/http/get-issue"
import type { Metadata } from "next"
interface Props {
    params: Promise<{ id: string }>
}

export const generateMetadata = async ({
    params,
}: Props): Promise<Metadata> => {
    const { id } = await params
    const issue = await getIssue({ id })
    return {
        title: `Issue ${issue.title}`,
    }
}

export default async function IssuePage({ params }: Props) {
    const { id } = await params

    const issue = await getIssue({ id })

    return (
        <div>
            <pre>{JSON.stringify(issue, null, 2)}</pre>
        </div>
    )
}
