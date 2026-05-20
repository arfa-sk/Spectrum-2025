# Supabase DB Documentation

## 1. Overview
This document captures the Supabase database schema and the registration error analysis for the Spectrum 2025 site.

- App backend uses Supabase `public` schema for registration data.
- Registration writes are performed in `src/app/api/register/route.ts`.
- The registration table is a single flat table named `public.registrations`.

## 2. `public.registrations` schema

| Column | Type | Nullable | Default | Notes |
|---|---|---|---|---|
| id | uuid | NO | `uuid_generate_v4()` | Primary key |
| full_name | text | NO | null | Required |
| email | text | NO | null | Required |
| phone_number | text | NO | null | Required |
| university | text | NO | null | Required in schema, but app currently inserts `""` when no value is provided |
| department | text | YES | null | Optional |
| roll_number | text | YES | null | Optional |
| main_category | text | NO | null | Required |
| sub_category | text | NO | null | Required |
| team_name | text | YES | null | Optional |
| team_logo_url | text | YES | null | Optional |
| team_members | text | YES | null | Optional, serialized team details |
| terms_accepted | boolean | NO | `true` | Required |
| created_at | timestamptz | YES | `now()` | Auto timestamp |
| updated_at | timestamptz | YES | `now()` | Auto timestamp |

## 3. `public.registrations` constraints

- Primary key: `registrations_pkey` on `id`
- Several `NOT NULL` constraints on required columns:
  - `full_name`
  - `email`
  - `phone_number`
  - `university`
  - `main_category`
  - `sub_category`
  - `terms_accepted`

## 4. Relevant application code

The registration insert happens in:

- `src/app/api/register/route.ts`

Key logic:

- Parses `FormData` from the POST request.
- Validates required fields.
- Uploads team logo to Supabase storage if provided.
- Serializes team members and hackathon details.
- Inserts into `public.registrations` using:
  - `university: body.university?.trim() || ""`
  - `sub_category: body.subCategory || "General"`

## 5. Error analysis

### Root cause location
The production error `Registration failed.` is being returned from the `regError` branch in `src/app/api/register/route.ts`.
That means the failure occurred during the Supabase insert into `public.registrations`, not in the front-end validation or the upload step.

### Likely cause from current schema
From the inspected schema, the most important point is:

- `public.registrations.university` is `TEXT NOT NULL`.
- The code already avoids inserting `null` for `university` by using `|| ""`.

Therefore, a simple `university` NULL violation is unlikely with the current server code.

### Most probable causes now
The remaining likely causes are:

1. A different required field failed the insert because it was missing or malformed during the POST.
2. A Supabase backend constraint or policy blocked the insert.
3. There is a hidden mismatch between the POST payload and column names/types.
4. The generic `Registration failed.` response is masking the actual DB error.

### What is not the issue
- The schema inspection query error `column "command" does not exist` is unrelated to the registration failure.
  - That error came from a bad metadata/query request while inspecting the database.
  - It does not reflect anything inside `public.registrations` or the app logic.

## 6. Recommended next steps

1. Add or inspect server-side logging for the exact Supabase error returned by `regError`.
   - Example: log `regError.message`, `regError.code`, and `regError.details`.
2. Confirm that the POST request includes all required fields:
   - `fullName`, `email`, `phoneNumber`, `mainCategory`, `subCategory`, `termsAccepted`
3. Verify Supabase RLS/policies for `public.registrations` if the insert is made by a service role or anon key.
4. If `university` should truly be optional, consider making the database column nullable or default to `""`.

## 7. Notes for the team

- The current application code is aware of optional university input and already substitutes an empty string.
- If the goal is to make `university` optional at the DB level, the table schema must be changed to `university TEXT` or a default `''` value.
- For debug clarity, do not return the generic `Registration failed.` alone; preserve the underlying error in logs.

## 8. Source files

- `src/app/api/register/route.ts`
- `supabase-schema-flat.sql`

---

_Last updated: May 21, 2026_
