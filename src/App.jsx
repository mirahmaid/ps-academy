import { Routes, Route } from "react-router-dom";
import { ToastProvider } from "./components/ui/ToastProvider";
import Header from "./components/Header/Header";
import Hero from "./components/Hero";
import StatsSection from "./components/Stats/StatsSection";
import Features from "./components/Features/Features";
import ContactSection from "./components/Contact/ContactSection";
import Testimonials from "./components/Testimonials/Testimonials";
import FAQSection from "./components/FAQ/FAQSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer/Footer";

import LoginPage from "./components/pages/login/page";
import RegisterPage from "./components/pages/register/page";
import ForgotPasswordPage from "./components/pages/forgot-password/page";
import ResetPasswordPage from "./components/pages/reset-password/page";

function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <StatsSection />
      <Features />
      <ContactSection />
      <Testimonials />
      <FAQSection />
      <CTASection />
      <Footer />
    </>
  );
}

function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        {/* أضف باقي الصفحات هون، متل /select-branch */}
      </Routes>
    </ToastProvider>
  );
}

export default App;