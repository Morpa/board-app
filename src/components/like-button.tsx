import { ThumbsUpIcon } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Button } from "./button"
import { toggleLike } from "@/http/toggle-like"
import type { ComponentProps } from "react"
import type { z } from "zod"
import type { IssueInteractionsResponseSchema } from "@/api/routes/schemas/issue-interactions"

interface Props extends ComponentProps<"button"> {
  issueId: string
  initialLikes: number
  initialLiked?: boolean
}

type IssueInteractionResponse = z.infer<typeof IssueInteractionsResponseSchema>

export function LikeButton({
  issueId,
  initialLikes,
  initialLiked = false,
  ...props
}: Props) {
  const queryClient = useQueryClient()

  const { mutate: handleToggleLike, isPending } = useMutation({
    mutationFn: () => toggleLike({ issueId }),
    onMutate: async () => {
      const previousData = queryClient.getQueryData<IssueInteractionResponse>([
        "issue-likes",
        issueId,
      ])

      queryClient.setQueryData<IssueInteractionResponse>(
        ["issue-likes", issueId],
        (old) => {
          if (!old) {
            return undefined
          }

          return {
            ...old,
            interactions: old.interactions.map((interaction) => {
              if (interaction.issueId === issueId) {
                return {
                  ...interaction,
                  isLiked: !interaction.isLiked,
                  likesCount: interaction.isLiked
                    ? interaction.likesCount - 1
                    : interaction.likesCount + 1,
                }
              }

              return interaction
            }),
          }
        },
      )

      return { previousData }
    },
    onError: async (_err, _params, context) => {
      if (context?.previousData) {
        queryClient.setQueryData<IssueInteractionResponse>(
          ["issue-likes", issueId],
          context.previousData,
        )
      }
    },
  })

  const liked = initialLiked

  return (
    <Button
      {...props}
      data-liked={liked}
      className="data-[liked=true]:bg-indigo-600 data-[liked=true]:hover:bg-indigo-500 data-[liked=true]:text-white"
      aria-label={liked ? "Unlike" : "Like"}
      onClick={() => handleToggleLike()}
      disabled={isPending}
    >
      <ThumbsUpIcon className="size-3" />
      <span className="text-sm">{initialLikes}</span>
    </Button>
  )
}
