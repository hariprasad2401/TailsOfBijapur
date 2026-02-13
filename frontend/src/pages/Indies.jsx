import useScrollReveal from "../hooks/useScrollReveal";
import IndigenousBreedsSlider from "../components/IndigenousBreedsSlider";


const Indies = () => {
  useScrollReveal();

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">

      {/* HEADER */}
      <div className="text-center mb-24 fade-slide">
        <h1 className="text-4xl font-semibold text-[#1F2933] mb-4">
          Indian Pariah Dogs (Indies)
        </h1>
        <p className="text-lg text-[#4B5563] max-w-3xl mx-auto">
          Naturally evolved. Deeply intelligent. Often forgotten.
        </p>
      </div>

      {/* ORIGIN */}
      <section className="grid md:grid-cols-2 gap-12 items-center mb-28">
        <div className="fade-slide fade-left">
          <h2 className="text-2xl font-semibold text-[#1F2933] mb-4">
            A Natural Evolution
          </h2>
          <p className="text-[#4B5563] leading-relaxed">
            Indian Pariah Dogs evolved naturally over thousands of years without
            human interference. Their intelligence, immunity, and adaptability
            are results of survival, not selective breeding.
            <br /><br />
            They are perfectly suited to Indian climate, terrain, and lifestyle.
          </p>
        </div>

        <div className="h-72 fade-slide fade-right bg-[#FAF7F2] border border-[#E7E1D8] rounded-xl flex items-center justify-center text-sm text-[#6B7280]">
          Image placeholder – Indie origin
        </div>
      </section>

      {/* INDIGENOUS BREEDS */}
      <section className="mb-28">
        <h2 className="text-2xl font-semibold text-[#1F2933] mb-6 fade-slide">
          Indigenous Dogs of India
        </h2>

        <p className="text-[#4B5563] max-w-3xl mb-10 fade-slide">
          India is home to some of the world’s oldest and most resilient dog breeds.
          Each evolved for purpose, climate, and survival and not appearance.
        </p>

        <IndigenousBreedsSlider />
      </section>


      {/* ACCIDENT FACTS */}
      <section className="mb-28">
        <h2 className="text-2xl font-semibold text-[#1F2933] mb-10 fade-slide">
          Everyday Risks They Face
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            "Majority of street dogs face injury at least once",
            "Road accidents are the leading cause of trauma",
            "Night-time accidents are most common",
            "Lack of immediate medical help worsens outcomes",
          ].map((text, i) => (
            <div
              key={i}
              className="fade-slide bg-[#FFF8F3] border border-orange-100 rounded-2xl p-6 shadow-sm"
            >
              <p className="text-gray-700 text-sm leading-relaxed">
                {text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* INTELLIGENCE */}
      <section className="grid md:grid-cols-2 gap-12 items-center mb-28">
        <div className="h-72 fade-slide fade-left bg-[#FAF7F2] border border-[#E7E1D8] rounded-xl flex items-center justify-center text-sm text-[#6B7280]">
          Image placeholder – Indie alertness
        </div>

        <div className="fade-slide fade-right">
          <h2 className="text-2xl font-semibold text-[#1F2933] mb-4">
            Built for Survival
          </h2>
          <p className="text-[#4B5563] leading-relaxed">
            Indies learn quickly because they must. They read human behavior,
            sense danger, and adapt faster than most breeds.
            <br /><br />
            Their immunity is stronger, medical needs are lower, and loyalty is
            deeply rooted once trust is built.
          </p>
        </div>
      </section>

      {/* NEGLECT */}
      <section className="fade-slide bg-[#FAF7F2] border border-[#E7E1D8] rounded-xl p-10 mb-28">
        <h2 className="text-2xl font-semibold text-[#1F2933] mb-4">
          Neglected by Perception
        </h2>
        <p className="text-[#4B5563] leading-relaxed max-w-4xl">
          Indies are often ignored simply because they are common. Many suffer
          abuse, abandonment, starvation, and untreated injuries — not because
          they are incapable, but because they are misunderstood.
        </p>
      </section>

      {/* CLOSING */}
      <section className="text-center fade-slide">
        <h2 className="text-2xl font-semibold text-[#1F2933] mb-4">
          Choosing an Indie
        </h2>
        <p className="text-[#4B5563] max-w-3xl mx-auto">
          When you adopt an Indie, you don’t just save a life — you acknowledge
          resilience, intelligence, and trust earned the hard way.
        </p>
      </section>

    </div>
  );
};

export default Indies;
