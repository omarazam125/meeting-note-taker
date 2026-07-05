// All data here is hardcoded mock data for the front-end prototype.
// The backend (Claude Code) will replace these with real Supabase queries.

export type MeetingStatus = 'analyzed' | 'processing' | 'recorded'

export type Meeting = {
  id: string
  title: { en: string; ar: string }
  date: string // ISO
  durationSec: number
  participants: string[]
  status: MeetingStatus
  source: 'live' | 'upload'
}

export type TranscriptLine = {
  id: string
  t: number // seconds from start
  speaker: string
  text: { en: string; ar: string }
}

export type TimelineSegment = {
  id: string
  start: number
  end: number
  title: { en: string; ar: string }
  summary: { en: string; ar: string }
  keyPoints: { en: string[]; ar: string[] }
}

export type Task = {
  id: string
  title: { en: string; ar: string }
  owner: string
  due: string
  priority: 'high' | 'medium' | 'low'
  status: 'open' | 'in-progress' | 'done'
}

export type SpeakerStat = {
  name: string
  talkSec: number
  color: string
}

export const meetings: Meeting[] = [
  {
    id: 'mtg-001',
    title: {
      en: 'Q3 Product Sync',
      ar: 'مزامنة المنتج للربع الثالث',
    },
    date: '2026-07-02T10:00:00Z',
    durationSec: 2730,
    participants: ['Layla', 'Omar', 'Sara', 'Karim'],
    status: 'analyzed',
    source: 'live',
  },
  {
    id: 'mtg-002',
    title: {
      en: 'Marketing Campaign Kickoff',
      ar: 'انطلاقة الحملة التسويقية',
    },
    date: '2026-06-28T13:30:00Z',
    durationSec: 1980,
    participants: ['Nour', 'Yousef', 'Layla'],
    status: 'analyzed',
    source: 'upload',
  },
  {
    id: 'mtg-003',
    title: {
      en: 'Weekly Engineering Standup',
      ar: 'اجتماع الهندسة الأسبوعي',
    },
    date: '2026-07-01T08:15:00Z',
    durationSec: 900,
    participants: ['Omar', 'Karim', 'Hana'],
    status: 'processing',
    source: 'live',
  },
  {
    id: 'mtg-004',
    title: {
      en: 'Client Onboarding — Alfa Corp',
      ar: 'تهيئة العميل — شركة ألفا',
    },
    date: '2026-06-25T15:00:00Z',
    durationSec: 3450,
    participants: ['Sara', 'Nour', 'External: Ahmed', 'External: Dina'],
    status: 'analyzed',
    source: 'live',
  },
  {
    id: 'mtg-005',
    title: {
      en: 'Design Review — Mobile App',
      ar: 'مراجعة التصميم — تطبيق الجوال',
    },
    date: '2026-06-20T11:00:00Z',
    durationSec: 2100,
    participants: ['Hana', 'Layla', 'Yousef'],
    status: 'recorded',
    source: 'upload',
  },
]

export const speakerStats: SpeakerStat[] = [
  { name: 'Layla', talkSec: 820, color: 'var(--chart-1)' },
  { name: 'Omar', talkSec: 610, color: 'var(--chart-2)' },
  { name: 'Sara', talkSec: 540, color: 'var(--chart-3)' },
  { name: 'Karim', talkSec: 760, color: 'var(--chart-4)' },
]

export const timeline: TimelineSegment[] = [
  {
    id: 'seg-1',
    start: 0,
    end: 420,
    title: { en: 'Opening & agenda', ar: 'الافتتاح وجدول الأعمال' },
    summary: {
      en: 'The team aligned on the three goals for the quarter and reviewed the agenda. Layla set the context around the new roadmap.',
      ar: 'اتفق الفريق على الأهداف الثلاثة للربع وراجع جدول الأعمال. وضّحت ليلى السياق حول خارطة الطريق الجديدة.',
    },
    keyPoints: {
      en: ['Three priorities confirmed', 'Roadmap timeline shared'],
      ar: ['تأكيد ثلاث أولويات', 'مشاركة الجدول الزمني لخارطة الطريق'],
    },
  },
  {
    id: 'seg-2',
    start: 420,
    end: 1200,
    title: { en: 'Feature prioritization', ar: 'ترتيب أولويات الميزات' },
    summary: {
      en: 'Debate on whether to ship the analytics dashboard or the notifications system first. Omar argued for analytics based on customer feedback; Sara raised engineering risk.',
      ar: 'نقاش حول إطلاق لوحة التحليلات أو نظام الإشعارات أولاً. دافع عمر عن التحليلات استناداً لملاحظات العملاء، وأثارت سارة مخاطر هندسية.',
    },
    keyPoints: {
      en: [
        'Analytics dashboard chosen for Q3',
        'Notifications moved to Q4',
        'Engineering risk flagged on data pipeline',
      ],
      ar: [
        'اختيار لوحة التحليلات للربع الثالث',
        'تأجيل الإشعارات للربع الرابع',
        'الإشارة لمخاطر هندسية في خط البيانات',
      ],
    },
  },
  {
    id: 'seg-3',
    start: 1200,
    end: 2100,
    title: { en: 'Resourcing & owners', ar: 'الموارد والمسؤوليات' },
    summary: {
      en: 'Ownership assigned for each workstream. Karim to lead the data pipeline, Sara on frontend. Discussion on hiring one more engineer.',
      ar: 'تم توزيع المسؤوليات لكل مسار عمل. كريم يقود خط البيانات وسارة على الواجهة الأمامية. نقاش حول توظيف مهندس إضافي.',
    },
    keyPoints: {
      en: ['Karim owns data pipeline', 'Hiring approved for 1 engineer'],
      ar: ['كريم مسؤول عن خط البيانات', 'الموافقة على توظيف مهندس واحد'],
    },
  },
  {
    id: 'seg-4',
    start: 2100,
    end: 2730,
    title: { en: 'Wrap-up & next steps', ar: 'الخلاصة والخطوات التالية' },
    summary: {
      en: 'Recap of decisions and action items. Next sync scheduled in two weeks. Everyone aligned on the analytics-first direction.',
      ar: 'مراجعة القرارات والمهام. تحديد الاجتماع القادم بعد أسبوعين. اتفق الجميع على توجّه التحليلات أولاً.',
    },
    keyPoints: {
      en: ['Next sync in 2 weeks', 'Action items assigned'],
      ar: ['الاجتماع القادم بعد أسبوعين', 'توزيع المهام'],
    },
  },
]

