# TableWise Company Website PRD

## Original problem statement
Create a company website for a restaurant-business product that helps restaurant owners manage menus and orders, makes operations more convenient, boosts business, explains what the product is, how it helps, and what impact it creates. Include a section for visitors to submit their details so the business can receive the lead by email and WhatsApp. The user supplied a premium mint-green restaurant software reference image and clarified that this is a marketing website, not a functional admin product.

## Product direction
- Product/brand: TableWise
- Audience: Restaurant owners, founders, and operating teams
- Primary goal: Convert qualified restaurant interest into a sales enquiry
- Visual direction: Premium, calm, soft mint-green, white surfaces, restaurant software UI cues, generous spacing
- Date captured: 2026-11-13

## Architecture decisions
- React single-page marketing website with anchor navigation.
- FastAPI `/api/leads` endpoint backed by the existing MongoDB connection.
- Lead form stores restaurant name, owner name, email, WhatsApp number, location count, and timestamp.
- Frontend uses the protected `REACT_APP_BACKEND_URL`; backend uses protected `MONGO_URL` and `DB_NAME`.
- Email and WhatsApp sending providers are not configured; the current site stores the enquiry and provides a successful handoff state.

## Personas
- Independent restaurant owner who wants less operational admin.
- Multi-location restaurant operator who needs consistent menus and visibility.
- Restaurant team member who needs clearer service coordination.

## Core requirements (static)
- Explain the business and product clearly.
- Show benefits for menus, orders, visibility, and business decisions.
- Communicate measurable business impact and quality improvements.
- Include product UI showcase inspired by the supplied reference.
- Provide responsive lead capture form.
- Include email and WhatsApp intent in the contact experience.
- Responsive desktop and mobile presentation.

## Implemented

### 2026-11-13
- Replaced the starter splash screen with a full TableWise company website.
- Added hero section, company value proposition, benefit cards, product showcase, how-it-works story, impact metrics, quote, ROI slider, and footer navigation.
- Added responsive navigation and mobile layout behavior.
- Added lead capture form with client validation and backend persistence.
- Added API validation and MongoDB lead persistence at `POST /api/leads`.
- Added success state after a valid lead submission and a clear failure alert when the API is unavailable.
- Added unique `data-testid` attributes across interactive and critical UI elements.
- Verified production frontend build, external lead API response, desktop preview, mobile layout, and no horizontal overflow.
- Added an animated visual walkthrough showing the TableWise operating rhythm from opening view to service insight.
- Added an honest customer-proof section focused on outcomes while verified testimonials and case-study metrics are being collected.
- Confirmed real email and QR-based WhatsApp delivery remain unconfigured because destination values were not supplied.
- Connected managed transactional email notifications for new leads to `innovexnow@gmail.com`; provider accepted the initial test send with HTTP 202.
- WhatsApp QR alerts remain unconfigured pending the actual WhatsApp Business number.
- Updated the lead destination and reply-to branding from the previous address to `innovexnow@gmail.com`; verified the old address is absent from source and the provider returned HTTP 202.
- Converted the visual walkthrough into three clickable service moments with active states, changing metrics, accessible pressed state, and animated panel transitions.

## Prioritized backlog
- P0: Configure real lead delivery to the business email and WhatsApp inbox.
- P1: Add a real product walkthrough modal or short demo video.
- P1: Connect impact metrics to verified customer case studies.
- P2: Add testimonials, FAQ, and location-specific landing pages.

## Remaining P0/P1/P2 features and next tasks
- P0: Add Resend or equivalent email delivery and a WhatsApp provider/business number.
- P1: Add lead notification preferences and a lightweight enquiry status view.
- P1: Replace illustrative impact figures with approved business data.
- P2: Add analytics for CTA clicks, form starts, and completed enquiries.