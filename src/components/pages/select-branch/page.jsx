import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import BranchCard from "../../components/Branch/BranchCard";

// غيّر هاد الرابط حسب طريقة الـ env عندك (Vite: import.meta.env.VITE_API_URL / CRA: process.env.REACT_APP_API_URL)
const API_URL = import.meta.env.VITE_API_URL;

const branches = [
  { id: "leadership", label: "الفرع العلمي", image: "/branches/leadership.png" },
  { id: "sharia", label: "الفرع الأدبي", image: "/branches/sharia.png" },
  { id: "literary", label: "الفرع الشرعي", image: "/branches/literary.png" },
  { id: "scientific", label: "الفرع الريادي", image: "/branches/scientific.png" },
];

export default function SelectBranch() {
  const navigate = useNavigate();
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  async function handleContinue() {
    if (!selectedBranch) return;
    setLoading(true);
    setServerError("");
    try {
      const res = await fetch(`${API_URL}/api/v1/user/branch`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ branch: selectedBranch }),
      });
      if (res.ok) {
        navigate("/");
        return;
      }
      setServerError("حدث خطأ أثناء حفظ اختيارك، حاول مرة أخرى");
    } catch (error) {
      console.error(error);
      setServerError("تعذر الاتصال بالسيرفر، تحقق من الإنترنت");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen w-full flex items-center justify-center p-4 relative">
      <div className="w-full max-w-3xl ">
        <div className="absolute right-5 top-5">
          <Link
            to="/"
            className="flex items-center text-slate-700 transition-colors hover:text-[#002C5A]"
          >
            <ArrowRight size={22} />
          </Link>
        </div>
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#002C5A]">اختار فرعك</h1>
          <p className="mt-1 text-lg font-light text-[#002C5A]">
            اختر فرعك في التوجيهي حسب رغبتك، لنتمكن من تقديم الأفضل لك.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {branches.map((branch) => (
            <BranchCard
              key={branch.id}
              id={branch.id}
              label={branch.label}
              image={branch.image}
              selected={selectedBranch === branch.id}
              onSelect={setSelectedBranch}
            />
          ))}
        </div>
        {serverError && (
          <p className="mt-4 text-center text-sm text-red-500">{serverError}</p>
        )}
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={handleContinue}
            disabled={!selectedBranch || loading}
            className="rounded-full bg-[#002C5A] px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-[#2f4c6a] active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin" size={18} />
                جاري الحفظ...
              </span>
            ) : (
              "انتقل الى الصفحة الرئيسية"
            )}
          </button>
        </div>
      </div>
    </main>
  );
}
