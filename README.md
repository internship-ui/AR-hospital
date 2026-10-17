# AR Hospital - Official Web Portal & Appointment Management System

A modern, responsive, visually attractive, and fully functional healthcare web application built for **AR Hospital**.

---

## 🏥 Project Overview

The AR Hospital website provides a clean, welcoming, and trustworthy digital experience designed for patients, visitors, and hospital staff. It combines a patient-friendly frontend interface with a secure Node.js & SQLite persistent backend API.

### Key Highlights & Features:
- **Colour Palette & Aesthetics**: Professional medical palette featuring clean White, soft Baby Pink accents, and clinical Medical Blue. Includes glassmorphism navigation, soft shadows, rounded cards, and smooth transitions.
- **14 Medical & Surgical Departments**:
  1. General Medicine
  2. Cardiology
  3. Orthopaedics
  4. Paediatrics & Neonatology
  5. Gynaecology & Obstetrics
  6. Dermatology & Cosmetology
  7. ENT (Ear, Nose & Throat)
  8. General & Laparoscopic Surgery
  9. Intensive Care Unit (ICU)
  10. OMFS Surgery (Oral & Maxillofacial)
  11. Neurosurgery & Neurology
  12. Physiotherapy & Rehabilitation
  13. Virology & Infectious Diseases
  14. Pulmonology & Respiratory Care
- **Doctor Profiles & Directory**: Verified qualification placeholders, experience, OPD consultation schedules, clinic suite locations, department filtering, and instant appointment booking.
- **Real Appointment Booking System**:
  - Live client-side and server-side validation.
  - Past dates strictly prevented.
  - Duplicate booking prevention.
  - Unique booking reference code generation (e.g., `ARH-2026-XXXX`).
  - Persistent storage in a local SQLite database (`data/ar_hospital.sqlite`).
  - Instant confirmed receipt workflow with printable/downloadable summary.
  - Patient Appointment Tracker modal by booking reference or phone number.
- **Services & Facilities**: Outpatient clinics (OPD), 24/7 Emergency & Trauma, Inpatient wards (IPD), Digital Diagnostic Imaging, Automated Pathology Lab, 24/7 In-House Central Pharmacy, Day Care, and Critical Care (ICU/CCU).
- **Interactive Contact & Emergency**:
  - Clickable telephone links (`tel:`) and email links (`mailto:`).
  - WhatsApp enquiry link.
  - Validated contact enquiry form submitting to backend API.
  - Google Maps embedded location map and direct navigation button.
  - 24/7 Emergency alert banner.
- **Staff & Admin Management Desk**:
  - Review all booked appointments and contact messages stored in SQLite.
  - Filter by status (`Confirmed`, `Completed`, `Cancelled`).
  - Update appointment status with real-time sync.

---

## 📂 Project Architecture & Folder Structure

```text
AR HOSPITAL/
├── client/                     # Frontend Application (React + TypeScript + Vite + Tailwind CSS)
│   ├── public/                 # Static assets & favicon
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── Navbar.tsx      # Responsive header, emergency hotline, mobile drawer
│   │   │   ├── Footer.tsx      # Comprehensive hospital footer & department links
│   │   │   ├── BackToTop.tsx   # Smooth scroll-to-top button
│   │   │   └── TrackAppointmentModal.tsx # Patient appointment status lookup modal
│   │   ├── data/
│   │   │   └── fallbackData.ts # Certified fallback data for offline resilience
│   │   ├── pages/              # Portal views
│   │   │   ├── HomePage.tsx    # Hero, emergency banner, departments, doctors, testimonials
│   │   │   ├── AboutPage.tsx   # Hospital overview, mission, vision, values, timeline
│   │   │   ├── DepartmentsPage.tsx # All 14 departments with search, category filters & modals
│   │   │   ├── DoctorsPage.tsx # Doctor directory, filters, credentials, OPD schedules
│   │   │   ├── ServicesPage.tsx # Hospital facilities (OPD, IPD, ICU, Lab, Pharmacy)
│   │   │   ├── AppointmentsPage.tsx # Interactive booking form & confirmation receipt
│   │   │   ├── ContactPage.tsx # Contact form, directions, phone/email, Google Maps
│   │   │   ├── AdminPage.tsx   # Hospital administration desk to manage SQLite appointments
│   │   │   └── NotFoundPage.tsx# Custom friendly 404 error page
│   │   ├── services/
│   │   │   └── api.ts          # API client for backend communication
│   │   ├── types/
│   │   │   └── index.ts        # TypeScript data models and interfaces
│   │   ├── App.tsx             # Root React component & state management
│   │   ├── index.css           # Tailwind CSS directives & Google Fonts
│   │   └── main.tsx            # React application entrypoint
│   ├── index.html              # HTML shell with medical SEO meta tags
│   ├── tailwind.config.js      # Custom theme (White, Baby Pink, Medical Blue)
│   └── package.json
│
├── server/                     # Backend API (Node.js + Express + TypeScript + SQLite)
│   ├── data/
│   │   └── ar_hospital.sqlite  # Persistent SQLite database file
│   ├── src/
│   │   ├── data/
│   │   │   ├── departmentsData.ts # 14 departments config with placeholders
│   │   │   ├── doctorsData.ts     # Doctor directory config with placeholders
│   │   │   └── hospitalInfo.ts    # Hospital address, phones, emails, hours, social links
│   │   ├── routes/
│   │   │   ├── appointments.ts    # POST /api/appointments, GET lookup, PATCH status
│   │   │   ├── contact.ts         # POST /api/contact, GET /api/contact
│   │   │   └── info.ts            # GET /api/departments, /api/doctors, /api/hospital-info
│   │   ├── db.ts               # SQLite engine (sql.js) with binary file persistence
│   │   └── index.ts            # Main Express app, CORS, rate limiting, route mounting
│   ├── .env                    # Active environment variables
│   ├── .env.example            # Environment configuration template
│   └── package.json
│
├── package.json                # Root package.json with concurrent dev scripts
└── README.md                   # Complete documentation & customization guide
```

