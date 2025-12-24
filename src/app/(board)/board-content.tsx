"use client"

import { useMemo } from "react"
import { ArchiveIcon, MessageCircleIcon } from "lucide-react"
import { useQuery } from "@tanstack/react-query"

import { Button } from "@/components/button"
import { Card } from "@/components/card"
import { LikeButton } from "@/components/like-button"
import { Section } from "@/components/section"
import { getIssueInteractions } from "@/http/get-issue-interactions"

interface Issue {
  id: string
  issueNumber: number
  title: string
  comments: number
}

interface Props {
  title: string
  issues: Issue[]
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center py-8 text-center">
      <p className="text-sm text-navy-300">{message}</p>
    </div>
  )
}

export function BoardContent({ title, issues }: Props) {
  const allIssuesIds = issues.map((issue) => issue.id)

  const { data: interactionsData, isLoading: isLoadingInteractions } = useQuery(
    {
      queryKey: ["issue-likes", allIssuesIds.sort().join(",")],
      queryFn: () => getIssueInteractions({ issueIds: allIssuesIds }),
    },
  )

  const interactions = useMemo(() => {
    if (!interactionsData) {
      return new Map<
        string,
        {
          isLiked: boolean
          likesCount: number
        }
      >()
    }

    return new Map<
      string,
      {
        isLiked: boolean
        likesCount: number
      }
    >(
      interactionsData.interactions.map((interaction) => [
        interaction.issueId,
        {
          isLiked: interaction.isLiked,
          likesCount: interaction.likesCount,
        },
      ]),
    )
  }, [interactionsData])

  return (
    <Section.Root>
      <Section.Header>
        <Section.Title>
          <ArchiveIcon className="size-3" />
          {title}
        </Section.Title>

        <Section.IssueCount>{issues.length}</Section.IssueCount>
      </Section.Header>

      <Section.Content>
        {issues.length === 0 ? (
          <EmptyState message="No issues in backlog match your filters" />
        ) : (
          issues.map((issue) => {
            const interaction = interactions.get(issue.id)

            return (
              <Card.Root href={`/issues/${issue.id}`} key={issue.id}>
                <Card.Header>
                  <Card.Number>ISS-{issue.issueNumber}</Card.Number>
                  <Card.Title>{issue.title}</Card.Title>
                </Card.Header>

                <Card.Footer>
                  <LikeButton
                    issueId={issue.id}
                    initialLikes={interaction?.likesCount ?? 0}
                    initialLiked={interaction?.isLiked ?? false}
                  />

                  <Button>
                    <MessageCircleIcon className="size-3" />
                    <span className="text-sm">{issue.comments}</span>
                  </Button>
                </Card.Footer>
              </Card.Root>
            )
          })
        )}
      </Section.Content>
    </Section.Root>
  )
}
