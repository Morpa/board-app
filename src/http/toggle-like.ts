import { LikeResponseSchema } from "@/api/routes/schemas/issue-likes"
import { clientEnv } from "@/env"

interface Props {
  issueId: string
}

export async function toggleLike({ issueId }: Props) {
  const url = new URL(
    `/api/issues/${issueId}/like`,
    clientEnv.NEXT_PUBLIC_API_URL,
  )

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
  const data = await response.json()
  return LikeResponseSchema.parse(data)
}
