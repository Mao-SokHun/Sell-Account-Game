# 🇰🇭 ROBLOX KHMER VAULT - ឯកសាររចនាសម្ព័ន្ធគម្រោង (PROJECT STRUCTURE & ARCHITECTURE)

វេទិកាទីផ្សារទិញ-លក់ Account Roblox ស្វ័យប្រវត្តិតាមបាគង KHQR សម្រាប់ប្រទេសកម្ពុជា (Khmer-First Automated Roblox Account Marketplace with Bakong KHQR).

---

## 📁 ១. រចនាសម្ព័ន្ធថត និងឯកសារ (Folder & File Architecture)

គម្រោងត្រូវបានរៀបចំជា ២ ផ្នែកដាច់ដោយឡែកពីគ្នា គឺ `frontend` និង `backend` (ដែលនឹងត្រូវបង្កើតពេលក្រោយ)៖

```text
Account Game/
├── frontend/                               # 📂 ផ្នែក Frontend (React + Vite + Modern Vanilla CSS)
│   ├── public/
│   │   └── images/                         # 🖼️ រូបភាព Gameplay & Avatar កម្រិតច្បាស់ 4K
│   │       ├── bloxfruits.jpg              # រូបភាព Blox Fruits Max Lv + Kitsune V2
│   │       ├── avatar_rich.jpg             # រូបភាព VIP Avatar Dominus + Korblox Leg
│   │       ├── petsim.jpg                  # រូបភាព Pet Simulator 99 Huge Titanic Pets
│   │       └── bladeball.jpg               # រូបភាព Blade Ball Mythic RGB Blade
│   │
│   ├── src/
│   │   ├── components/                     # 🧩 UI Components ឯករាជ្យ និងអាចប្រើឡើងវិញបាន
│   │   │   ├── Navbar.jsx                  # Header, Search, Buyer Tag, History (គ្មាន Admin button លើទំព័រដើម)
│   │   │   ├── HeroBanner.jsx              # បដាផ្សព្វផ្សាយហាង Roblox កម្ពុជា (No register, 100% safe)
│   │   │   ├── ProductList.jsx             # បញ្ជីរាយនាម Account, Category tabs & Filter
│   │   │   ├── ProductCard.jsx             # កាតផលិតផល Roblox (គ្មានការជាន់គ្នានៃ Badges ឡើយ)
│   │   │   ├── ProductDetail.jsx           # 🌟 ទំព័រ ២ ជួរឈរ (Left: ពិពណ៌នា, Right: បាគង KHQR)
│   │   │   ├── AccountSuccessModal.jsx     # 🌟 Modal បង្ហាញ Username & Password ក្រោយទូទាត់ជោគជ័យ
│   │   │   ├── AdminAuthModal.jsx          # 🌟 ច្រក Login & Register សម្រាប់តែ Admin (/owner)
│   │   │   ├── AdminDashboard.jsx          # 🌟 ផ្ទាំងគ្រប់គ្រង Admin បន្ថែម & កែប្រែ Account ដាក់លក់
│   │   │   ├── PurchaseHistoryModal.jsx    # ផ្ទាំងពិនិត្យ Account ដែលអ្នកទិញបានទិញរួចរាល់
│   │   │   └── Footer.jsx                  # បាតទំព័រ, វិធីទូទាត់បាគង & Telegram Support
│   │   │
│   │   ├── data/
│   │   │   └── initialProducts.js          # ទិន្នន័យគណនី Roblox គំរូ pre-loaded ជាមួយ Stats & Login Creds
│   │   │
│   │   ├── utils/
│   │   │   └── currency.js                 # មុខងារប្តូរប្រាក់ USD & KHR (1$ = 4,100៛) & KHQR EMV String
│   │   │
│   │   ├── App.jsx                         # Main Application State, URL Route (/owner), Global Modals
│   │   ├── index.css                       # Modern Dark Gaming Design System + Kantumruy Pro Font
│   │   └── main.jsx                        # React 19 Client Entrypoint
│   │
│   ├── index.html                          # HTML5 Entrypoint, Google Fonts (Kantumruy Pro, Outfit)
│   ├── package.json                        # Dependencies (lucide-react, canvas-confetti, qrcode)
│   ├── vite.config.js                      # Vite Configuration
│   └── dist/                               # Production Bundle (បង្កើតដោយ npm run build)
│
├── backend/                                # 📁 សម្រាប់បង្កើតពេលក្រោយ (Reserved for Backend API)
│   └── (Express.js / NestJS / FastAPI / Database / Bakong Open API Webhook)
│
├── README.md                               # សេចក្តីសង្ខេបរហ័សអំពីគម្រោង
└── PROJECT_STRUCTURE.md                    # ឯកសារលម្អិតអំពីរចនាសម្ព័ន្ធនេះ
```

