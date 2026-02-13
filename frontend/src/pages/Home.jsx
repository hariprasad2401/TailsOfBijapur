import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const nav = useNavigate();

  return (
    <div>

      {/* ================= HERO ================= */}
      <section className="relative h-[520px] rounded-lg overflow-hidden">
        <video
          src="/videos/homehero.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="relative flex items-center justify-center h-full">
          <div className="text-center text-white p-6 max-w-2xl">
            <h1 className="text-4xl font-bold mb-3">
              Tails of Bijapur
            </h1>

            <p className="text-lg mb-4">
              Rescue. Rehabilitate. Rehome.
            </p>

            <p className="text-gray-200 mb-6">
              A community-driven initiative working on the ground to rescue,
              treat, and responsibly rehome animals in and around Bijapur.
            </p>

            <div className="flex justify-center gap-3 flex-wrap">
              <button
                onClick={() => nav("/contact")}
                className="px-4 py-2 bg-orange-500 text-white rounded"
              >
                Report an Animal
              </button>

              <button
                onClick={() => nav("/adopt")}
                className="px-4 py-2 bg-white text-black rounded"
              >
                Adopt
              </button>

              <button
                onClick={() => nav("/donate")}
                className="px-4 py-2 border border-white rounded"
              >
                Donate
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= INTRO ================= */}
      <section className="mt-14 py-12 bg-[#FAF7F2] rounded-lg">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-4">
            Who We Are
          </h2>

          <p className="text-[#4B5563] text-lg leading-relaxed">
            Tails of Bijapur is a collective of volunteers, caregivers, and
            veterinarians working together to ensure injured and abandoned
            animals receive timely medical care, dignity, and a chance at a safe life.
          </p>
        </div>
      </section>

      {/* ================= WHAT WE DO ================= */}
      <section className="mt-14 py-10 bg-white rounded-lg">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">What We Do</h2>
          <p className="text-lg text-gray-700">On the ground. Every day.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-4">
          {[
            {
              title: "Rescue",
              text: "Responding to injured, abandoned, and emergency cases across the city."
            },
            {
              title: "Rehabilitation",
              text: "Providing medical treatment, recovery support, and post-care monitoring."
            },
            {
              title: "Rehoming",
              text: "Ensuring safe, responsible adoptions into loving homes."
            }
          ].map((item) => (
            <div
              key={item.title}
              className="bg-[#f9efe5] p-6 rounded-xl shadow text-center"
            >
              <h3 className="text-xl font-semibold mb-2 text-orange-500">
                {item.title}
              </h3>
              <p className="text-gray-600">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= SUCCESS STORIES ================= */}
      <section className="mt-14 py-10 bg-[#FAF7F2] rounded-lg">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Stories of Recovery</h2>
          <p className="text-lg text-gray-700">
            Small victories that keep us going
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-4">
          {[
            {
              title: "Buddy",
              desc: "Rescued after a road accident and now thriving in a forever home."
            },
            {
              title: "Chutki",
              desc: "Treated, fostered, and adopted after months of recovery."
            },
            {
              title: "A Cat Family",
              desc: "Rescued together and rehomed without being separated."
            }
          ].map((story) => (
            <div key={story.title} className="bg-white p-4 rounded-xl shadow">
              <div className="h-40 bg-gray-200 rounded mb-4"></div>
              <h3 className="font-semibold">{story.title}</h3>
              <p className="text-sm text-gray-600">{story.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= IMPACT ================= */}
      <section className="mt-14 py-10 bg-white rounded-lg">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Our Impact</h2>
          <p className="text-lg text-gray-700">Measured with care</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 px-4">
          {[
            ["50+", "Animals Rescued"],
            ["30+", "Active Volunteers"],
            ["10+", "Successful Adoptions"],
            ["2+", "Vaccination Drives"]
          ].map(([num, label]) => (
            <div
              key={label}
              className="p-6 bg-[#f9efe5] rounded-xl shadow text-center"
            >
              <div className="text-3xl text-orange-500 font-bold">
                {num}
              </div>
              <div className="text-gray-700">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="mt-14 py-14 bg-orange-500 rounded-lg text-center text-white">
        <h2 className="text-3xl font-bold mb-3">
          Every Life Matters
        </h2>

        <p className="max-w-2xl mx-auto mb-6">
          Whether it’s reporting an injured animal, volunteering your time,
          or supporting treatment costs, every action makes a difference.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={() => nav("/volunteer")}
            className="px-5 py-2 bg-white text-black rounded"
          >
            Volunteer
          </button>

          <button
            onClick={() => nav("/donate")}
            className="px-5 py-2 border border-white rounded"
          >
            Donate
          </button>
        </div>
      </section>

    </div>
  );
}
