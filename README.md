# Smart Student Timetable Planner

A modern, accessible web application for managing your weekly class schedule with ease.

## Features

### Core Features
- ✅ **Add Classes** - Create timetable entries with course name, lecturer, day, and time
- ✅ **Edit & Delete** - Modify or remove classes from your schedule
- ✅ **Weekly Grid View** - Visual representation of your timetable by day and time
- ✅ **List View** - Alternative view to see all classes in a list format
- ✅ **Persistent Storage** - All data saved in browser localStorage

### Enhancement Features
- ✅ **Dark Mode** - Toggle between light and dark themes with system preference detection
- ✅ **Accessibility Settings** - Adjustable font sizes (small, medium, large) and high contrast mode
- ✅ **Toast Notifications** - Real-time feedback for all actions (add, edit, delete)
- ✅ **Form Validation** - Prevents empty fields and invalid time entries
- ✅ **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- ✅ **Color-Coded Classes** - Each class gets a unique color for easy identification

## Technologies Used

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **TailwindCSS v4** - Utility-first CSS framework
- **React Hook Form** - Efficient form management with validation
- **Zustand** - Lightweight state management
- **Lucide React** - Beautiful, consistent icons
- **localStorage** - Browser-based data persistence

## Installation

### Using shadcn CLI (Recommended)

\`\`\`bash
# Create a new Next.js project
npx create-next-app@latest my-timetable-app --typescript

# Navigate to project
cd my-timetable-app

# Copy the code files into your project
# Then install Zustand:
npm install zustand
\`\`\`

### GitHub Installation

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install zustand
   \`\`\`
3. Run development server:
   \`\`\`bash
   npm run dev
   \`\`\`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Adding a Class
1. Click the **+ Add Class** button
2. Fill in the course name, lecturer name, day, start time, and end time
3. Click **Add Class** to save

### Editing a Class
1. Find the class in grid or list view
2. Click the **Edit** icon (pencil)
3. Modify the details
4. Click **Update Class**

### Deleting a Class
1. Find the class in grid or list view
2. Click the **Delete** icon (trash)
3. Confirm the deletion

### Switching Views
- **Grid View**: See all classes organized by day and time in a table format
- **List View**: See all classes in a chronological list

### Customizing Accessibility
1. Click **Accessibility** button
2. Adjust **Font Size** (Small, Medium, Large)
3. Toggle **High Contrast** mode if needed

### Dark Mode
- Click the **Sun/Moon** icon in the top right to toggle dark mode
- Your preference is automatically saved

## Project Structure

\`\`\`
app/
├── layout.tsx              # Root layout with metadata
├── page.tsx                # Main timetable planner page
└── globals.css             # Global styles and theme configuration

components/
├── timetable-form.tsx      # Add/edit class form
├── timetable-grid.tsx      # Weekly schedule grid view
├── timetable-list.tsx      # List view for classes
├── accessibility-settings.tsx  # Accessibility controls
└── toast-notification.tsx  # Toast notification system

lib/
├── types.ts                # TypeScript type definitions
├── store.ts                # Zustand store for state management
└── utils.ts                # Utility functions and constants
\`\`\`

## Accessibility Features

- ✅ **WCAG AA Compliant** - Color contrast meets accessibility standards
- ✅ **Keyboard Navigation** - Full support for keyboard controls
- ✅ **ARIA Labels** - Screen reader friendly with proper ARIA attributes
- ✅ **Semantic HTML** - Proper heading hierarchy and form structure
- ✅ **Font Size Control** - Adjustable text sizes for readability
- ✅ **High Contrast Mode** - Enhanced visibility for users with vision impairments

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment to Vercel

### Via GitHub

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click **Add New** → **Project**
4. Select your repository
5. Click **Deploy**

### Via Vercel CLI

\`\`\`bash
npm i -g vercel
vercel login
vercel
\`\`\`

Your app will be live at a URL provided by Vercel!

## Performance

- **Fast Loading** - Lightweight components and optimized state management
- **Smooth Animations** - CSS transitions for better UX
- **Responsive** - Works on all screen sizes with optimized layouts
- **Accessible** - WCAG AA compliant with keyboard support

## Testing

The app includes basic error handling and validation:

- ✅ Empty field prevention
- ✅ Invalid time prevention
- ✅ Data persistence verification
- ✅ Accessibility testing with screen readers

## Known Limitations

- Data is stored locally in the browser (localStorage)
- Clearing browser data will reset the timetable
- Drag-and-drop rearrangement is not yet implemented (future feature)

## Future Enhancements

- [ ] Drag-and-drop class rearrangement
- [ ] Export timetable as PDF
- [ ] Color customization for individual classes
- [ ] Class location/room information
- [ ] Recurring classes
- [ ] Timetable templates
- [ ] Cloud sync with user accounts
- [ ] Mobile app version

## User Manual

### Getting Started

1. **Create Your Account** - No sign-up needed! All data is stored locally.

2. **Add Your First Class**
   - Click **+ Add Class**
   - Enter course name (e.g., "Data Structures")
   - Enter lecturer name (e.g., "Dr. Smith")
   - Select day of the week
   - Choose start and end times
   - Click **Add Class**

3. **View Your Schedule**
   - Classes appear immediately in both grid and list views
   - Grid view shows times on the left and days across the top
   - Color-coded entries make it easy to distinguish classes

4. **Make Changes**
   - **Edit**: Click the pencil icon and update details
   - **Delete**: Click the trash icon to remove a class
   - Changes are instant and saved automatically

5. **Customize Your Experience**
   - Toggle **Dark Mode** for evening study sessions
   - Adjust **Font Size** for better readability
   - Enable **High Contrast** for accessibility needs

### Tips for Best Experience

- ✓ Add classes in order for better organization
- ✓ Use consistent lecturer names for easy recognition
- ✓ Check time conflicts visually in grid view
- ✓ Save your schedule by backing up your browser data
- ✓ Use list view for quick overview of all classes

### Troubleshooting

**Classes disappeared after browser update?**
- Browser data was cleared. Re-enter your classes or restore from backup if available.

**Dark mode not staying enabled?**
- Make sure cookies/storage is enabled in your browser settings.

**Can't see text clearly?**
- Try adjusting font size or enabling high contrast in Accessibility settings.

## License

MIT

## Support

For issues or questions, please create an issue in the repository or visit the support page.

---

**Build Version**: 1.0.0  
**Last Updated**: November 2025

Happy scheduling! 📚