---

## 🛠️ Files to Edit to Customize Hospital Details

All hospital-specific information has been organized into clear, dedicated configuration files so you can easily update text, contact information, photos, doctors, and departments:

| To Change... | File to Edit | Description |
| :--- | :--- | :--- |
| **Hospital Name, Address, Hotline & Social Links** | [`server/src/data/hospitalInfo.ts`](file:///c:/Users/l/Documents/rainfall_flood_monitoring_system/rainfall_flood_monitoring_system/database/OneDrive/Desktop/AR%20HOSPITAL/server/src/data/hospitalInfo.ts) | Update official phone numbers, emergency numbers, email, WhatsApp, address, and Google Maps embed URL. |
| **Departments & Specialities** | [`server/src/data/departmentsData.ts`](file:///c:/Users/l/Documents/rainfall_flood_monitoring_system/rainfall_flood_monitoring_system/database/OneDrive/Desktop/AR%20HOSPITAL/server/src/data/departmentsData.ts) | Add, edit, or remove departments, change descriptions, key treatments, photos, and bed allocations. |
| **Doctor Profiles & OPD Timings** | [`server/src/data/doctorsData.ts`](file:///c:/Users/l/Documents/rainfall_flood_monitoring_system/rainfall_flood_monitoring_system/database/OneDrive/Desktop/AR%20HOSPITAL/server/src/data/doctorsData.ts) | Update doctor names, verified qualifications, photographs, specialities, consultation days, and room numbers. |
| **Colour Palette & Styling** | [`client/tailwind.config.js`](file:///c:/Users/l/Documents/rainfall_flood_monitoring_system/rainfall_flood_monitoring_system/database/OneDrive/Desktop/AR%20HOSPITAL/client/tailwind.config.js) | Customize the shades of `hospital.blue`, `hospital.pink`, and shadows. |
| **Client Fallback Data** | [`client/src/data/fallbackData.ts`](file:///c:/Users/l/Documents/rainfall_flood_monitoring_system/rainfall_flood_monitoring_system/database/OneDrive/Desktop/AR%20HOSPITAL/client/src/data/fallbackData.ts) | Contains the client-side default dataset in case the server is offline during initial page load. |

---

## 🚀 Getting Started & Running Locally

### Prerequisites
- Node.js (v18, v20, or v22 LTS)
- npm (v9+)

### Installation
Dependencies are already installed in this workspace. If you clone or re-install:
```bash
# In root directory:
npm install

# In client:
cd client && npm install

# In server:
cd ../server && npm install
```

### Running Both Frontend & Backend Concurrently
From the root workspace directory, run:
```bash
npm run dev
```
This starts:
- 🌐 **Frontend Web Portal**: [http://localhost:5173](http://localhost:5173)
- 🏥 **Backend API Server**: [http://localhost:5000](http://localhost:5000)

### Running Services Separately (Optional)
```bash
# Run only backend server:
npm run dev:server

# Run only frontend client:
npm run dev:client
```

### Production Build
```bash
# Build both frontend and backend bundles:
npm run build

# Start production server (serves the React SPA on port 5000):
npm start
```

---

## 🔒 Security & Data Persistence

1. **Persistent SQLite Database**:
   - Stored locally at `server/data/ar_hospital.sqlite`.
   - Uses parameterized prepared statements for all SQL queries to prevent SQL injection.
   - Saves automatically upon new appointments, status changes, or contact enquiries.
2. **Input Validation**:
   - Client and server-side validation prevents past appointment dates.
   - Duplicate prevention rejects conflicting bookings for the same patient on the same day with the same specialist.
   - Contact forms require valid emails and minimum message lengths.
3. **Environment Security**:
   - Environment variables configured via `server/.env` and `server/.env.example`.
   - Never exposes administrative secret tokens or patient records in frontend bundles.
4. **Rate Limiting**:
   - In-memory rate limiting and request throttling applied to appointment and contact endpoints.

---

## 📋 Verified API Endpoints

- `GET /api/health` - Server health check & database status
- `GET /api/departments` - List of all 14 clinical departments
- `GET /api/doctors` - Doctor profiles (supports `?departmentId=` and `?search=`)
- `GET /api/services` - Core hospital services and clinical facilities
- `GET /api/hospital-info` - Hospital branding, address, and operating hours
- `POST /api/appointments` - Create appointment with reference generation
- `GET /api/appointments/reference/:reference` - Patient tracking by reference
- `GET /api/appointments/search?phone=...` - Patient tracking by phone
- `GET /api/appointments` - Admin view of all appointment records
- `PATCH /api/appointments/:id/status` - Update status (`Confirmed`, `Completed`, `Cancelled`)
- `POST /api/contact` - Submit contact enquiry
- `GET /api/contact` - Admin view of contact inquiries
