const WhyAdopt = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-14">

      {/* Page title */}
      <h1 className="text-4xl font-semibold text-center text-[#1F2933] mb-6">
        Why Adopt a Pet
      </h1>

      <p className="text-lg text-center text-[#4B5563] max-w-3xl mx-auto mb-14">
        Adoption is not just an act of kindness. It is a responsible choice that
        transforms lives, both human and animal.
      </p>

      {/* Humans */}
      <section className="mb-14">
        <h2 className="text-2xl font-semibold text-[#1F2933] mb-4">
          Benefits of Adoption for Humans
        </h2>
        <p className="text-[#4B5563] leading-relaxed">
          Sharing life with a companion animal has been shown to improve emotional
          and mental well-being. Pets provide unconditional companionship, encourage
          routine and physical activity, and help reduce stress, anxiety, and
          loneliness. Adoption also nurtures empathy, patience, and a sense of
          responsibility.
        </p>
      </section>

      {/* Animals */}
      <section className="mb-14">
        <h2 className="text-2xl font-semibold text-[#1F2933] mb-4">
          Impact of Adoption on Animals
        </h2>
        <p className="text-[#4B5563] leading-relaxed">
          Many animals waiting for adoption come from neglect, abandonment, or
          unsafe environments. Adoption offers them a second chance at life —
          access to proper medical care, safety, and a permanent home where they
          are treated with dignity and love.
        </p>
      </section>

      {/* Adopt don’t shop */}
      <section className="mb-14 bg-[#FAF7F2] border border-[#E7E1D8] rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-[#1F2933] mb-4">
          Adopt, Don’t Shop
        </h2>
        <p className="text-[#4B5563] leading-relaxed">
          Purchasing pets often supports unethical breeding practices and
          contributes to animal overpopulation. Adoption helps reduce the burden
          on shelters and promotes ethical, compassionate animal welfare.
          Choosing adoption is choosing responsibility over convenience.
        </p>
      </section>

      {/* Responsibility */}
      <section className="mb-14">
        <h2 className="text-2xl font-semibold text-[#1F2933] mb-4">
          Responsibility of a Pet Parent
        </h2>
        <p className="text-[#4B5563] leading-relaxed">
          Bringing an animal into your home is a long-term commitment. Pet parents
          are responsible for regular feeding, access to clean water, timely
          veterinary care, daily exercise, mental stimulation, and above all,
          patience and affection throughout the animal’s life.
        </p>
      </section>

      {/* After adoption */}
      <section>
        <h2 className="text-2xl font-semibold text-[#1F2933] mb-4">
          Life After Adoption
        </h2>
        <p className="text-[#4B5563] leading-relaxed">
          Every adopted animal needs time to adjust. Creating a calm environment,
          maintaining routines, and using positive reinforcement helps build trust.
          Adoption is not a one-time act — it is the beginning of a lifelong bond.
        </p>
      </section>

    </div>
  );
};

export default WhyAdopt;
