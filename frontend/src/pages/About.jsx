"use client";
import React from "react";

export default function About() {
  return (
    <div>

      {/* HERO SECTION */}
      <section className="relative h-[500px] rounded-lg overflow-hidden">
        <video
          src="/videos/Abouthero.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/30" />

        <div className="relative flex items-center justify-center h-full">
          <div className="text-center text-white p-6 rounded">
            <h1 className="text-3xl font-bold">Our Journey: A Heartfelt Mission</h1>
            <p className="mt-2">
              We rescue, rehabilitate and provide second chances for animals in Bijapur.
            </p>

            <button
              onClick={() =>
                document
                  .getElementById("team-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="mt-4 px-4 py-2 bg-orange-500 text-white rounded"
            >
              Meet Our Team
            </button>
          </div>
        </div>
      </section>

      {/* OUR VALUES */}
      <section className="mt-10 py-10 bg-[#f9efe5] rounded-lg">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Our Values</h2>
          <p className="text-lg text-gray-700">Guiding Principles</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-4">
          {[
            { icon: "compassion", title: "Compassion", text: "Unconditional love for all animals." },
            { icon: "rehab", title: "Rehabilitation", text: "Healing minds, healing hearts." },
            { icon: "community", title: "Community", text: "Together, we save lives." },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white/20 backdrop-blur-lg border border-white/30 p-6 rounded-2xl shadow-md flex flex-col items-center text-center min-h-[260px]"
            >
              <img
                src={`/icons/${item.icon}.png`}
                alt={item.title}
                className="h-20 mb-4 opacity-80"
              />
              <h3 className="font-semibold text-xl">{item.title}</h3>
              <p className="text-gray-600 mt-1">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* OUR STORY */}
      <section className="mt-14 py-14 bg-[#FAF7F2] rounded-lg">
      <div className="max-w-4xl mx-auto px-6">
        
        <h2 className="text-3xl font-semibold text-[#1F2933] mb-6 text-center">
          How Tails of Bijapur Began
        </h2>

        <div className="space-y-6 text-[#4B5563] text-lg leading-relaxed">
          <p>
            Tails of Bijapur began in 2023 with a clear purpose: to ensure that injured,
            abandoned, and vulnerable animals in Bijapur receive timely care and a fair
            chance at life. What started as a personal effort to foster and rehome a few
            puppies soon highlighted a much larger need within the community.
          </p>

          <p>
            As rescue cases increased, individuals who were already helping animals in
            their own capacities came together under a shared mission. These collective
            efforts gradually evolved into a coordinated platform focused on on-ground
            treatment, rehabilitation, and responsible rehoming.
          </p>

          <p>
            Today, Tails of Bijapur operates as a community-driven initiative, connecting
            caregivers, veterinarians, and volunteers to provide animals with dignity,
            medical support, and the second chances they deserve.
          </p>
        </div>

      </div>
    </section>


      {/* TEAM */}
      <section id="team-section" className="mt-16 py-10 bg-white rounded-lg relative">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Meet Our Team</h2>
          <p className="text-lg text-gray-700">The Hearts Behind the Mission</p>
        </div>

        <div className="overflow-hidden">
          <div className="flex gap-6 animate-scroll">
            {[...Array(2)].flatMap(() =>
              Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={Math.random()}
                  className="min-w-[220px] bg-[#f9efe5] p-6 rounded-xl shadow text-center flex flex-col items-center"
                >
                  <img
                    src="/icons/user-placeholder.png"
                    className="h-24 w-24 rounded-full mb-4 border-2 border-orange-400"
                  />
                  <h3 className="text-xl font-semibold">Volunteer</h3>
                  <p className="text-gray-600 text-sm mt-1">TOB Volunteer</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section className="mt-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Our Impact in Numbers</h2>
          <p className="text-lg text-gray-700">Impact. Measured in Wags</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {[
            ["2+", "Vaccination Drives"],
            ["10+", "Happy Adoptions"],
            ["30+", "Volunteers"],
            ["50+", "Successful Rescues"],
          ].map(([num, label]) => (
            <div key={label} className="p-6 bg-white rounded shadow text-center">
              <div className="text-3xl text-orange-500 font-bold">{num}</div>
              <div>{label}</div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
