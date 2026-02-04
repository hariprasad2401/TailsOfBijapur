import ScrollReveal from "../components/ScrollReveal";

const Indies = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">

      {/* HERO */}
      <ScrollReveal>
        <section className="text-center mb-20">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            The Story of Indies
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            India’s native dogs. Resilient, intelligent, loyal and deeply misunderstood.
          </p>
        </section>
      </ScrollReveal>

      {/* ORIGIN */}
      <ScrollReveal>
        <section className="grid md:grid-cols-2 gap-10 mb-20 items-center">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Origin of Indian Pariah Dogs
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Indies, also known as Indian Pariah Dogs, are one of the world’s
              oldest naturally evolved dog populations. They developed over
              thousands of years alongside human settlements, adapting to local
              climates, diseases, and food sources without human-directed breeding.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Their genetic diversity makes them healthier and more resilient
              than many selectively bred dogs.
            </p>
          </div>

          {/* IMAGE PLACEHOLDER */}
          <div className="bg-gray-100 rounded-2xl h-72 flex items-center justify-center text-gray-400">
            Image: Early Indian Pariah Dog
          </div>
        </section>
      </ScrollReveal>

      {/* DIVERSITY */}
      <ScrollReveal>
        <section className="mb-20">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Diversity Among Indies
          </h2>

          <p className="text-gray-700 max-w-4xl mb-8">
            Indies are not one uniform type. Their appearance varies based on
            geography, climate, and natural adaptation.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              "Short-coated Indies found in warmer regions",
              "Longer coats in colder or hilly areas",
              "Variations in ear shape, size, and coloration"
            ].map((text, i) => (
              <div
                key={i}
                className="bg-[#FAF7F2] border border-[#E7E1D8] rounded-xl p-6"
              >
                <p className="text-gray-700">{text}</p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* WHY INDIES */}
      <ScrollReveal>
        <section className="bg-orange-50 border border-orange-100 rounded-2xl p-10 mb-20">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Why Indies Make Exceptional Companions
          </h2>

          <ul className="list-disc list-inside text-gray-700 space-y-3">
            <li>High immunity and lower medical expenses</li>
            <li>Highly intelligent and quick learners</li>
            <li>Adaptable to Indian climates and living conditions</li>
            <li>Emotionally intuitive and deeply loyal</li>
            <li>Require less grooming and artificial care</li>
          </ul>
        </section>
      </ScrollReveal>

      {/* NEGLECT */}
      <ScrollReveal>
        <section className="grid md:grid-cols-2 gap-10 mb-20 items-center">
          <div className="bg-gray-100 rounded-2xl h-72 flex items-center justify-center text-gray-400">
            Image: Street dogs in urban India
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Neglect in Modern Times
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Despite being native to this land, Indies are often overlooked in
              favor of foreign breeds. Many face abandonment, abuse, and lack of
              medical care due to misconceptions about their temperament and value.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              The preference for pedigree labels has pushed Indies into a cycle
              of neglect, even though they are best suited for Indian conditions.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* CLOSING */}
      <ScrollReveal>
        <section className="text-center bg-green-50 border border-green-200 rounded-2xl p-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Choosing an Indie is Choosing Empathy
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Indies don’t need to be rescued from their identity. They need to be
            respected, understood, and given the chance to belong. Adoption is
            not charity — it is justice.
          </p>
        </section>
      </ScrollReveal>

    </div>
  );
};

export default Indies;
