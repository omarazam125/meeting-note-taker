import { createClient } from "@/lib/supabase/server"
import type { Meeting, MeetingDetail, Segment, Speaker, Task, TimelineEvent } from "@/lib/types"

export async function getMeetings(): Promise<Meeting[]> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return []

  const { data, error } = await supabase
    .from("meetings")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (error) {
    console.log("[v0] getMeetings error:", error.message)
    return []
  }
  return (data ?? []) as Meeting[]
}

export async function getMeetingDetail(id: string): Promise<MeetingDetail | null> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null

  const { data: meeting, error } = await supabase
    .from("meetings")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single()

  if (error || !meeting) {
    console.log("[v0] getMeetingDetail error:", error?.message)
    return null
  }

  const [{ data: speakers }, { data: segments }, { data: timeline }, { data: tasks }] = await Promise.all([
    supabase.from("speakers").select("*").eq("meeting_id", id).order("talk_seconds", { ascending: false }),
    supabase.from("segments").select("*").eq("meeting_id", id).order("start_seconds", { ascending: true }),
    supabase.from("timeline_events").select("*").eq("meeting_id", id).order("timestamp_seconds", { ascending: true }),
    supabase.from("tasks").select("*").eq("meeting_id", id).order("created_at", { ascending: true }),
  ])

  return {
    meeting: meeting as Meeting,
    speakers: (speakers ?? []) as Speaker[],
    segments: (segments ?? []) as Segment[],
    timeline: (timeline ?? []) as TimelineEvent[],
    tasks: (tasks ?? []) as Task[],
  }
}
