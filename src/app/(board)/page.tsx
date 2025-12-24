import { listIssues } from "@/http/list-issues"
import type { Metadata } from "next"
import { BoardContent } from "./board-content"

export const metadata: Metadata = {
  title: "Board",
}

interface Props {
  searchParams: Promise<{ q: string }>
}

export default async function Board({ searchParams }: Props) {
  const { q } = await searchParams
  const issues = await listIssues({ search: q })

  return (
    <main className="grid grid-cols-4 gap-5 flex-1 items-stretch">
      <BoardContent title="Backlog" issues={issues.backlog} />

      <BoardContent title="To-do" issues={issues.todo} />

      <BoardContent title="In Progress" issues={issues.in_progress} />

      <BoardContent title="Done" issues={issues.done} />
    </main>
  )
}
