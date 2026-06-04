# Spectrum 2025 - DHA Suffa University Tech Festival

![Spectrum 2025](public/sponsors/Logo%20Spectrum.png)

Pakistan's Premier Tech Festival featuring Hackathons, Gaming Competitions, and Talent Showcases.

## 🚀 Features

- ✨ **Beautiful Landing Page** with 3D animations and effects
- 📝 **Registration System** with Supabase integration
- 🎨 **Dynamic Forms** with real-time validation
- 🎯 **Event Categories**: Hackathon, Gaming Arena, Play To Win
- 🌟 **3D Star Field** background using Three.js
- ⏱️ **Live Countdown Timer** to event date
- 🎨 **Mouse Tracking Effects** and interactive animations
- 📱 **Fully Responsive** design for all devices

## 🛠️ Tech Stack

- **Framework:** Next.js 15.5.3 (App Router)
- **Frontend:** React 19.1.0 + TypeScript
- **Styling:** Tailwind CSS 4.1.13
- **Animations:** Framer Motion, Custom CSS
- **3D Graphics:** Three.js, React Three Fiber
- **Backend:** Supabase (PostgreSQL)
- **Icons:** React Icons, Lucide React
- **Fonts:** Orbitron, Rajdhani, Geist

## 📦 Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd spectrum-2025

# Install dependencies
npm install

# Set up environment variables
# Create a .env.local file with:
# NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 🚢 Deployment

- Build for production: `npm run build`, then start: `npm start`.
- Configure environment variables on your host (e.g., Vercel):
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Push to GitHub

```bash
git add -A
git commit -m "chore: prepare for deployment"
git remote add origin https://github.com/<your-username>/<your-repo>.git # if not set
git push -u origin main
```

## ⚙️ Setup

### 1. Supabase Configuration

1. Create a [Supabase](https://supabase.com/) project
2. Run the SQL schema from `supabase-schema.sql` in the SQL Editor
3. Get your project URL and anon key from Settings > API
4. Create `.env.local` with your credentials

See [SETUP.md](SETUP.md) for detailed instructions.

### 2. Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📄 Pages

- **`/`** - Landing page with hero, events, sponsors, about, contact
- **`/register`** - Registration form for participants
- **`/sponsors`** - (Coming soon) Full sponsor showcase

## 🎯 Event Categories

### Hackathon (PKR 150,000)
- Web Dev
- Mobile App
- Data Science
- Cyber Security
- UI/UX
- Startup Ideathon

### Gaming Arena (PKR 50,000)
- PUBG
- Valorant
- FIFA
- Tekken

### Play To Win (TBA)
- Singing
- Dance
- Stand-up Comedy
- Short Film
- Art
- Photography

## 🗂️ Project Structure

```
spectrum-2025/
├── src/
│   ├── app/
│   │   ├── page.tsx           # Landing page
│   │   ├── layout.tsx         # Root layout
│   │   ├── globals.css        # Global styles
│   │   └── register/
│   │       ├── page.tsx       # Registration form
│   │       └── layout.tsx     # Register page metadata
│   ├── components/
│   │   ├── Navbar.tsx         # Navigation header
│   │   ├── HeroSection.tsx    # Hero with countdown
│   │   ├── AboutUs.tsx        # About section with 3D stars
│   │   └── ContactUs.tsx      # Contact form & map
│   └── lib/
│       ├── supabaseClient.ts  # Supabase config
│       └── utils.ts           # Utility functions
├── public/
│   └── sponsors/              # Sponsor logos
├── supabase-schema.sql        # Database schema
├── SETUP.md                   # Setup instructions
└── REGISTRATION_FEATURES.md   # Registration docs
```

## 🎨 Design System

- **Primary Colors:** Gold (#FFD700), Black (#000000)
- **Accent Colors:** Cyber Blue, Pink, Green, Purple
- **Fonts:** Orbitron (tech/headings), Rajdhani (modern/body)
- **Animations:** Shimmer, Float, Glitch, Pulse, Marquee

## 📝 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🔧 Development

The project uses:
- **TypeScript** for type safety
- **ESLint** for code quality
- **Tailwind CSS** for styling
- **shadcn/ui** components (configured)

## 📞 Contact

- **Email:** spectrum2026.dsu@gmail.com
- **Phone:** +92 334 2862602
- **Location:** DHA Suffa University, Karachi
- **Social:** [@acmatdsu](https://instagram.com/acmatdsu)

## 🎓 About DHA Suffa University

Spectrum 2025 is organized by the ACM Chapter at DHA Suffa University, Karachi's leading tech institution.

## 📅 Event Date

**April 9, 2026** | 9:00 AM onwards

## 🏆 Total Prize Pool

**PKR 400,000+**

## 📄 License

This project is private and owned by DHA Suffa University.

---

**Built with ❤️ by the Spectrum 2025 Team**
