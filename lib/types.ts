export type MeetingStatus = "processing" | "ready" | "failed"
export type MeetingSource = "upload" | "record"
export type TaskPriority = "low" | "medium" | "high"
export type TaskStatus = "open" | "done"
export type TimelineCategory = "discussion" | "decision" | "action" | "question"

export type Meeting = {
  id: string
  user_id: string
  title: string
  description: string | null
  language: string
  source: MeetingSource
  status: MeetingStatus
  duration_seconds: number
  audio_url: string | null
  transcript: string | null
  summary: string | null
  key_points: string[]
  sentiment: string | null
  meeting_date: string
  created_at: string
  updated_at: string
}

export type Speaker = {
  id: string
  meeting_id: string
  user_id: string
  label: string
  display_name: string | null
  color: string | null
  talk_seconds: number
  created_at: string
}

export type Segment = {
  id: string
  meeting_id: string
  user_id: string
  speaker_label: string | null
  start_seconds: number
  end_seconds: number
  text: string
  created_at: string
}

export type TimelineEvent = {
  id: string
  meeting_id: string
  user_id: string
  timestamp_seconds: number
  title: string
  description: string | null
  category: TimelineCategory
  created_at: string
}

export type Task = {
  id: string
  meeting_id: string
  user_id: string
  title: string
  assignee: string | null
  due_date: string | null
  priority: TaskPriority
  status: TaskStatus
  created_at: string
}

export type MeetingDetail = {
  meeting: Meeting
  speakers: Speaker[]
  segments: Segment[]
  timeline: TimelineEvent[]
  tasks: Task[]
}
