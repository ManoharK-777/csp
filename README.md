# Unified Government Services Portal

A modern, professional e-Governance platform designed as a single window for citizens to discover central and state schemes, check eligibility, navigate citizen services, print comparison reports, and draft formal grievances. This application is designed to look like a real, production-ready government digital portal suitable for Sachivalayam and CSP project evaluation.

---

## 🚀 Tech Stack

- **Frontend**: React.js, Vite, Tailwind CSS v3, Lucide React (for premium icons), and responsive custom SVG charts.
- **Backend**: Node.js, Express, CORS.
- **Database**: Relational SQLite database using Node's built-in `node:sqlite` module (using synchronous `DatabaseSync` for zero-install, zero-compilation local operation).

---

## 🌟 Key Features

1. **Government Schemes Database (100+)**:
   - Advanced search, sort, and filters (by category and jurisdiction: Central vs Andhra Pradesh).
   - Bookmarking capabilities (saved to local storage).
   - Side-by-side comparison triggers.
   - 15 specific detailed AP state schemes (Amma Vodi, Rythu Bharosa, Aarogyasri, Cheyutha, NTR Bharosa Pension, etc.) and 101 Central schemes.
2. **Scheme Comparison Tool (Side-by-Side Matrix)**:
   - Compare up to 3 selected schemes simultaneously.
   - Automatic row-difference highlighting in soft orange and matching constraint row styling.
   - Recommended scheme detection flagging the option with the highest financial aid.
   - Clean printable layout for exporting reports as PDF.
3. **Smart Eligibility Checker**:
   - Matches user profiles (age, gender, income, occupation, student/farmer/senior/disabled status) to active schemes using matching backend algorithms.
4. **Government Services Directory (100+)**:
   - Direct links to official MeeSeva and National portals.
   - Documents required and application method overviews for each digital service.
5. **Grievance Assistant**:
   - Draft formal complaint letters for 12 civic categories (Electricity, Water, Roads, Sanitation, etc.).
   - Recommends the administrative department and details proof documents needed.
   - Copy-to-clipboard and printable format triggers. Does *not* auto-submit, keeping citizen data secure.
6. **Document Requirement Center**:
   - Accordion catalog detailing issuing authority, SLA processing timelines, eligibility, and step-by-step instructions for 10 core citizen documents.
7. **Citizen Welfare Dashboard**:
   - Responsive custom SVG charts illustrating scheme categories, central/state ratios, and top departments. Includes interactive SDG alignment dashboard (SDG 1, 3, 4, 8, 10, 16).
8. **Administrative CRUD Panel**:
   - Direct data management for schemes, services, departments, categories, grievances, and documents. Free access without login restrictions for evaluation purposes.

---

## 📂 Project Structure

```text
/CSP (Workspace Root)
  ├── backend/               # Express server
  │    ├── src/
  │    │    ├── db/          # Database configuration, schema.sql and seed.js
  │    │    ├── routes/      # api.js REST routes
  │    │    └── index.js     # Express App entry point
  │    └── package.json
  │
  ├── frontend/              # React single-page client
  │    ├── src/
  │    │    ├── components/  # Page-level modules (Home, Schemes, Checker, etc.)
  │    │    ├── App.jsx      # Global state and header/footer wrapper
  │    │    ├── index.css    # Tailwind base & custom prints
  │    │    └── main.jsx     # Vite DOM mounter
  │    ├── index.html        # Fonts & SEO tags
  │    ├── tailwind.config.js
  │    ├── postcss.config.js
  │    └── package.json
  │
  └── README.md              # Project documentation (this file)
```

---

## 🛠️ How to Setup & Run

### Prerequisites
- **Node.js (v22.5.0+ or v24.0.0+)** - Required for native SQLite support. (Verify version using `node -v`).

### 1. Start the Backend
1. Open a terminal.
2. Navigate to the `/backend` folder:
   ```powershell
   cd backend
   ```
3. Install dependencies:
   ```powershell
   npm install
   ```
4. Run the database seeder to initialize and populate SQLite:
   ```powershell
   npm run seed
   ```
5. Start the backend dev server:
   ```powershell
   npm run dev
   ```
   *The server runs at `http://localhost:5000`.*

### 2. Start the Frontend
1. Open a second terminal window.
2. Navigate to the `/frontend` folder:
   ```powershell
   cd frontend
   ```
3. Install dependencies:
   ```powershell
   npm install
   ```
4. Start the Vite dev server:
   ```powershell
   npm run dev
   ```
   *The portal will run at `http://localhost:5173`. Open this URL in your web browser.*
