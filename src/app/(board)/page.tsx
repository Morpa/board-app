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

export default async function Board({ searchParams }: Props) {
    const { q } = await searchParams

    const issues = await listIssues()

    return (
        <main className="grid grid-cols-4 gap-5 flex-1 items-stretch">
            <Section.Root>
                <Section.Header>
                    <Section.Title>
                        <ArchiveIcon className="size-3" />
                        Backlog
                    </Section.Title>

                    <Section.IssueCount>
                        {issues.backlog.length}
                    </Section.IssueCount>
                </Section.Header>

                {/* Content */}
                <Section.Content>
                    {issues.backlog.map((issue) => (
                        <Card.Root key={issue.id}>
                            <Card.Header>
                                <Card.Number>
                                    ISS-{issue.issueNumber}
                                </Card.Number>
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
                    ))}
                </Section.Content>
            </Section.Root>

            <Section.Root>
                <Section.Header>
                    <Section.Title>
                        <ArchiveIcon className="size-3" />
                        To-do
                    </Section.Title>

                    <Section.IssueCount>
                        {issues.todo.length}
                    </Section.IssueCount>
                </Section.Header>

                {/* Content */}
                <Section.Content>
                    {issues.todo.map((todo) => (
                        <Card.Root key={todo.id}>
                            <Card.Header>
                                <Card.Number>
                                    ISS-{todo.issueNumber}
                                </Card.Number>
                                <Card.Title>{todo.title}</Card.Title>
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
                    ))}
                </Section.Content>
            </Section.Root>

            <Section.Root>
                <Section.Header>
                    <Section.Title>
                        <ArchiveIcon className="size-3" />
                        In Progress
                    </Section.Title>

                    <Section.IssueCount>
                        {issues.in_progress.length}
                    </Section.IssueCount>
                </Section.Header>

                {/* Content */}
                <Section.Content>
                    {issues.in_progress.map((in_progress) => (
                        <Card.Root key={in_progress.id}>
                            <Card.Header>
                                <Card.Number>
                                    ISS-{in_progress.issueNumber}
                                </Card.Number>
                                <Card.Title>{in_progress.title}</Card.Title>
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
                    ))}
                </Section.Content>
            </Section.Root>

            <Section.Root>
                <Section.Header>
                    <Section.Title>
                        <ArchiveIcon className="size-3" />
                        Done
                    </Section.Title>

                    <Section.IssueCount>
                        {issues.done.length}
                    </Section.IssueCount>
                </Section.Header>

                {/* Content */}
                <Section.Content>
                    {issues.done.map((done) => (
                        <Card.Root key={done.id}>
                            <Card.Header>
                                <Card.Number>
                                    ISS-{done.issueNumber}
                                </Card.Number>
                                <Card.Title>{done.title}</Card.Title>
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
                    ))}
                </Section.Content>
            </Section.Root>
        </main>
    )
}
