# 🚀 Quick Start Guide - Registration System

## ⚡ 3-Minute Setup

### Step 1: Supabase Setup (2 minutes)

1. **Create Project**
   ```
   Go to: https://supabase.com/
   → Create New Project
   → Wait for provisioning
   ```

2. **Run Database Schema**
   ```
   → Open SQL Editor in Supabase
   → Copy contents of supabase-schema.sql
   → Paste and Execute
   → Verify "registrations" table created
   ```

3. **Get Credentials**
   ```
   → Settings → API
   → Copy "Project URL"
   → Copy "anon/public key"
   ```

### Step 2: Environment Variables (30 seconds)

Create `.env.local` in project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

### Step 3: Run & Test (30 seconds)

```bash
npm run dev
```

Navigate to: `http://localhost:3000/register`

---

## 📋 Registration Form Fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Full Name | Text | ✅ | - |
| Email | Email | ✅ | Format validated |
| Phone | Text | ✅ | +92 format |
| University | Text | ✅ | - |
| Department | Text | ❌ | Optional |
| Roll Number | Text | ❌ | Optional |
| Main Category | Dropdown | ✅ | 3 options |
| Sub-Category | Dropdown | ✅ | Dynamic (6/6/4) |
| Team Name | Text | ❌ | Optional |
| Team Members | Textarea | ❌ | Multi-line |
| Message | Textarea | ❌ | Optional |

---

## 🎯 Event Categories & Sub-Categories

### 1. Suffa's Got Talent
- Singing
- Dance
- Stand-up Comedy
- Short Film
- Art
- Photography

### 2. Hackathon (PKR 150,000)
- Web Dev
- Mobile App
- Data Science
- Cyber Security
- UI/UX
- Startup Ideathon

### 3. Gaming Arena (PKR 50,000)
- PUBG
- Valorant
- FIFA
- Tekken

---

## ✅ What Works Out of the Box

- [x] Form validation (email, phone, required fields)
- [x] Dynamic sub-category filtering
- [x] Supabase data insertion
- [x] Success/error messages
- [x] Loading states
- [x] Form auto-reset on success
- [x] Beautiful animations
- [x] Responsive design
- [x] Back to home link
- [x] All CTAs updated across site

---

## 🎨 UI Features

- Gold (#FFD700) and Black theme
- Mouse glow effect
- Floating background elements
- Shimmer text animations
- Focus states on inputs
- Error indicators
- Loading spinner
- Success/error message boxes

---

## 📂 Files Created

```
✅ src/app/register/page.tsx         - Main form
✅ src/app/register/layout.tsx       - SEO metadata
✅ supabase-schema.sql               - Database
✅ SETUP.md                          - Full guide
✅ REGISTRATION_FEATURES.md          - Features
✅ REGISTRATION_SUMMARY.md           - Summary
✅ QUICK_START.md                    - This file
✅ README.md (updated)               - Project info
```

## 📝 Files Updated

```
✅ src/app/page.tsx              - Register links
✅ src/components/Navbar.tsx     - Register button
✅ src/components/HeroSection.tsx - CTA button
```

---

## 🔍 Testing Checklist

- [ ] Form loads at `/register`
- [ ] Validation shows errors on empty submit
- [ ] Email validation works
- [ ] Phone validation works
- [ ] Main category dropdown works
- [ ] Sub-category auto-filters
- [ ] Sub-category disabled without main
- [ ] Submit button shows loading state
- [ ] Success message appears
- [ ] Data appears in Supabase
- [ ] Form resets after success

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| "Failed to fetch" | Check .env.local credentials |
| "Table doesn't exist" | Run supabase-schema.sql |
| "Invalid email" | Use format: user@domain.com |
| "Invalid phone" | Use 10-11 digits, +92 optional |
| Form not submitting | Check browser console for errors |

---

## 📊 View Registrations

### In Supabase Dashboard:
```
1. Go to Table Editor
2. Select "registrations" table
3. View all submissions
```

### Query Statistics:
```sql
SELECT * FROM registration_stats;
```

---

## 🎯 Routes

- `/` - Homepage
- `/register` - Registration form ✅ NEW
- `/sponsors` - Coming soon

---

## 💡 Pro Tips

1. **Prevent Duplicates:** Add unique constraint on email in Supabase
2. **Email Confirmations:** Use Supabase Edge Functions
3. **CAPTCHA:** Add reCAPTCHA for spam prevention
4. **Analytics:** Track form abandonment
5. **A/B Testing:** Test different form layouts

---

## 📞 Support

- Check `SETUP.md` for detailed setup
- Check `REGISTRATION_FEATURES.md` for all features
- Check `REGISTRATION_SUMMARY.md` for overview
- Check browser console for errors
- Check Supabase logs for database issues

---

## 🎉 You're All Set!

Your registration system is **production-ready**! 

Just:
1. Set up Supabase (2 min)
2. Add .env.local (30 sec)
3. Run npm run dev (30 sec)

**Total setup time: ~3 minutes**

Then start accepting registrations! 🚀

---

**Questions?** Check the documentation files or review the code comments.

