# Best Plumber & Septic — complete full-stack version

This project is a complete Next.js app with:
- multi-page marketing site
- booking form
- availability API
- booking API
- Supabase storage
- optional owner email notification with Resend

## Before you deploy
1. Create a Supabase project.
2. Run `public/schema.sql` in Supabase SQL Editor.
3. In Vercel, add the environment variables from `.env.example`.
4. Update the booking windows in `lib/site.ts` if the owner's real schedule is different.
5. Redeploy and test one booking.

## Booking payload
The booking API expects:
```json
{
  "name": "",
  "phone": "",
  "service": "",
  "date": "",
  "window": "",
  "details": "",
  "website": ""
}
```

## Notes
- `website` is a hidden honeypot field for spam detection.
- Owner email notifications work only if `RESEND_API_KEY`, `ADMIN_EMAIL`, and `FROM_EMAIL` are added.
- The site will save bookings only after Supabase is connected.
