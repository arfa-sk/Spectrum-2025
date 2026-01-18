# Spectrum 2025 - Setup Guide

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase Configuration
# Get these values from your Supabase project settings
# https://app.supabase.com/project/_/settings/api

NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Supabase Setup

### 1. Create a Supabase Project

1. Go to [Supabase](https://supabase.com/) and create a new project
2. Wait for the project to be provisioned
3. Go to Project Settings > API to get your credentials

### 2. Run the Database Schema

1. Open the SQL Editor in your Supabase dashboard
2. Copy the contents of `supabase-schema.sql`
3. Paste and execute it in the SQL Editor
4. Verify the `registrations` table was created successfully

### 3. Configure Environment Variables

1. Copy your Project URL and anon/public key from Project Settings > API
2. Create `.env.local` in your project root
3. Add the credentials as shown above

## Running the Project

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Testing the Registration Form

1. Navigate to `http://localhost:3000/register`
2. Fill out the form with test data
3. Submit the form
4. Check your Supabase dashboard > Table Editor > registrations to verify the data was inserted

## Features

- ✅ Form validation (client-side)
- ✅ Dynamic sub-category dropdown
- ✅ Supabase integration
- ✅ Success/Error messages
- ✅ Loading states
- ✅ Beautiful animations
- ✅ Responsive design
- ✅ Email format validation
- ✅ Phone number validation

## Registration Categories

### Play To Win
- Singing
- Dance
- Stand-up Comedy
- Short Film
- Art
- Photography

### Hackathon
- Web Dev
- Mobile App
- Data Science
- Cyber Security
- UI/UX
- Startup Ideathon

### Gaming Arena
- PUBG
- Valorant
- FIFA
- Tekken

## Troubleshooting

### "Failed to fetch" error
- Check that your Supabase credentials are correct
- Verify the `registrations` table exists
- Check that RLS policies are set up correctly

### "Invalid email" error
- Ensure email follows standard format (user@domain.com)

### "Invalid phone number" error
- Phone should be 10-11 digits
- Can include +92 prefix

## Next Steps

- [ ] Set up email notifications (Supabase Edge Functions)
- [ ] Create admin dashboard to view registrations
- [ ] Add payment integration (if needed)
- [ ] Send confirmation emails
- [ ] Add CAPTCHA for spam prevention