---

## ⚡ ២. ដំណើរការការងារសំខាន់ៗ (Core Workflows)

### ក. ដំណើរការរបស់អ្នកទិញ (Buyer Flow - No Registration Needed)
1. **គ្មានការចុះឈ្មោះ (No Buyer Register)**: អ្នកទិញចូលមកកាន់ទំព័រដើម (`/`) អាចស្វែងរក និងមើល Account បានភ្លាមៗ។
2. **ចុចលើកាតផលិតផល (Product Card Click)**:
   - ប្រព័ន្ធបើកបង្ហាញ **ទំព័រថ្មីដែលមាន ២ ជួរឈរ (2-Column Page)**៖
     - **ជួរឈរខាងឆ្វេង (Left Column)**: រូបភាព Gallery ប្តូរបាន, Level, Robux, ផ្លែបិសាច, ដាវ CDK, Race V4, Beli, Fragments, សេចក្តីពិពណ៌នា និងការធានាសុវត្ថិភាព ១០០% មិនជាប់ Email/Phone។
     - **ជួរឈរខាងស្តាំ (Right Column)**: កាតបង់ប្រាក់ **Bakong KHQR** ស្ដង់ដារជាតិ មានឡូហ្គោបាគងក្រហម, Dynamic QR Code, ប្តូររូបិយប័ណ្ណ ($/៛), Countdown Timer 10 នាទី, និងប៊ូតុង "ខ្ញុំបានទូទាត់រួចរាល់"។
3. **ក្រោយទូទាត់បាគងជោគជ័យ (Post-Payment Success Modal)**:
   - ប្រព័ន្ធបាញ់ Confetti អបអរសាទរ និងបង្ហាញផ្ទាំង **Modal** លើអេក្រង់ភ្លាមៗ៖
     - **Roblox Username** (ជាមួយប៊ូតុង Copy)
     - **Roblox Password** (ជាមួយប៊ូតុង Show/Hide & Copy)
     - **Backup PIN / 2FA**
     - ស្ថានភាព Email: `មិនទាន់ភ្ជាប់ (100% ស្អាត អាចដាក់ Email ខ្លួនឯងភ្លាមៗ)`
     - ប៊ូតុង **"ចម្លងទាំងអស់"**, **"ទាញយកឯកសារ .txt"**, និង **"ចូល Roblox.com"**
     - ការណែនាំបន្ទាន់ជាភាសាខ្មែរក្នុងការ Login និងប្តូរលេខសម្ងាត់ដើម្បីកាន់កាប់ផ្តាច់មុខ។
4. **ប្រវត្តិទិញ (Purchase History)**:
   - ព័ត៌មានគណនីដែលបានទិញត្រូវបានរក្សាទុកក្នុង `localStorage` ស្វ័យប្រវត្តិ។ អ្នកទិញអាចចុចប៊ូតុង **"គណនីបានទិញ"** នៅលើ Navbar ដើម្បីពិនិត្យ ឬទាញយកមកវិញបានគ្រប់ពេល។

---

### ខ. ដំណើរការរបស់ម្ចាស់ហាង (Admin / Owner Flow - Dedicated URL)
1. **លាក់ប៊ូតុងពីទំព័រដើម (Hidden from Buyer Homepage)**: លើ Navbar របស់អ្នកទិញ គឺគ្មានប៊ូតុង Admin ឡើយ ដើម្បីធានាសុវត្ថិភាព និងភាពស្អាតនៃ UI។
2. **URL សម្ងាត់សម្រាប់ Admin**: 
   - ម្ចាស់ហាងវាយបញ្ចូល URL: 👉 **`http://localhost:5173/owner`** (ឬ `/#owner`)
3. **ផ្ទាំងចុះឈ្មោះ & ចូលប្រើ (Owner Auth Portal)**:
   - **Login**: ប្រើ Username & Password។
   - **Register**: តម្រូវឱ្យមាន `Secret Key` (លំនាំដើម: `ADMIN2026`) ដើម្បីការពារកុំឱ្យអ្នកដទៃចុះឈ្មោះផ្តេសផ្តាស។
