# 🔐 Admin System Setup Guide

## Overview
Complete admin system with authentication, protected routes, and data management for Spectrum 2025.

## 🗄️ Database Setup

### 1. Run Admin Policies SQL
Execute `supabase-admin-policies.sql` in Supabase SQL Editor:

```sql
-- This will:
-- 1. Drop overly permissive SELECT policy
-- 2. Create authenticated-only SELECT policy
-- 3. Keep public INSERT policy for registrations
-- 4. Create admin_users table (optional)
```

### 2. Create Admin User
In Supabase Dashboard → Authentication → Users:
1. Click "Add user"
2. Enter admin email and password
3. Confirm email if required

**OR** via SQL (replace with your email):
```sql
INSERT INTO auth.users (email, encrypted_password, email_confirmed, created_at, updated_at)
VALUES ('admin@spectrum2025.com', crypt('your_password', gen_salt('bf')), true, now(), now());
```

## 🚀 Admin Features

### Routes Created
- `/admin` - Main dashboard with stats
- `/admin/login` - Authentication page
- `/admin/stats` - Registration statistics
- `/admin/registrations` - All registration records

### Security Features
- ✅ **RLS Policies**: Only authenticated users can read data
- ✅ **Protected Routes**: Automatic redirect to login
- ✅ **Session Management**: Persistent authentication
- ✅ **Public Registration**: Still works for everyone

## 📊 Admin Dashboard Features

### Dashboard (`/admin`)
- Total registrations count
- Today's registrations
- Category breakdown
- System status indicators
- Quick action links

### Statistics (`/admin/stats`)
- Category-wise registration counts
- Export to CSV functionality
- Real-time data refresh
- Visual summary cards

### Registrations (`/admin/registrations`)
- Complete registration list
- Search and filter functionality
- Sort by various fields
- Export to CSV
- Terms acceptance tracking

## 🔧 Technical Implementation

### Authentication Context
- `src/lib/authContext.tsx` - Global auth state management
- Uses Supabase Auth for login/logout
- Automatic session persistence

### Protected Routes
- `src/components/ProtectedRoute.tsx` - Route protection wrapper
- Redirects unauthenticated users to login
- Loading states during auth checks

### Database Integration
- Uses existing `supabaseClient.ts`
- Leverages `registration_stats` view
- RLS policies control data access

## 🎯 User Flows

### Admin Login Flow
1. Visit `/admin` → Redirected to `/admin/login`
2. Enter email/password → Supabase Auth
3. Success → Redirected to `/admin/dashboard`
4. Session persists across page refreshes

### Public Registration Flow
1. Visit `/register` → Form loads normally
2. Fill form → Data saved to `registrations` table
3. Success message → Form resets
4. Admin can view in `/admin/registrations`

## 🔒 Security Model

### Database Level
- **INSERT**: Public (anyone can register)
- **SELECT**: Authenticated only (admin access)
- **UPDATE/DELETE**: Not implemented (read-only for now)

### Application Level
- Protected routes check authentication
- Automatic redirects for unauthorized access
- Session-based authentication state

## 📝 Usage Instructions

### For Admins
1. **Login**: Go to `/admin/login`
2. **Dashboard**: View overview at `/admin`
3. **Stats**: Analyze data at `/admin/stats`
4. **Registrations**: Manage participants at `/admin/registrations`
5. **Export**: Download CSV files for external analysis

### For Public Users
- Registration form remains fully functional at `/register`
- No authentication required
- All existing features preserved

## 🛠️ Customization

### Adding New Admin Features
1. Create new page in `/admin/` directory
2. Wrap with `<ProtectedRoute>` component
3. Use `useAuth()` hook for user data
4. Query Supabase with authenticated client

### Modifying Permissions
- Update RLS policies in Supabase
- Modify `ProtectedRoute` logic
- Add role-based access if needed

### Styling
- Uses existing Tailwind classes
- Matches site's gold/black theme
- Responsive design included

## 🐛 Troubleshooting

### Login Issues
- Check Supabase Auth settings
- Verify user exists in Authentication tab
- Check browser console for errors

### Data Not Loading
- Verify RLS policies are correct
- Check Supabase connection
- Ensure user is authenticated

### Permission Errors
- Confirm SELECT policy allows authenticated users
- Check if user is properly logged in
- Verify database permissions

## 📈 Analytics Features

### Registration Stats View
- Pre-built SQL view for quick analytics
- Category breakdowns
- Unique participant counts
- Sortable and filterable

### Export Capabilities
- CSV export for all data
- Filtered exports supported
- Timestamped filenames
- Excel-compatible format

## 🔄 Maintenance

### Regular Tasks
- Monitor registration counts
- Export data for backup
- Check system status indicators
- Review user access logs

### Updates
- Database schema changes
- New admin features
- Security policy updates
- UI/UX improvements

## 📞 Support

### Common Issues
1. **Can't login**: Check user exists in Supabase Auth
2. **No data visible**: Verify RLS policies
3. **Export fails**: Check browser permissions
4. **Slow loading**: Check Supabase connection

### Debug Steps
1. Check browser console for errors
2. Verify Supabase dashboard for data
3. Test authentication in Supabase Auth tab
4. Check network requests in DevTools

---

## 🎉 Ready to Use!

Your admin system is now fully functional:
- ✅ Secure authentication
- ✅ Protected admin routes  
- ✅ Data management tools
- ✅ Export capabilities
- ✅ Public registration preserved

**Next Steps:**
1. Create admin user in Supabase
2. Test login at `/admin/login`
3. Explore dashboard features
4. Monitor registrations in real-time

**Admin URL**: `https://yoursite.com/admin`
**Login URL**: `https://yoursite.com/admin/login`
