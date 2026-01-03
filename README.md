# Party-Up.be Website

A modern, no-nonsense party rental website for Party-Up.be (Power Up BV).

## Features

- **Home Page**: Hero section, value proposition, category preview, and testimonials
- **Product Catalog**: Browse items by category with detailed product cards
- **Booking System**: Multi-step booking form with validation
- **Content Pages**: Pricing, FAQ, Contact, Reviews, and Legal pages
- **Email Integration**: Booking confirmations and notifications (placeholder implementation)
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form with Zod validation
- **Email**: Email service integration (placeholder - needs actual service)

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
party-up/
├── app/                    # Next.js app directory
│   ├── (main)/            # Main route group
│   │   ├── page.tsx       # Home page
│   │   ├── catalog/       # Catalog pages
│   │   ├── booking/        # Booking page
│   │   ├── pricing/        # Pricing page
│   │   ├── faq/           # FAQ page
│   │   ├── contact/       # Contact page
│   │   ├── reviews/        # Reviews page
│   │   └── legal/          # Legal pages
│   ├── api/               # API routes
│   │   └── booking/       # Booking API
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── layout/            # Layout components
│   ├── sections/          # Page sections
│   ├── catalog/           # Catalog components
│   └── booking/           # Booking components
├── lib/                   # Utilities
│   ├── data/              # Product data
│   ├── email.ts           # Email utilities
│   └── utils.ts           # Helper functions
├── types/                 # TypeScript types
└── public/                # Static assets
```

## Configuration

### Email Service

The email functionality is currently a placeholder. To enable actual email sending:

1. Choose an email service (Resend, SendGrid, Nodemailer, etc.)
2. Install the appropriate package
3. Update `lib/email.ts` with the actual email sending implementation
4. Add environment variables for API keys

### Environment Variables

Create a `.env.local` file for environment variables:

```env
# Email service configuration (example for Resend)
RESEND_API_KEY=your_api_key_here
```

## Brand Guidelines

- **Slogan**: "No Nonsense Party Rental!"
- **Tone**: Practical, reliable, clear communication
- **Target Audience**: Private individuals and small businesses (10-100 guests)
- **Colors**: Primary (red) and Secondary (blue) as defined in `tailwind.config.ts`

## Legal Pages

All legal pages (Terms, Privacy Policy, Liability Waiver) are placeholders and **must be reviewed by a legal professional** before going live. They are marked with warning notices.

## Next Steps

1. **Email Integration**: Set up actual email service (Resend, SendGrid, etc.)
2. **Database**: Add database for booking management and inventory
3. **Admin Dashboard**: Build admin interface for managing reservations
4. **Images**: Add product images and logo
5. **Google Maps**: Integrate Google Maps API for contact page
6. **Analytics**: Add analytics tracking
7. **SEO**: Optimize for Belgian market (Dutch/French keywords)

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## License

Copyright © Power Up BV - Party-Up.be

