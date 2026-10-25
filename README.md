# ROBLOX KHMER VAULT - GAME ACCOUNT MARKETPLACE 🇰🇭

វេទិកាទីផ្សារទិញ-លក់ Account Roblox ស្វ័យប្រវត្តិតាមបាគង KHQR សម្រាប់ប្រទេសកម្ពុជា។

👉 **សម្រាប់ឯកសាររចនាសម្ព័ន្ធលម្អិតពេញលេញ សូមមើល [PROJECT_STRUCTURE.md](file:///d:/Account%20Game/PROJECT_STRUCTURE.md)**

---

## 📁 រចនាសម្ព័ន្ធគម្រោង (Project Structure)

```text
Account Game/
├── frontend/             # 📂 ផ្នែក Frontend (React + Vite + Modern Vanilla CSS)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx               # Header, Search, Buyer notice (គ្មានប៊ូតុង Admin លើទំព័រដើម)
│   │   │   ├── HeroBanner.jsx           # បដាផ្សព្វផ្សាយហាង Roblox កម្ពុជា
│   │   │   ├── ProductList.jsx          # Catalog filter tabs & cards
│   │   │   ├── ProductCard.jsx          # កាតផលិតផល Roblox (គ្មាន Badge ជាន់គ្នា)
│   │   │   ├── ProductDetail.jsx        # 🌟 ទំព័រ ២ ជួរឈរ (Left: ពិពណ៌នា, Right: បាគង KHQR)
│   │   │   ├── AccountSuccessModal.jsx  # 🌟 Credential popup modal post-payment
│   │   │   ├── AdminAuthModal.jsx       # 🌟 Admin Register / Login modal (/owner)
│   │   │   ├── AdminDashboard.jsx       # 🌟 Admin control & add product to sell
│   │   │   ├── PurchaseHistoryModal.jsx # Buyer's purchased accounts
│   │   │   └── Footer.jsx               # Khmer footer & payment methods
│   │   ├── data/
│   │   │   └── initialProducts.js       # Default Roblox accounts with stats & credentials
│   │   ├── utils/
│   │   │   └── currency.js              # USD & KHR (1$ = 4,100៛) & KHQR
│   │   ├── App.jsx                      # App logic, URL route (/owner), state
│   │   ├── index.css                    # Modern Dark Gaming Design System
│   │   └── main.jsx
│   ├── public/
│   │   └── images/                      # Generated high-res Roblox visuals
│   └── package.json
└── backend/              # 📁 សម្រាប់បង្កើតពេលក្រោយ (Reserved for backend API)
```

---

## 🚀 របៀបដំណើរការ Frontend

```bash
cd frontend
npm install
npm run dev
```

🌐 **URL អ្នកទិញ (Buyer View)**: `http://localhost:5173/`  
👑 **URL ម្ចាស់ហាង (Owner Portal)**: `http://localhost:5173/owner`

---

## 🔑 ព័ត៌មាន Admin សម្រាប់ Login / Control Platform:
- **URL**: `http://localhost:5173/owner`
- **Username**: `admin`
- **Password**: `admin123`
- **Secret Key សម្រាប់ចុះឈ្មោះ Admin ថ្មី**: `ADMIN2026`
