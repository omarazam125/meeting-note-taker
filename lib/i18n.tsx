'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

export type Lang = 'en' | 'ar'

type Dict = Record<string, string>

export const translations: Record<Lang, Dict> = {
  en: {
    // brand / generic
    appName: 'Shaffra Notes',
    tagline: 'Your live meeting note-taker',
    signIn: 'Sign in',
    signUp: 'Sign up',
    signOut: 'Sign out',
    email: 'Email',
    password: 'Password',
    continue: 'Continue',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    search: 'Search',
    loading: 'Loading',
    minutes: 'min',
    of: 'of',

    // nav
    navRecord: 'Record',
    navUpload: 'Upload',
    navLibrary: 'Library',

    // login
    loginTitle: 'Welcome back',
    loginSubtitle: 'Sign in to capture and analyze your meetings',
    loginEmailPh: 'you@company.com',
    loginPasswordPh: 'Enter your password',
    loginCta: 'Sign in',
    loginNoAccount: "Don't have an account?",
    loginCreate: 'Create one',
    loginOr: 'or continue with',
    loginGoogle: 'Continue with Google',
    loginRemember: 'Remember me',
    loginForgot: 'Forgot password?',
    signupTitle: 'Create your account',
    signupSubtitle: 'Start capturing and analyzing your meetings',
    signupName: 'Full name',
    signupNamePh: 'e.g. Layla Ahmed',
    signupCta: 'Create account',
    signupHaveAccount: 'Already have an account?',
    signupSignIn: 'Sign in',
    signupSuccess: 'Check your email to confirm your account, then sign in.',
    authGenericError: 'Something went wrong. Please try again.',
    authInvalidCreds: 'Invalid email or password.',
    confirmPassword: 'Confirm password',
    passwordsNoMatch: 'Passwords do not match.',

    // record - idle
    recordIdleTitle: 'Ready to capture your meeting',
    recordIdleSubtitle:
      'Press record and Shaffra listens to everything on your device — your mic and system audio — transcribing every word in real time.',
    recordStart: 'Start recording',
    recordHint: 'Captures system audio + microphone',

    // record - live
    recordLiveTitle: 'Recording in progress',
    recordLiveTranscribing: 'Live transcription',
    recordStop: 'Stop & save',
    recordPause: 'Pause',
    recordResume: 'Resume',
    recordMuteMic: 'Mute mic',
    recordUnmuteMic: 'Unmute mic',
    recordMicMuted: 'Your mic is muted — system audio still recording',
    recordParticipants: 'Participants',
    recordAddParticipant: 'Add participant',
    recordParticipantPh: 'Name of participant',
    recordListening: 'Listening',
    recordSystemAudio: 'System audio',
    recordMic: 'Microphone',
    recordLiveTranscript: 'Live transcript',
    recordWords: 'words',
    recordSpeakers: 'speakers detected',
    recordSaveConfirm: 'Meeting saved to your library',

    // upload
    uploadTitle: 'Upload a recording',
    uploadSubtitle:
      'Drop any audio or video file. Shaffra transcribes and analyzes it for you.',
    uploadDrop: 'Drag & drop your file here',
    uploadOr: 'or',
    uploadBrowse: 'Browse files',
    uploadFormats: 'Supports MP3, WAV, M4A, MP4, MOV — up to 2GB',
    uploadMeetingName: 'Meeting name',
    uploadMeetingNamePh: 'e.g. Q3 Product Sync',
    uploadProcess: 'Upload & process',
    uploadUploading: 'Uploading',
    uploadSelected: 'Selected file',
    uploadRemove: 'Remove',

    // library
    libraryTitle: 'Your meetings',
    librarySubtitle: 'All your recordings and their analysis in one place',
    libraryNew: 'New recording',
    librarySearchPh: 'Search meetings, participants...',
    colMeeting: 'Meeting',
    colDate: 'Date',
    colDuration: 'Duration',
    colParticipants: 'Participants',
    colStatus: 'Status',
    colActions: 'Actions',
    statusAnalyzed: 'Analyzed',
    statusProcessing: 'Processing',
    statusRecorded: 'Recorded',
    actionAnalyze: 'Analyze',
    actionView: 'View analysis',
    libraryEmpty: 'No meetings yet',
    started: 'Started',
    ended: 'Ended',

    // analysis
    analysisBack: 'Back to library',
    analysisSummary: 'Summary',
    analysisTimeline: 'Timeline',
    analysisTranscript: 'Transcript',
    analysisSpeakers: 'Speakers',
    analysisTasks: 'Action items',
    analysisRecording: 'Recording',
    analysisOverview: 'Overview',
    analysisKeyPoints: 'Key points',
    analysisDecisions: 'Decisions made',
    analysisSentiment: 'Overall sentiment',
    analysisTopics: 'Topics discussed',
    analysisTalkTime: 'Talk time',
    analysisSegment: 'Segment',
    analysisWhatDiscussed: 'What was discussed',
    taskOwner: 'Owner',
    taskDue: 'Due',
    taskPriority: 'Priority',
    taskStatus: 'Status',
    taskTitle: 'Task',
    priorityHigh: 'High',
    priorityMedium: 'Medium',
    priorityLow: 'Low',
    taskOpen: 'Open',
    taskDone: 'Done',
    taskInProgress: 'In progress',
    sentimentPositive: 'Positive',
    sentimentNeutral: 'Neutral',
    sentimentMixed: 'Mixed',
    playbackSpeed: 'Speed',
    downloadTranscript: 'Download transcript',
    downloadAudio: 'Download audio',
    jumpTo: 'Jump to moment',
  },
  ar: {
    // brand / generic
    appName: 'شفرة نوتس',
    tagline: 'مدوّن اجتماعاتك المباشر',
    signIn: 'تسجيل الدخول',
    signUp: 'إنشاء حساب',
    signOut: 'تسجيل الخروج',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    continue: 'متابعة',
    cancel: 'إلغاء',
    save: 'حفظ',
    delete: 'حذف',
    search: 'بحث',
    loading: 'جارٍ التحميل',
    minutes: 'دقيقة',
    of: 'من',

    // nav
    navRecord: 'تسجيل',
    navUpload: 'رفع ملف',
    navLibrary: 'المكتبة',

    // login
    loginTitle: 'أهلاً بعودتك',
    loginSubtitle: 'سجّل الدخول لتسجيل وتحليل اجتماعاتك',
    loginEmailPh: 'you@company.com',
    loginPasswordPh: 'أدخل كلمة المرور',
    loginCta: 'تسجيل الدخول',
    loginNoAccount: 'ليس لديك حساب؟',
    loginCreate: 'أنشئ حساباً',
    loginOr: 'أو تابع باستخدام',
    loginGoogle: 'المتابعة عبر Google',
    loginRemember: 'تذكّرني',
    loginForgot: 'نسيت كلمة المرور؟',
    signupTitle: 'أنشئ حسابك',
    signupSubtitle: 'ابدأ بتسجيل وتحليل اجتماعاتك',
    signupName: 'الاسم الكامل',
    signupNamePh: 'مثال: ليلى أحمد',
    signupCta: 'إنشاء حساب',
    signupHaveAccount: 'لديك حساب بالفعل؟',
    signupSignIn: 'تسجيل الدخول',
    signupSuccess: 'تحقّق من بريدك لتأكيد حسابك ثم سجّل الدخول.',
    authGenericError: 'حدث خطأ ما. حاول مرة أخرى.',
    authInvalidCreds: 'البريد الإلكتروني أو كلمة المرور غير صحيحة.',
    confirmPassword: 'تأكيد كلمة المرور',
    passwordsNoMatch: 'كلمتا المرور غير متطابقتين.',

    // record - idle
    recordIdleTitle: 'جاهز لتسجيل اجتماعك',
    recordIdleSubtitle:
      'اضغط تسجيل وستستمع شفرة إلى كل شيء على جهازك — الميكروفون وصوت النظام — وتفرّغ كل كلمة لحظياً.',
    recordStart: 'ابدأ التسجيل',
    recordHint: 'يلتقط صوت النظام + الميكروفون',

    // record - live
    recordLiveTitle: 'جارٍ التسجيل',
    recordLiveTranscribing: 'تفريغ مباشر',
    recordStop: 'إيقاف وحفظ',
    recordPause: 'إيقاف مؤقت',
    recordResume: 'استئناف',
    recordMuteMic: 'كتم الميكروفون',
    recordUnmuteMic: 'إلغاء الكتم',
    recordMicMuted: 'الميكروفون مكتوم — لا يزال صوت النظام يُسجَّل',
    recordParticipants: 'المشاركون',
    recordAddParticipant: 'إضافة مشارك',
    recordParticipantPh: 'اسم المشارك',
    recordListening: 'يستمع',
    recordSystemAudio: 'صوت النظام',
    recordMic: 'الميكروفون',
    recordLiveTranscript: 'النص المباشر',
    recordWords: 'كلمة',
    recordSpeakers: 'متحدثين تم رصدهم',
    recordSaveConfirm: 'تم حفظ الاجتماع في مكتبتك',

    // upload
    uploadTitle: 'رفع تسجيل',
    uploadSubtitle: 'أفلت أي ملف صوت أو فيديو. تقوم شفرة بتفريغه وتحليله لك.',
    uploadDrop: 'اسحب وأفلت ملفك هنا',
    uploadOr: 'أو',
    uploadBrowse: 'تصفّح الملفات',
    uploadFormats: 'يدعم MP3 و WAV و M4A و MP4 و MOV — حتى 2 جيجابايت',
    uploadMeetingName: 'اسم الاجتماع',
    uploadMeetingNamePh: 'مثال: مزامنة المنتج للربع الثالث',
    uploadProcess: 'رفع ومعالجة',
    uploadUploading: 'جارٍ الرفع',
    uploadSelected: 'الملف المحدد',
    uploadRemove: 'إزالة',

    // library
    libraryTitle: 'اجتماعاتك',
    librarySubtitle: 'كل تسجيلاتك وتحليلاتها في مكان واحد',
    libraryNew: 'تسجيل جديد',
    librarySearchPh: 'ابحث في الاجتماعات، المشاركين...',
    colMeeting: 'الاجتماع',
    colDate: 'التاريخ',
    colDuration: 'المدة',
    colParticipants: 'المشاركون',
    colStatus: 'الحالة',
    colActions: 'إجراءات',
    statusAnalyzed: 'تم التحليل',
    statusProcessing: 'قيد المعالجة',
    statusRecorded: 'مُسجّل',
    actionAnalyze: 'حلّل',
    actionView: 'عرض التحليل',
    libraryEmpty: 'لا توجد اجتماعات بعد',
    started: 'بدأ',
    ended: 'انتهى',

    // analysis
    analysisBack: 'العودة للمكتبة',
    analysisSummary: 'الملخص',
    analysisTimeline: 'الخط الزمني',
    analysisTranscript: 'النص الكامل',
    analysisSpeakers: 'المتحدثون',
    analysisTasks: 'المهام',
    analysisRecording: 'التسجيل',
    analysisOverview: 'نظرة عامة',
    analysisKeyPoints: 'أهم النقاط',
    analysisDecisions: 'القرارات المتخذة',
    analysisSentiment: 'الانطباع العام',
    analysisTopics: 'المواضيع المطروحة',
    analysisTalkTime: 'وقت الحديث',
    analysisSegment: 'المقطع',
    analysisWhatDiscussed: 'ما تمت مناقشته',
    taskOwner: 'المسؤول',
    taskDue: 'الاستحقاق',
    taskPriority: 'الأولوية',
    taskStatus: 'الحالة',
    taskTitle: 'المهمة',
    priorityHigh: 'عالية',
    priorityMedium: 'متوسطة',
    priorityLow: 'منخفضة',
    taskOpen: 'مفتوحة',
    taskDone: 'منجزة',
    taskInProgress: 'قيد التنفيذ',
    sentimentPositive: 'إيجابي',
    sentimentNeutral: 'محايد',
    sentimentMixed: 'متباين',
    playbackSpeed: 'السرعة',
    downloadTranscript: 'تنزيل النص',
    downloadAudio: 'تنزيل الصوت',
    jumpTo: 'الانتقال للحظة',
  },
}

type LangContextValue = {
  lang: Lang
  dir: 'ltr' | 'rtl'
  setLang: (l: Lang) => void
  toggleLang: () => void
  t: (key: keyof (typeof translations)['en']) => string
}

const LangContext = createContext<LangContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')

  useEffect(() => {
    const stored =
      typeof window !== 'undefined'
        ? (localStorage.getItem('shaffra-lang') as Lang | null)
        : null
    if (stored === 'en' || stored === 'ar') setLangState(stored)
  }, [])

  useEffect(() => {
    const dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.setAttribute('lang', lang)
    document.documentElement.setAttribute('dir', dir)
    if (typeof window !== 'undefined') localStorage.setItem('shaffra-lang', lang)
  }, [lang])

  const setLang = (l: Lang) => setLangState(l)
  const toggleLang = () => setLangState((p) => (p === 'en' ? 'ar' : 'en'))
  const t = (key: keyof (typeof translations)['en']) =>
    translations[lang][key] ?? translations.en[key] ?? String(key)

  return (
    <LangContext.Provider
      value={{ lang, dir: lang === 'ar' ? 'rtl' : 'ltr', setLang, toggleLang, t }}
    >
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within LanguageProvider')
  return ctx
}
