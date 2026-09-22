import { Send } from "lucide-react";

// ⚠️ أسماء الصور هون افتراضية (placeholders) — بدّليها بأسماء الأيقونات الفعلية
// يلي بتحطيها إنتِ بمجلد public/AI (نفس مكان صور HeroSection وFeatureSlider)
const SUGGESTIONS = [
  {
    id: "math",
    text: "كيف أحل مسألة رياضيات بدقة؟",
    icon: "/AI/suggestion-math.png",
    iconBg: "bg-[#E6F7F0]",
  },
  {
    id: "exam-review",
    text: "كيف أبدأ مراجعة ليلة الامتحان؟",
    icon: "/AI/suggestion-exam-review.png",
    iconBg: "bg-[#E7F1FB]",
  },
  {
    id: "summary",
    text: "لخص لي أهم نقاط هذا الدرس؟",
    icon: "/AI/suggestion-summary.png",
    iconBg: "bg-[#E6F7F0]",
  },
  {
    id: "anxiety",
    text: "كيف أتعامل مع قلق الامتحانات؟",
    icon: "/AI/suggestion-anxiety.png",
    iconBg: "bg-[#FCE9EF]",
  },
];

const QUICK_ACTIONS = [
  { id: "subject", label: "اختار المادة", icon: "/AI/action-subject.png" },
  { id: "test-me", label: "اختبرني", icon: "/AI/action-test.png" },
  { id: "history", label: "الأسئلة السابقة", icon: "/AI/action-history.png" },
];

export default function AIAssistantSection() {
  return (
    <section
      dir="rtl"
      className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 py-14 text-center"
    >
      {/* العنوان */}
      <div>
        <h2 className="text-lg font-bold text-[#0F2A4A] sm:text-xl">
          مرحباً، أنا مساعد مسار التميز <span className="text-[#12897A]">AI</span>.
        </h2>
        <h1 className="mt-1 text-2xl font-extrabold text-[#0F2A4A] sm:text-3xl">
          كيف يمكنني مساعدتك اليوم؟
        </h1>
      </div>

      <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-500 sm:text-[15px]">
        مساعدك الذكي لإجابة الأسئلة الدراسية، شرح المسائل، وتلخيص الدروس
      </p>

      {/* اقتراحات سريعة */}
      <div className="mt-8 grid w-full max-w-xl grid-cols-1 gap-3 sm:grid-cols-2">
        {SUGGESTIONS.map((s) => (
          <button
            key={s.id}
            type="button"
            className="flex items-center justify-between gap-3 rounded-full bg-[#F3F9FB] px-5 py-3 text-right text-sm font-medium text-[#0F2A4A] transition-colors hover:bg-[#E9F3F6]"
          >
            <span className="flex-1">{s.text}</span>
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${s.iconBg}`}
            >
              <img src={s.icon} alt="" className="h-4 w-4 object-contain" />
            </span>
          </button>
        ))}
      </div>

      {/* صندوق الإدخال */}
      <div className="mt-8 flex w-full max-w-2xl items-center gap-3 rounded-full bg-[#F3F9FB] py-2 pl-2 pr-6 shadow-[0_10px_25px_-15px_rgba(15,42,74,0.25)]">
        <input
          type="text"
          placeholder="اكتب سؤالك للمساعد الذكي هنا ...."
          className="w-full bg-transparent text-sm text-[#0F2A4A] outline-none placeholder:text-slate-400"
        />
        <button
          type="button"
          aria-label="إرسال"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#12897A] text-white transition-colors hover:bg-[#0f7364]"
        >
          <Send size={18} className="-rotate-90" />
        </button>
      </div>

      {/* أزرار سريعة */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        {QUICK_ACTIONS.map((action) => (
          <button
            key={action.id}
            type="button"
            className="flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#0F2A4A] shadow-sm ring-1 ring-slate-100 transition-colors hover:bg-slate-50"
          >
            <img src={action.icon} alt="" className="h-3.5 w-3.5 object-contain" />
            {action.label}
          </button>
        ))}
      </div>
    </section>
  );
}