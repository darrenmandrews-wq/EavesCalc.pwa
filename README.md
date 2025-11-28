# 📐 Eaves Outrigger Calculator (PWA)

![Last Updated](https://img.shields.io/badge/Last%20Updated-Nov%2028%2C%202025-blue)

A Progressive Web App (PWA) for calculating metal eaves outriggers, including allowances for waste/extras.  
Works offline and can be installed on both Android and iPhone.

---

## 🚀 Features
- Calculates brick, window, and alfresco outriggers based on eave depth and wind category.  
- Automatically adds **10% extra** to totals for waste allowance.  
- Generates a printable job report with address and date.  
- Works offline thanks to service worker caching.  
- Installable on mobile devices (Android Chrome, iOS Safari).  

---

## 📱 Installation Guide

### Android (Chrome)
1. Open the app URL: 
2. Tap the **Install App** prompt (or menu → *Install App*).  
3. The app icon will appear on your home screen.  
4. Open it like a native app — it works offline once installed.

### iPhone (Safari)
1. Open the app URL in Safari.  
2. Tap the **Share button → Add to Home Screen**.  
3. The app icon will appear on your home screen.  
4. Launch it from the home screen — it runs standalone and offline.

---

## 🧪 How to Use
1. Enter **job address** and date.  
2. Select **eave depth** to auto‑set outrigger lengths.
3. Start at a corner of the building  
4. Add segments (Brick, Window, Alfresco) with lengths.
5. Finish at the next corner of the building whether its an external corner or an internal corner
6. Start new sections as needed.  
7. Click **Calculate Totals** to see results (with 10% extra included).  
8. Print or save PDF for a job report.  

---

## 🔧 Development Notes
- Built as a static HTML/JS app.  
- Service worker provides offline support and automatic cache busting.  
- To force updates, bump the cache version in `service-worker.js`:  
```js
const CACHE_NAME = "eavescalc-v2";
