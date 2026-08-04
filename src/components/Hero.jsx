function Hero() {
  return (
    <section className="px-10 py-16">
      <h2 className="text-5xl font-bold text-blue-900">
        مرحباً بكم في PS Academy
      </h2>

      <p className="mt-6 text-gray-600 text-lg max-w-2xl">
        منصة تعليمية تساعد الطلاب على تطوير مهاراتهم وتحقيق أهدافهم الأكاديمية.
      </p>

      <div className="mt-8 flex gap-4">
        <button className="bg-blue-900 text-white px-6 py-3 rounded-lg">
          سجل الآن
        </button>

        <button className="border border-blue-900 text-blue-900 px-6 py-3 rounded-lg">
          اعرف أكثر
        </button>
      </div>
    </section>
  );
}

export default Hero;