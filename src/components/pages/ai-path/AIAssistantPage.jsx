import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import AIAssistantSection from "./AIAssistantSection";
export default function AIAssistantPage() {
  const navigate = useNavigate();
  const { isLoggedIn, isLoading, selectedBranch } = useAuth();

  // 🔒 نفس حماية صفحة الـ Home بالضبط (لازم تسجيل دخول + فرع مختار)
  useEffect(() => {
    if (isLoading) return;

    if (!isLoggedIn) {
      navigate("/login", { replace: true });
    } else if (!selectedBranch) {
      navigate("/select-branch", { replace: true });
    }
  }, [isLoading, isLoggedIn, selectedBranch, navigate]);

  if (isLoading || !isLoggedIn || !selectedBranch) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        <AIAssistantSection />
      </main>
      <Footer />
    </div>
  );
}