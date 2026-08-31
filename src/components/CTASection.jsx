import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section dir="rtl" className="py-16 bg-white overflow-hidden">
      <div className="max-w-[1000px] mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#00D4FF1A] rounded-[32px] px-8 py-12 text-center w-full max-w-[962px] mx-auto flex flex-col items-center h-[383px]"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="w-[318px] font-Ubuntu font-bold text-[36px] leading-[100%] tracking-[5%] text-[#002C5A] mb-3"
          >
            جاهز لبدء التميز ؟
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="w-[580px] font-Ubuntu font-normal text-[20px] leading-[133%] tracking-[2%] text-[#767676] mb-6"
          >
            انضم إلى منصة مسار التميز وابدأ رحلة تعليمية ممتعة ومميزة في المواد
            الدراسية والدورات التدريبية، مع دروس مبسطة، تمارين تفاعلية،
            واختبارات تساعدك على رفع تحصيلك الأكاديمي والوصول إلى هدفك في أي
            وقت ومن أي مكان
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            <Link
              to="/register"
              className="w-[500px] h-[54px] bg-[#002C5A] hover:bg-[#1e3056] rounded-[32px] flex items-center justify-center transition-all duration-300 hover:scale-105"
            >
              <span className="font-Ubuntu font-bold text-[20px] leading-[24px] tracking-[-0.5%] text-white">
                سجل الآن
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}