export const transcript: TranscriptLine[] = [
  {
    id: 'l1',
    t: 12,
    speaker: 'Layla',
    text: {
      en: "Alright everyone, thanks for joining. Let's keep this focused — we have three goals to lock down for Q3.",
      ar: 'حسناً جميعاً، شكراً لحضوركم. لنبقَ مركّزين — لدينا ثلاثة أهداف يجب تثبيتها للربع الثالث.',
    },
  },
  {
    id: 'l2',
    t: 48,
    speaker: 'Omar',
    text: {
      en: 'Before we prioritize, I want to flag that customers keep asking for the analytics dashboard. It came up in almost every call.',
      ar: 'قبل الترتيب، أريد الإشارة إلى أن العملاء يطلبون لوحة التحليلات باستمرار. ظهرت في كل مكالمة تقريباً.',
    },
  },
  {
    id: 'l3',
    t: 96,
    speaker: 'Sara',
    text: {
      en: "Agreed it's valuable, but the data pipeline is a real engineering risk. We'd need to rework how we aggregate events.",
      ar: 'أوافق أنها ذات قيمة، لكن خط البيانات يمثل مخاطرة هندسية حقيقية. سنحتاج لإعادة هيكلة طريقة تجميع الأحداث.',
    },
  },
  {
    id: 'l4',
    t: 150,
    speaker: 'Karim',
    text: {
      en: 'I can take the pipeline. If we scope it to the top five metrics, I think we ship within the quarter.',
      ar: 'أستطيع تولّي خط البيانات. إذا حصرناه في أهم خمسة مقاييس، أعتقد أننا سنطلقه خلال الربع.',
    },
  },
  {
    id: 'l5',
    t: 210,
    speaker: 'Layla',
    text: {
      en: "Good. Let's commit to analytics for Q3 and push notifications to Q4. Karim owns the pipeline, Sara on the frontend.",
      ar: 'جيد. لنلتزم بالتحليلات للربع الثالث ونؤجل الإشعارات للربع الرابع. كريم مسؤول عن الخط وسارة على الواجهة.',
    },
  },
  {
    id: 'l6',
    t: 268,
    speaker: 'Sara',
    text: {
      en: "Works for me. I'll need design specs by next week to stay on track.",
      ar: 'يناسبني. سأحتاج مواصفات التصميم بحلول الأسبوع القادم للبقاء على المسار.',
    },
  },
  {
    id: 'l7',
    t: 320,
    speaker: 'Omar',
    text: {
      en: "I'll pull the customer quotes together so design has real context to work from.",
      ar: 'سأجمع اقتباسات العملاء حتى يعمل فريق التصميم على سياق حقيقي.',
    },
  },
  {
    id: 'l8',
    t: 380,
    speaker: 'Layla',
    text: {
      en: "Perfect. Let's also get approval to hire one more engineer to de-risk the timeline. I'll take that to leadership.",
      ar: 'ممتاز. لنحصل أيضاً على موافقة لتوظيف مهندس إضافي لتقليل مخاطر الجدول. سأعرض ذلك على الإدارة.',
    },
  },
]

export const tasks: Task[] = [
  {
    id: 't1',
    title: {
      en: 'Scope analytics pipeline to top 5 metrics',
      ar: 'حصر خط بيانات التحليلات في أهم 5 مقاييس',
    },
    owner: 'Karim',
    due: '2026-07-09',
    priority: 'high',
    status: 'in-progress',
  },
  {
    id: 't2',
    title: {
      en: 'Deliver design specs for dashboard',
      ar: 'تسليم مواصفات تصميم اللوحة',
    },
    owner: 'Sara',
    due: '2026-07-08',
    priority: 'high',
    status: 'open',
  },
  {
    id: 't3',
    title: {
      en: 'Compile customer quotes for context',
      ar: 'تجميع اقتباسات العملاء للسياق',
    },
    owner: 'Omar',
    due: '2026-07-07',
    priority: 'medium',
    status: 'open',
  },
  {
    id: 't4',
    title: {
      en: 'Get leadership approval for new hire',
      ar: 'الحصول على موافقة الإدارة على التوظيف',
    },
    owner: 'Layla',
    due: '2026-07-10',
    priority: 'medium',
    status: 'open',
  },
  {
    id: 't5',
    title: {
      en: 'Schedule next product sync',
      ar: 'جدولة مزامنة المنتج القادمة',
    },
    owner: 'Layla',
    due: '2026-07-05',
    priority: 'low',
    status: 'done',
  },
]

// A pool of transcript lines used to simulate a live recording.
export const liveTranscriptPool: TranscriptLine[] = transcript
