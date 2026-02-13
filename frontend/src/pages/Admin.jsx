import React, { useEffect, useState } from "react";

export default function Admin() {
  const [adoptions, setAdoptions] = useState([]);
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    fetchAdoptions();
    fetchVolunteers();
  }, []);

  async function fetchAdoptions() {
    const res = await fetch("/api/adopt-submissions");
    const data = await res.json();
    setAdoptions(data);
  }

  async function fetchVolunteers() {
    const res = await fetch("/api/volunteers");
    const data = await res.json();
    setVolunteers(data);
  }

  async function updateAdoption(id, status) {
    await fetch(`/api/adopt-submissions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchAdoptions();
  }

  async function updateVolunteer(id, status) {
    await fetch(`/api/volunteers/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchVolunteers();
  }

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Adoption Section */}
      <h2 className="text-2xl font-semibold mb-4">Adoption Requests</h2>
      <div className="space-y-4 mb-12">
        {adoptions.map((item) => (
          <div key={item._id} className="bg-white p-5 rounded shadow">
            <p><strong>Name:</strong> {item.name}</p>
            <p><strong>Email:</strong> {item.email}</p>
            <p><strong>Location:</strong> {item.location}</p>
            <p><strong>Status:</strong> {item.status}</p>

            <div className="mt-3 space-x-3">
              <button
                onClick={() => updateAdoption(item._id, "APPROVED")}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Approve
              </button>
              <button
                onClick={() => updateAdoption(item._id, "REJECTED")}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Volunteer Section */}
      <h2 className="text-2xl font-semibold mb-4">Volunteer Applications</h2>
      <div className="space-y-4">
        {volunteers.map((item) => (
          <div key={item._id} className="bg-white p-5 rounded shadow">
            <p><strong>Name:</strong> {item.name}</p>
            <p><strong>Email:</strong> {item.email}</p>
            <p><strong>Role:</strong> {item.role}</p>
            <p><strong>Status:</strong> {item.status}</p>

            <div className="mt-3 space-x-3">
              <button
                onClick={() => updateVolunteer(item._id, "APPROVED")}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Approve
              </button>
              <button
                onClick={() => updateVolunteer(item._id, "REJECTED")}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
