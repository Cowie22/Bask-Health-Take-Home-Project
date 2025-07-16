# 📊 Real-Time Customizable Dashboard

Welcome to the **Real-Time Customizable Dashboard**, a feature-rich, real-time data visualization platform built with **Next.js 15**, **TypeScript**, and **TailwindCSS**.

This project was developed for the **Bask Health Frontend Take-Home Test**, focused on delivering a performant, customizable, and visually dynamic dashboard with live data, advanced editing controls, and persistent layout customization.

---

## 🚀 Key Features

- 🔄 **Real-Time Data Polling:** Automatically fetches fresh data from the API every 5 seconds.
- 🎛️ **Customizable Dashboard Layout:** Drag, resize, and reposition widgets with full flexibility.
- 🛠️ **Edit Mode:** Move, delete, and add widgets to tailor the dashboard to your needs.
- 💾 **Persistent Customization:** Layout and widget configurations are saved in LocalStorage.
- 🎨 **Dynamic Random Styles:** Fetched from the server on each load for a fresh aesthetic.
- 🌗 **Light & Dark Theming:** Toggle between light and dark modes seamlessly.
- 📈 **Diverse Data Widgets:** Including sales trends, engagement stats, recent transactions, top products, and a live activity map.
- 📱 **Responsive Design:** Optimized for desktops, tablets, and mobile devices.
- 🧩 **Type Safety:** Full TypeScript coverage across the codebase.
- ⚡ **Performance Optimizations:** Implemented memoization, dynamic imports, and SSR exclusions for smoother performance.

---

## 🧭 User Journey

1. **Landing**
   - Users land on `/dashboard` where widgets display live, real-time data that updates every 5 seconds.

2. **Customizing the Layout**
   - **Move Widgets:** Drag and reposition widgets as desired.
   - **Resize Widgets:** Adjust the size of each widget to prioritize specific data.
   - **Delete Widgets:** Remove widgets from the layout that are unnecessary.
   - **Add Widgets:** Easily add back previously removed widgets via the **Add Widget Panel**.

3. **Edit Mode**
   - Toggle **Edit Mode** on/off to switch between interacting with data and customizing the dashboard layout.

4. **Styling & Theming**
   - Toggle between **Light/Dark Mode**.
   - Styles and color palettes are dynamically fetched from `/api/styles` to ensure a unique look on each load.

5. **Persistence**
   - Custom configurations and layouts are automatically saved to LocalStorage for session persistence.

6. **Device Compatibility**
   - Fully responsive across devices with adaptive layouts for mobile, tablet, and desktop.

---

## 🛠️ Technical Architecture & Design Decisions

| Aspect               | Approach |
|----------------------|----------|
| **Framework**        | Next.js 15 App Router for modern routing and server components. |
| **Styling**          | TailwindCSS with CSS variables for dynamic theming. |
| **Data Fetching**    | Custom polling hook to fetch data every 5 seconds (upgradeable to WebSockets). |
| **State Management** | React Context for global state like theme, edit mode, and current page. |
| **Performance**      | `React.memo`, `useMemo`, and dynamic imports to optimize rendering. |
| **Type Safety**      | TypeScript across components, hooks, and utilities. |
| **Iconography**      | Polaris icon set for a consistent UI/UX. |
| **Persistence**      | LocalStorage for persisting layout and widget configurations. |

---

## 📂 Project Structure

```
/src
/app
/api # Backend API endpoints (styles, proxy, etc.)
/dashboard # Dashboard route and core page
favicon.ico
globals.css
variables.css
layout.tsx # Global layout and theme handler
/components # All UI components and widgets
/contexts # React Context for global states
/customHooks # Custom React hooks for polling, themes, etc.
/lib # Utility libraries for data fetching, chart setup
/types # TypeScript type definitions
/public # Static assets
```

---

## ⚙️ Requirements

- **Node.js:** v22.14.0
- **npm** or **pnpm**
- **nvm:** Recommended for Node version management

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Cowie22/RyanBaskHealth.git
cd RyanBaskHealth
```

### 2. Install Dependencies

```bash
nvm use 22.14.0
npm install
# OR
pnpm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
DASHBOARD_API_TOKEN=your_api_token_here
```

This token is currently a placeholder — replace it with your API token if integrating with an actual backend.

### 4. Run the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the dashboard.  This will auto redirect to /dashboard

---

### 5. Build for Production

```bash
npm run build
npm start
```

---

## 🗺️ Widgets Included

| Widget                  | Description                            |
| ----------------------- | -------------------------------------- |
| **Summary Stats**       | Overview of sales, locations, products |
| **Sales Chart**         | Sales trends over time                 |
| **Engagement Chart**    | Weekly user engagement                 |
| **Recent Transactions** | Latest transactional data              |
| **Top Products**        | Best-selling products leaderboard      |
| **Activity Map**        | Geographic activity visualization      |

---

## 🎨 Theming & Styling

- CSS variables dynamically update on theme toggle.
- Dynamic color palettes fetched via `/api/styles`.
- Fonts: **Geist** and **Inter**.
- Styles adhere to **Figma Tokens** and **Pixel-Perfect Design** requirements.

---

## ⚡ Performance Enhancements

- **Dynamic Imports:** Reduce initial JS payload, especially for large components like the map.
- **Memoization:** `React.memo` and `useMemo` used where appropriate.
- **No SSR for Maps:** Skips SSR on components that do not support it.
- **Responsive Design:** Tailwind CSS ensures mobile responsiveness.

---

## 🎥 Demo Walkthrough

A recorded walkthrough video demonstrating:

- Dashboard usage & widget interactions
- Adding, moving, resizing, and deleting widgets
- Edit mode features
- Theming & styling dynamics
- Architectural design choices

👉 **📽️ Watch the Demo**

---

## 🚧 Future Enhancements

- [ ] Upgrade polling to **WebSocket streaming**
- [ ] Persist layouts server-side for **cross-device syncing**
- [ ] Enhanced error boundaries and retry mechanisms
- [ ] User settings for refresh intervals, default themes, etc.
- [ ] Role-based dashboards with authentication

---

## 🔍 Available Scripts

| Command         | Purpose                  |
|-----------------|--------------------------|
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm start`     | Start the production app |
| `npm run lint`  | Run code linting         |

---

## 📬 Contact

- 📧 Email: [rjcowie1@gmail.com](mailto:rjcowie1@gmail.com)
- 🧑‍💻 GitHub: [Cowie22](https://github.com/Cowie22)

## Live Demo

> **Deployed on Vercel** for optimal Next.js hosting.

Check out the live dashboard here: [Real-Time Dashboard](https://real-time-dashboard-two.vercel.app/dashboard)
