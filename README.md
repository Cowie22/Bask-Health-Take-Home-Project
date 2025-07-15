# 📊 Real-Time Customizable Dashboard

A **real-time, customizable dashboard** built with **Next.js 15**, **Node v22.14.0**, **TypeScript**, and **TailwindCSS**. This dashboard features live data updates, theming, responsive widget layouts, and local layout persistence.

---

## 🚀 Features

* 🔄 **Live Data Polling** (every 5s)
* 🎨 **Dynamic Theming** (light/dark mode with dynamic color palettes)
* 📐 **Drag, Resize, and Persist Widgets** (via `react-grid-layout`)
* 🗺️ **Dynamic Maps** (SSR-disabled dynamic import)
* 💾 **LocalStorage Persistence** for user-defined layouts
* 🧩 **Reusable WidgetContainer** for consistent styling and behavior

---

## 📂 Project Structure

```
/contexts          # React Context for shared app state
/components        # Modular Dashboard Widgets and UI components
/lib               # Utility functions (e.g., fetchLiveData)
/app               # Next.js 15 App Router, pages, layouts
/styles            # Tailwind config and global styles
/public            # Static assets
```

---

## ⚙️ Requirements

* **Node.js** v22.14.0
* **npm** or **pnpm**

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Cowie22/real-time-dashboard.git
cd real-time-dashboard
```

### 2. Install Dependencies

```bash
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

Visit [http://localhost:3000](http://localhost:3000) to view the dashboard.

---

## 🎥 Demo Walkthrough

Check out the [📽️ video walkthrough](#) explaining:

* Widget functionality & data sources
* Customization options
* Code architecture
* Theming system

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

* Theming is driven via CSS variables applied dynamically on theme toggle.
* Color palettes are **randomized from server-side endpoint** (`/api/styles`).
* Fonts use **Geist** and **Inter** typefaces.
* Utility-first styling via **TailwindCSS**.

---

## ⚡ Performance Notes

* `react-grid-layout` handles drag & resize with `useCSSTransforms=false` for better runtime performance.
* Maps loaded dynamically to skip SSR.
* `useMemo` used where necessary to optimize re-renders.

---

## 🚧 Future Enhancements

* [ ] WebSocket-based data streams for true real-time updates
* [ ] Backend persistence of user layouts (cross-device)
* [ ] Enhanced error handling for data fetching
* [ ] Settings panel for interval configs, themes, etc.

---

## 👩‍💻 Contributing

PRs and contributions are welcome! Feel free to fork the repo and submit a PR.

---

## 📄 License

MIT License.

---

## 📬 Contact

Questions or suggestions? Reach out via GitHub Issues or connect at **[your-email@example.com](mailto:your-email@example.com)**.
