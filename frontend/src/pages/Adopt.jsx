
import React, { useEffect, useState , useRef} from "react";

import { useNavigate } from 'react-router-dom'

export default function Adopt() {
  const nav = useNavigate()
  const [form, setForm] = useState({
    name: '',
    age: '',
    gender: 'Female',
    vaccinated: 'Unknown',
    location: '',
    phone: '',
    description: '',
  })
  const [imageFile, setImageFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [consent, setConsent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)
  
  const [approvedPuppies, setApprovedPuppies] = useState([]);
  const fileInputRef = useRef(null)



  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function handleImageChange(e) {
    const file = e.target.files && e.target.files[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file.')
        return
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('Image must be smaller than 5MB.')
        return
      }
      setImageFile(file)
      setPreview(URL.createObjectURL(file))
      setError(null)
    }
  }

  function normalizePhone(num) {
    return num.replace(/\D/g, '')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)

    // Basic validation
    if (!imageFile) return setError('Please upload a picture of the puppy.')
    if (!form.location.trim()) return setError('Please provide a location.')
    if (!form.phone.trim()) return setError('Please provide a contact number.')
    if (!consent) return setError('Please confirm you agree to be contacted for verification.')

    setSubmitting(true)

    try {
      const payload = new FormData()
      payload.append('name', form.name)
      payload.append('age', form.age)
      payload.append('gender', form.gender)
      payload.append('vaccinated', form.vaccinated)
      payload.append('location', form.location)
      payload.append('phone', normalizePhone(form.phone))
      payload.append('description', form.description)
      payload.append('image', imageFile)

      // Endpoint should accept multipart/form-data, send email to admins, and save submission for review
      const res = await fetch('http://localhost:4000/api/adopt-submissions', {

        method: 'POST',
        body: payload,
      })

      if (!res.ok) {
        const text = await res.text()
        console.log("SERVER RESPONSE:", text)
        throw new Error("Submission failed")
}



      setSuccess('Thanks — your submission has been received and will be reviewed. We will email you once it is approved.')
      setForm({ name: '', age: '', gender: 'Female', vaccinated: 'Unknown', location: '', phone: '', description: '' })
      setImageFile(null)
      setPreview(null)
      if (fileInputRef.current) fileInputRef.current.value = ''
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }
useEffect(() => {
  fetch("http://localhost:4000/api/approved-puppies")
  .then(res => res.json())
  .then(data => setApprovedPuppies(data));

}, []);


  return (
    <div className="bg-[#FAF7F2]">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* HERO */}
        <div
          className="relative h-[320px] w-full mb-6 rounded-xl overflow-hidden"
          style={{
            backgroundImage: "url('/images/adopt/banner.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-orange-300/30 via-pink-200/15 to-yellow-100/10"></div>
          <div className="absolute inset-0 bg-black/5"></div>
        </div>

        {/* HERO CONTENT (separated from banner) */}
        {/*<div className="max-w-4xl mx-auto mt-8 mb-8 px-4"> */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-gray-100">
            
            <div className="max-w-3xl">
              <span className="inline-block mb-4 px-3 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-700">
                Adopt / Rehome
              </span>

              <h2 className="text-3xl sm:text-3xl font-semibold text-gray-900 leading-tight">
              Find a Loving Home{" "}
              <span className="text-orange-500">Be the Reason One Is Found</span></h2>

              <p className="mt-4 text-sm sm:text-base text-gray-700 leading-relaxed">
                Found a puppy? Looking to place one for adoption? Share clear details and a photo.
                Our volunteer team carefully verifies each request before publishing approved listings,
                ensuring safe and responsible adoptions.
              </p>

              <ul className="mt-6 space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="text-green-600">✔️</span>
                  Quick review by our volunteer team
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600">✔️</span>
                  Verification call before publishing
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600">✔️</span>
                  Privacy respected — contact shared only after approval
                </li>
              </ul>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href="#approved"
                  className="inline-flex justify-center items-center px-6 py-3 bg-[#C2410C] text-white rounded-lg text-sm font-medium hover:bg-[#9A3412] transition"
                >
                  See approved puppies
                </a>

                <a
                  href="#submit"
                  className="inline-flex justify-center items-center px-6 py-3 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition"
                >
                  Submit a puppy
                </a>
              </div>
            </div>

          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* LEFT: Info */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">How submissions are handled</h3>
            <p className="text-gray-700 leading-relaxed text-justify">Sharing clear information helps us verify quickly. Include a recent photo, the best contact number, and any medical or behaviour notes (vaccination status, special needs). We prioritise safety for both animals and adopters.</p>

            <div className="mt-6 grid grid-cols-1 gap-3">
              <div className="rounded-lg p-3 bg-gray-50 border border-gray-100 text-sm text-gray-700">• We verify location and status by phone.</div>
              <div className="rounded-lg p-3 bg-gray-50 border border-gray-100 text-sm text-gray-700">• We may request additional photos or information if needed.</div>
              <div className="rounded-lg p-3 bg-gray-50 border border-gray-100 text-sm text-gray-700">• Only approved listings will display contact details publicly.</div>
            </div>

            <img src="/images/adopt/puppies.png" alt="puppy up for adoption" className="mt-6 rounded-xl bg-gray-50 p-1 w-full h-auto max-h-72 object-contain" />
          </div>

          {/* RIGHT: Form */}
          <form id="submit" onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-center text-2xl font-semibold text-gray-900 mb-2">Submit Puppy Details</h3>
            <p className="text-center text-sm text-gray-500 mb-4">We’ll contact you for a quick verification call. Please provide accurate contact information.</p>

            <fieldset className="mb-3">
              <legend className="sr-only">Photo upload</legend>
              <label className="block text-sm font-medium text-gray-700">Photo <span className="text-xs text-gray-500">(required)</span></label>
              <input
                ref={fileInputRef}
                aria-describedby="photo-help"
                aria-label="Upload puppy photo"
                id="photo"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-2 w-full border border-gray-300 p-2.5 rounded-md focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-300"
                required
              />
              <p id="photo-help" className="mt-2 text-xs text-gray-500">JPG/PNG, max 5MB. Photo will be used after approval.</p>
              {imageFile && <p className="mt-2 text-xs text-gray-600">Selected file: {imageFile.name}</p>}
              {preview && <img src={preview} alt="Preview" className="mt-3 rounded-md object-contain bg-gray-50 p-1 w-40 h-40" />}
            </fieldset>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name (optional)</label>
                <input id="name" name="name" value={form.name} onChange={handleChange} className="mt-2 w-full border border-gray-300 p-2.5 rounded-md focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-300" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Age (optional)</label>
                <input id="age" name="age" value={form.age} onChange={handleChange} className="mt-2 w-full border border-gray-300 p-2.5 rounded-md focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-300" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <select id="gender" name="gender" value={form.gender} onChange={handleChange} className="mt-2 w-full border border-gray-300 p-2.5 rounded-md focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-300">
                  <option>Female</option>
                  <option>Male</option>
                  <option>Unknown</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Vaccination status</label>
                <select id="vaccinated" name="vaccinated" value={form.vaccinated} onChange={handleChange} className="mt-2 w-full border border-gray-300 p-2.5 rounded-md focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-300">
                  <option>Vaccinated</option>
                  <option>Not vaccinated</option>
                  <option>Unknown</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Contact number</label>
                <input id="phone" name="phone" value={form.phone} onChange={handleChange} className="mt-2 w-full border border-gray-300 p-2.5 rounded-md focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-300" placeholder="e.g., +919812345678" required />
              </div>
            </div>

            <label className="block mb-4 text-sm font-medium text-gray-700">Location</label>
            <input id="location" name="location" value={form.location} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-md mt-1 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-300" placeholder="City or area (e.g., Bijapur)" required />

            <label className="block mb-4">
              <span className="text-sm font-medium text-gray-700">Notes (optional)</span>
              <textarea id="description" name="description" value={form.description} onChange={handleChange} className="mt-2 w-full border border-gray-300 p-2.5 rounded-md focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-300" rows={4} />
            </label>

            <div className="flex items-center gap-3 mb-4">
              <input id="consent" name="consent" type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="h-4 w-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500" />
              <label htmlFor="consent" className="text-sm text-gray-700">I confirm I may be contacted for verification regarding this submission.</label>
            </div>

            <button type="submit" disabled={submitting} className="w-full py-3 bg-[#C2410C] text-white rounded-md font-semibold hover:bg-[#9A3412] transition">
              {submitting ? 'Submitting…' : 'Submit for review'}
            </button>

            <div aria-live="polite" className="mt-4 text-center">
              {error && <p className="text-sm text-red-600">{error}</p>}
              {success && <p className="text-sm text-green-600">{success}</p>}
            </div>

            <p className="mt-4 text-xs text-center text-gray-500">By submitting, you agree that our team may contact you for verification. Submissions are reviewed before being published.</p>
          </form>
        </div>

        {/* Placeholder: Approved adoptable puppies will appear below */}
        {/* Approved Puppies Section */}
        <div className="mt-12" id="approved">
          <h3 className="text-lg font-semibold mb-3">Approved Puppies</h3>

          {/* Approved Puppies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {approvedPuppies.map((puppy) => (
              <div key={puppy._id} className="border p-4 rounded shadow bg-white">

                {puppy.imageUrl && (
                      <img
                        src={puppy.imageUrl}
                        alt={puppy.name}
                        className="w-full h-48 object-cover rounded"
                      />
                    )}


                <h3 className="text-xl font-semibold mt-2">
                  {puppy.name || "Unnamed Puppy"}
                </h3>

                <p><strong>Age:</strong> {puppy.age || "Not specified"}</p>
                <p><strong>Gender:</strong> {puppy.gender || "Not specified"}</p>
                <p><strong>Location:</strong> {puppy.location}</p>
              </div>
            ))}
          </div>

          {/* Show message only if empty */}
          {approvedPuppies.length === 0 && (
            <div className="text-center text-gray-600 py-12 border border-dashed rounded-lg bg-white mt-6">
              No approved listings yet — be the first to{" "}
              <a href="#submit" className="text-orange-500 underline">
                submit a puppy
              </a>.
            </div>
          )}

          <p className="text-sm text-gray-500 mt-6">
            After review, approved listings will be displayed here so adopters can reach out directly.
          </p>
        </div>

      </div>
    </div>
  )
}