4. **ផ្ទាំងគ្រប់គ្រង Admin Dashboard**:
   - បង្ហាញស្ថិតិលក់: ចំនួនគណនីសរុប, គណនីក្នុងស្តុក, គណនីលក់ដាច់, និងចំណូលសរុបគិតជាដុល្លារ ($)។
   - **បន្ថែមគណនី Roblox ថ្មីដាក់លក់ (Add Account to Sell)**:
     - ចំណងជើងផលិតផល, ប្រភេទហ្គេម (Blox Fruits, VIP Avatar, Pet Sim 99, Blade Ball)
     - តម្លៃ USD ($) និងស្វ័យប្រវត្តិគណនាជាប្រាក់រៀល (៛)
     - កម្រិត Level, ចំនួន Robux, ស្លាកសម្គាល់ (Badge), ស្ថានភាព Email
     - ជ្រើសរើសរូបភាព ឬ Upload URL
     - សេចក្ដីពិពណ៌នាអំពី Items, Melee, ដាវ, ផ្លែបិសាច
     - **ព័ត៌មានសម្ងាត់គណនី (Login Credentials)**: Username, Password, 2FA PIN
   - **គ្រប់គ្រងស្តុក (Inventory Management)**:
     - កែប្រែព័ត៌មាន (Edit)
     - លុបគណនី (Delete)
     - ប្តូរស្ថានភាព (មានក្នុងស្តុក / លក់ដាច់)

---

## 🎨 ៣. ការរចនា UI & សោភ័ណភាព (Design Highlights)

| ចំណុច | ការអនុវត្ត |
|---|---|
| **ពុម្ពអក្សរ (Typography)** | Google Font `Kantumruy Pro` (ទម្ងន់ 300, 400, 600, 700, 800) សម្រាប់អក្សរខ្មែរច្បាស់ស្អាត និង `Outfit` សម្រាប់លេខ/កូដ |
| **រចនាបថ (Aesthetics)** | Cyber Dark Mode, Obsidian `#07090e`, Indigo `#6366f1`, Cyan `#06b6d4`, Gold `#f59e0b` |
| **កាតបង់ប្រាក់បាគង** | Official Bakong KHQR Red Header (`#d32027`), KHQR Logo, Merchant Name, Dynamic QR Code, Expiry countdown |
| **ការជៀសវាងជាន់គ្នា (No Overlap)** | កាតផលិតផលដាក់ Category នៅជ្រុងឆ្វេង, Stock status នៅជ្រុងស្តាំ និង Gold Badge ដាក់ក្នុងតួ Card លើ Title |
| **រូបភាពហ្គេម (Assets)** | រូបភាព Blox Fruits, VIP Dominus Avatar, Pet Sim 99 និង Blade Ball គុណភាព 4K គ្មាន Placeholder |

---

## 💻 ៤. របៀបដំណើរការ (How to Run)

### ដំណើរការ Frontend
```bash
# ចូលទៅកាន់ Folder frontend
cd frontend

# ដំឡើង Dependencies (ប្រសិនបើមិនទាន់ដំឡើង)
npm install

# បើក Local Dev Server
npm run dev
```
បើក Browser ទៅកាន់: **`http://localhost:5173/`**

### Build សម្រាប់ Production
```bash
cd frontend
npm run build
```

---

## 🔑 ៥. ព័ត៌មានគណនី Admin លំនាំដើម
- **URL**: `http://localhost:5173/owner`
- **Username**: `admin`
- **Password**: `admin123`
- **Secret Key សម្រាប់ចុះឈ្មោះ Admin ថ្មី**: `ADMIN2026`

---

## 🔮 ៦. ផែនការសម្រាប់ Folder Backend ពេលក្រោយ (Future Backend Integration)

នៅពេលអ្នកចាប់ផ្តើមធ្វើ **`backend`** អ្នកអាចរៀបចំ API ដូចខាងក្រោម៖
1. **Auth API (`/api/auth`)**:
   - `POST /api/auth/login` (Admin Login ផ្ទៀងផ្ទាត់ JWT Token)
   - `POST /api/auth/register` (Admin Register ជាមួយ Secret Key)
2. **Products API (`/api/products`)**:
   - `GET /api/products` (បញ្ជីគណនីសម្រាប់ Buyer - លាក់ Password/Credentials)
   - `GET /api/products/:id` (ព័ត៌មានលម្អិត)
   - `POST /api/products` (Admin បន្ថែមគណនី រួមទាំង Credentials)
   - `PUT /api/products/:id` (Admin កែប្រែ)
   - `DELETE /api/products/:id` (Admin លុប)
3. **Payment & Bakong API (`/api/payment`)**:
   - `POST /api/payment/generate-khqr` (បង្កើត Bakong KHQR Code ពិតប្រាកដ)
   - `POST /api/payment/webhook` (ទទួល Callback ពី Bakong Open API ពេលភ្ញៀវបង់លុយ)
   - `GET /api/payment/verify/:orderId` (ផ្ទៀងផ្ទាត់ និងប្រគល់ Username/Password មកកាន់ Buyer)
