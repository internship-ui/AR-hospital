# 🏥 AR Hospital - Official Web Portal

A modern, responsive, and patient-friendly healthcare website built for **AR Hospital**.

---

## 🌟 Overview & Key Features

- **Department Directory**: All 14 clinical and surgical departments with descriptions, key treatments, and doctor associations.
- **Doctor Profiles & OPD Schedule**: Verified qualifications, OPD consultation days, timings, room numbers, and direct appointment booking.
- **Interactive Appointment Booking**:
  - Full client-side validation preventing past dates.
  - Unique booking reference generation (e.g., `ARH-2026-XXXX`).
  - Instant printable confirmation receipt.
  - Patient Appointment Tracker modal with instant reference lookup.
- **Hospital Services**: 24/7 Emergency & Trauma, Inpatient wards, ICU/CCU, Diagnostics, and 24/7 Central Pharmacy.
- **Emergency & Contact**: Interactive inquiry forms, direct phone links (`tel:`), email links, WhatsApp chat, and Google Maps embed.
- **Staff & Admin Desk**: Review booked appointments and contact messages with real-time status filtering (`Confirmed`, `Completed`, `Cancelled`).

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation & Running

```bash
# 1. Install dependencies
npm install

# 2. Start the local development server
npm run dev
```

Visit **[http://localhost:5173](http://localhost:5173)** in your browser.

---

## 📦 Production Build

```bash
# Build the production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🎨 Technology Stack
- **Framework**: React 19 + TypeScript
- **Bundler & Tooling**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Data & Storage**: Client-side reactive state with persistent `localStorage`
