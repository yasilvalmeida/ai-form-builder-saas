# 🤖 AI Form Builder SaaS

A modern, full-featured form builder that leverages AI to generate fields, labels, and validations automatically. Includes a drag-and-drop interface, public form sharing, and a full submission dashboard.

![AI Form Builder](https://via.placeholder.com/800x400?text=AI+Form+Builder+SaaS)

---

## ✨ Features

- 🚀 Drag & Drop form builder interface
- 🤖 AI-powered field generation (labels, descriptions, validations)
- 📱 Responsive design for mobile and desktop
- 🔗 Public form sharing with live previews
- 📊 Dashboard to track and analyze responses
- ✅ Field types: text, email, number, textarea, select, radio, checkbox
- 🔐 Form publishing and visibility control
- 🧠 Built with Next.js 14, Tailwind CSS, Prisma, and OpenAI

---

## 📦 Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Radix UI, Lucide Icons
- **State & Forms**: React Hook Form, Zod, Zustand
- **Drag & Drop**: @dnd-kit
- **Database**: Prisma + SQLite (dev), PostgreSQL (prod-ready)
- **AI**: OpenAI GPT-3.5 Turbo
- **Auth**: NextAuth.js
- **API Routes**: Next.js API layer

---

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- OpenAI API key
- npm, yarn or pnpm

### Setup

```bash
# 1. Clone the repo
git clone https://github.com/your-username/ai-form-builder-saas
cd ai-form-builder-saas

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env
# Edit .env with your OpenAI key and auth config
```

Example `.env`:

```
DATABASE_URL="file:./dev.db"
OPENAI_API_KEY="sk-..."
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

```bash
# 4. Setup the database
npx prisma generate
npx prisma db push

# 5. Start dev server
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🧪 Usage Guide

### Create a Form

1. Click “New Form” on the dashboard
2. Drag and drop fields from the sidebar
3. Click fields to edit properties (label, required, etc.)
4. Use **Generate AI Fields** to auto-create inputs
5. Save & publish — get a sharable public link

### Share & Collect Responses

- Copy the form’s public link
- Share via email, embed, or QR code
- View real-time submissions in the dashboard

### Dashboard Actions

- 📝 Edit or duplicate forms
- 📊 View response summaries
- 📤 Export to CSV
- 📎 Copy share links
- 🔒 Unpublish to hide forms

---

## 📁 Project Structure

```
.
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Dashboard
│   ├── form/[id]/          # Public form display
│   └── api/                # API endpoints
├── components/             # Builder UI, Field Editor, etc.
├── lib/                    # OpenAI, Prisma, validators
├── prisma/schema.prisma    # DB models
├── public/                 # Icons, logos
└── styles/                 # Tailwind config
```

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push your repo to GitHub
2. Import to [vercel.com](https://vercel.com)
3. Set `.env` values in dashboard
4. Hit deploy 🎉

### Docker (Optional)

```bash
docker build -t ai-form-builder .
docker run -p 3000:3000 ai-form-builder
```

---

## 🧠 AI Capabilities

- 🧾 AI Field Generation: Generates multiple fields from a title
- 🧠 Smart Labels: Improves placeholder/label text
- ✍️ Description Suggestions: Auto-fills form instructions
- ✅ Smart Validation: Email, required, min/max auto detection

---

## 📝 API Reference

- `GET /api/forms` – List user forms
- `POST /api/forms` – Create form
- `PUT /api/forms/:id` – Update form
- `DELETE /api/forms/:id` – Delete form
- `GET /api/forms/:id/responses` – Get responses
- `POST /api/responses` – Submit public form
- `POST /api/ai/generate-fields` – Generate AI field suggestions

---

## 🔐 Auth

- Powered by `NextAuth.js`
- Providers supported: Credentials (email/pass), GitHub, Google
- Protect form editing routes
- Public routes allow submissions without auth

---

## 🎯 Roadmap

- [ ] Conditional logic (show/hide fields)
- [ ] Email & webhook notifications
- [ ] File upload fields
- [ ] Analytics dashboard (charts, stats)
- [ ] Form templates & library
- [ ] PDF export of submissions
- [ ] Role-based access control (RBAC)
- [ ] Multi-language UI

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch
3. Make your changes
4. Submit PR with detailed description

---

## 📄 License

MIT — Feel free to use and modify this project.

---

## 💬 Support

- [Open Issues](https://github.com/your-username/ai-form-builder-saas/issues)
- Create a new issue for bugs or enhancements
- Star the repo if you find it useful ⭐

---

**Built with ❤️ by developers who love forms and AI**
