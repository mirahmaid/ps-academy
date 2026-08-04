import { features } from "../data";
import FeatureCard from "./FeatureCard";
function Features() {
  return (
    <section className="px-10 py-16">
      <h2 className="text-3xl font-bold text-blue-900 text-center mb-10">
        لماذا منصتنا هي بوابتك الحقيقية للنجاح والتفوق
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature) => (
          <FeatureCard
            key={feature.id}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
}

export default Features;