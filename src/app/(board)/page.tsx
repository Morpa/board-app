import { Button } from "@/components/button"
import { Card } from "@/components/card"
import { Section } from "@/components/section"
import { listIssues } from "@/http/list-issues"
import { ArchiveIcon, MessageCircleIcon, ThumbsUpIcon } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Board",
}

interface Props {
  searchParams: Promise<{ q: string }>
}

interface Issue {
  id: string
  issueNumber: number
  title: string
}

interface BoardSectionProps {
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

function BoardSection({ title, issues }: BoardSectionProps) {
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
          issues.map((issue) => (
            <Card.Root href={`/issues/${issue.id}`} key={issue.id}>
              <Card.Header>
                <Card.Number>ISS-{issue.issueNumber}</Card.Number>
                <Card.Title>{issue.title}</Card.Title>
              </Card.Header>

              <Card.Footer>
                <Button className="text-navy-100 flex items-center gap-2 rounded-lg px-2.5 py-1 bg-navy-600 cursor-pointer">
                  <ThumbsUpIcon className="size-3" />
                  <span className="text-sm">12</span>
                </Button>

                <Button>
                  <MessageCircleIcon className="size-3" />
                  <span className="text-sm">3</span>
                </Button>
              </Card.Footer>
            </Card.Root>
          ))
        )}
      </Section.Content>
    </Section.Root>
  )
}

export default async function Board({ searchParams }: Props) {
  const { q } = await searchParams
  const issues = await listIssues({ search: q })

  return (
    <main className="grid grid-cols-4 gap-5 flex-1 items-stretch">
      <BoardSection title="Backlog" issues={issues.backlog} />

      <BoardSection title="To-do" issues={issues.todo} />

      <BoardSection title="In Progress" issues={issues.in_progress} />

      <BoardSection title="Done" issues={issues.done} />
    </main>
  )
}
