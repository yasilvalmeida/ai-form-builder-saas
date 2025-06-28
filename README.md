# AI Form Builder SaaS

A modern, full-featured form builder with AI-powered field generation, drag-and-drop interface, and comprehensive form management.

![AI Form Builder](https://via.placeholder.com/800x400?text=AI+Form+Builder+SaaS)

## 🚀 Features

### Core Features

- **Drag & Drop Form Builder** - Intuitive interface to create forms without coding
- **AI-Powered Field Generation** - Auto-generate labels, validations, and descriptions using OpenAI
- **Real-time Form Preview** - See exactly how your form will look
- **Public Form Sharing** - Get shareable links to collect responses instantly
- **Response Dashboard** - Track and analyze form submissions
- **Form Management** - Create, edit, publish/unpublish, and delete forms

### Field Types Supported

- Text Input
- Email
- Number
- Textarea
- Select/Dropdown
- Checkbox (Multiple choice)
- Radio Button (Single choice)

### Advanced Features

- **Field Validation** - Min/max values, required fields, email validation
- **Responsive Design** - Works perfectly on desktop and mobile
- **Modern UI** - Built with Tailwind CSS and Radix UI components
- **TypeScript** - Fully typed for better development experience
- **SQLite Database** - Simple setup with Prisma ORM

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Backend**: Next.js API Routes
- **Database**: SQLite with Prisma ORM
- **UI**: Tailwind CSS, Radix UI, Lucide Icons
- **Drag & Drop**: @dnd-kit
- **AI**: OpenAI GPT-3.5 Turbo
- **Form Handling**: React Hook Form, Zod

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ai-form-builder-saas
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your OpenAI API key:

   ```
   DATABASE_URL="file:./dev.db"
   OPENAI_API_KEY="your-openai-api-key-here"
   NEXTAUTH_SECRET="your-nextauth-secret"
   NEXTAUTH_URL="http://localhost:3000"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

4. **Set up the database**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

### Creating a Form

1. **Navigate to the home page** and click "Create Your First Form"
2. **Add a title and description** for your form
3. **Drag field types** from the sidebar to the form builder area
4. **Click on any field** to edit its properties (label, placeholder, validation, etc.)
5. **Use the AI features** to auto-generate field content
6. **Preview your form** using the Preview tab
7. **Save and publish** your form to make it public

### AI Features

- **Generate AI Fields**: Click the "Generate AI Fields" button to automatically create relevant fields based on your form title and description
- **Enhance Field Properties**: Select any field and use the AI button to generate better labels, placeholders, and descriptions

### Sharing Forms

1. **Publish your form** from the dashboard
2. **Copy the public link** or click the external link icon
3. **Share the link** with your audience
4. **View responses** in the dashboard

### Managing Responses

- Access the **Dashboard** to see all your forms
- Click the **chart icon** next to any form to view responses
- **Export data** or analyze submission patterns

## 🎨 Screenshots

### Form Builder Interface

```
┌─────────────────────────────────────────────────────────────┐
│ [Sidebar]          [Form Builder]          [Field Editor]    │
│                                                             │
│ • Text Input       ┌─────────────────┐    ┌───────────────┐ │
│ • Email           │ Drag fields     │    │ Field Props   │ │
│ • Number          │ here to build   │    │               │ │
│ • Select          │ your form       │    │ • Label       │ │
│ • Checkbox        │                 │    │ • Placeholder │ │
│ • Textarea        │                 │    │ • Required    │ │
│ • Radio           │                 │    │ • Validation  │ │
│                   └─────────────────┘    └───────────────┘ │
│ [🤖 Generate AI Fields]                                     │
└─────────────────────────────────────────────────────────────┘
```

### Dashboard

```
┌─────────────────────────────────────────────────────────────┐
│ AI Form Builder                                [+ New Form] │
├─────────────────────────────────────────────────────────────┤
│ Your Forms                                                  │
│                                                             │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐            │
│ │ Contact Form│ │ Survey Form │ │ Event RSVP  │            │
│ │ Published   │ │ Draft       │ │ Published   │            │
│ │ 5 fields    │ │ 8 fields    │ │ 3 fields    │            │
│ │ [Edit][📊]  │ │ [Edit][📊]  │ │ [Edit][📊]  │            │
│ └─────────────┘ └─────────────┘ └─────────────┘            │
└─────────────────────────────────────────────────────────────┘
```

## 🔧 Configuration

### Database

The app uses SQLite by default for simplicity. To use PostgreSQL or MySQL:

1. Update `DATABASE_URL` in `.env`
2. Change the provider in `prisma/schema.prisma`
3. Run `npx prisma db push`

### AI Configuration

- Get your OpenAI API key from [OpenAI Dashboard](https://platform.openai.com/api-keys)
- Add it to your `.env` file as `OPENAI_API_KEY`
- The app uses GPT-3.5 Turbo for cost efficiency

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- Heroku
- DigitalOcean App Platform

## 🧪 Testing

```bash
# Run the development server
npm run dev

# Test form creation
1. Create a new form
2. Add various field types
3. Test AI generation
4. Publish and test public form
5. Submit responses and view in dashboard
```

## 📝 API Endpoints

- `GET /api/forms` - List all forms
- `POST /api/forms` - Create a new form
- `GET /api/forms/[id]` - Get form details
- `PUT /api/forms/[id]` - Update form
- `DELETE /api/forms/[id]` - Delete form
- `POST /api/responses` - Submit form response
- `POST /api/ai/generate-fields` - Generate AI fields

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Roadmap

### Upcoming Features

- [ ] **Multi-language Support** - Internationalization for form labels and interface
- [ ] **PDF Export** - Export form responses as PDF reports
- [ ] **Advanced Analytics** - Charts and insights for form performance
- [ ] **Form Templates** - Pre-built templates for common use cases
- [ ] **Conditional Logic** - Show/hide fields based on user responses
- [ ] **File Upload Fields** - Allow users to upload files
- [ ] **Email Notifications** - Send emails when forms are submitted
- [ ] **Custom Styling** - Theme customization for public forms
- [ ] **API Webhooks** - Send form data to external services
- [ ] **Team Collaboration** - Multiple users per account

### Bonus Features (Implemented)

- ✅ **Drag & Drop Interface** - Intuitive form building
- ✅ **AI Field Generation** - Smart field suggestions
- ✅ **Public Form Sharing** - Shareable links
- ✅ **Response Dashboard** - View and manage submissions
- ✅ **Form Validation** - Client and server-side validation
- ✅ **Responsive Design** - Mobile-friendly interface

## 💡 Tips

- **Start Simple**: Begin with basic field types and gradually add complexity
- **Use AI Wisely**: AI generation works best with descriptive form titles
- **Test Thoroughly**: Always test your forms before sharing publicly
- **Monitor Responses**: Regularly check the dashboard for new submissions

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page for existing problems
2. Create a new issue with detailed information
3. Include error messages and steps to reproduce

---

**Built with ❤️ using Next.js, React, and AI**
