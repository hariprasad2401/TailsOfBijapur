import React, { useState } from "react";

export default function Volunteer() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    why: "",
  });
  const [msg, setMsg] = useState("");

  async function submit(e) {
    e.preventDefault();
    const res = await fetch("/api/volunteer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) setMsg("Thank you! Your application has been submitted.");
    else setMsg("Submission failed.");
  }

  return (
    <div className="bg-[#FAF7F2]">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* HERO */}
        <div className="text-center mb-16">
          <span className="inline-block mb-3 px-4 py-1 text-sm font-medium rounded-full bg-orange-100 text-orange-700">
            Volunteer With Us
          </span>

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
            Be the Reason{" "}
            <span className="text-orange-500">Someone Survives</span>
          </h1>

          <p className="mt-5 text-lg text-gray-600 max-w-2xl mx-auto">
            Join a community that shows up for injured, abandoned, and voiceless
            animals across Bijapur.
          </p>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* LEFT */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-gray-700 leading-relaxed text-justify">
              Volunteering with Tails of Bijapur means being present when it
              truly matters. We work on the ground responding to rescue calls,
              coordinating emergency medical care, supporting recovery, and
              ensuring animals are treated with dignity and kindness.
              <br /><br />
              You don’t need to be a professional rescuer to make a difference.
              Whether it’s on-spot assistance, transporting animals, spreading
              awareness, or being available during emergencies—every effort
              counts.
              <br /><br />
              If you believe compassion should be acted upon, not just felt,
              we’d love to have you walk this journey with us.
            </p>

            <img
              src="/images/volu.jpg"
              alt="volunteer"
              className="mt-6 rounded-xl object-cover w-full h-[240px]"
            />
          </div>

          {/* FORM */}
          <form
            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
            onSubmit={submit}
          >
            <h3 className="text-center text-2xl font-semibold text-gray-900 mb-2">
              Join Our Volunteer Network
            </h3>
            <p className="text-center text-sm text-gray-500 mb-6">
              We’ll personally reach out after reviewing your details
            </p>

            <label className="block mb-3">
              Full Name
              <input
                required
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="w-full border border-gray-300 p-2.5 rounded-md mt-1 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-300"
              />
            </label>

            <label className="block mb-3">
              Email
              <input
                required
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                className="w-full border border-gray-300 p-2.5 rounded-md mt-1 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-300"
              />
            </label>

            <label className="block mb-3">
              Phone Number
              <input
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
                className="w-full border border-gray-300 p-2.5 rounded-md mt-1 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-300"
              />
            </label>

            <label className="block mb-3">
            Your Occupation
            <select
            value={form.role}
                onChange={(e) =>
                  setForm({ ...form, role: e.target.value })
                }
                className="w-full border border-gray-300 p-2.5 rounded-md mt-1 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-300"
              >
                <option value="student">Student</option>
                <option value="professional">Professional</option>
              </select>
            </label>

            <label className="block mb-3">
              How much time can you dedicate?
              <select
                value={form.time}
                onChange={(e) =>
                  setForm({ ...form, time: e.target.value })
                }
                className="w-full border border-gray-300 p-2.5 rounded-md mt-1 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-300"
              >
                <option value="weekends">Weekends Only</option>
                <option value="evenings">2-4 hours per week</option>
                <option value="flexible">5-8 hours per week</option>
                <option value="full">More than 8 hrs per week</option>
              </select>
            </label>


            <label className="block mb-4">
              Why do you want to volunteer?
              <textarea
                rows="4"
                value={form.why}
                onChange={(e) =>
                  setForm({ ...form, why: e.target.value })
                }
                className="w-full border border-gray-300 p-2.5 rounded-md mt-1 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-300"
              />
            </label>

            <button className="w-full py-3 bg-orange-500 text-white rounded-md font-semibold tracking-wide hover:bg-orange-600 transition">
              Submit Application
            </button>

            {msg && (
              <p className="mt-4 text-center text-green-600 text-sm">
                {msg}
              </p>
            )}

            <p className="mt-4 text-xs text-center text-gray-500">
              Your details are kept private and used only for volunteering
              coordination.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
