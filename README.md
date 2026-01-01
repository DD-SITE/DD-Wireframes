#  DDFRAME – Wireframes to Code Generation with AI  

Convert wireframes into clean, responsive **React + Tailwind CSS** components effortlessly.  
Powered by **TypeScript, Firebase, OpenRouter AI, Cloudinary, Neon DB, and Sandpack**   

![Next.js](https://img.shields.io/badge/Next.js-15.1.6-black?logo=nextdotjs)
![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Auth%20%26%20Analytics-FFCA28?logo=firebase&logoColor=black)
![Postgres](https://img.shields.io/badge/Postgres-Neon_DB-4169E1?logo=postgresql&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Image%20Upload-3448C5?logo=cloudinary&logoColor=white)
![OpenRouter](https://img.shields.io/badge/OpenRouter-AI%20Models-8A2BE2?logo=openai&logoColor=white)
![Sandpack](https://img.shields.io/badge/Sandpack-Live%20Preview-2D8CFF?logo=codesandbox&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)

---
🔗 **Live Demo:** [dd-frame.vercel.app](https://dd-frame.vercel.app)  
---

##  Features  

-  **Google Authentication** – Sign in via **Firebase Auth**  
-  **Upload Wireframes** – Upload images via **Cloudinary**  
-  **AI Code Generation** – Convert wireframes into React + Tailwind components using **OpenRouter (Gemini, Deepseek, LLaMA)**  
-  **Prompt Customization** – Add custom prompts to guide AI-generated code  
-  **History Tracking** – View previously generated designs & code under the "Designs" section  
-  **Sandpack Integration** – Dual preview for both **code** and **live UI**  
-  **Postgres (Neon DB)** – Store generated code & history securely  
-  **Charts & Analytics** – Track and visualize usage with Firebase Analytics  

---


##  Tech Stack  

### Frontend  
- **React (18) + Next.js (15.1.6)** – UI and routing  
- **Tailwind CSS + PostCSS + tailwind-merge + tailwindcss-animate** – Styling & animations  
- **Lucide-react** – Icon set  
- **React Chart.js 2 + Chart.js** – Analytics & charts  
- **Sandpack (CodeSandbox)** – Live code preview integration  

### Backend  
- **Next.js API Routes** – Backend endpoints  
- **TypeScript** – Strong typing & scalability  
- **Drizzle ORM** – Database schema management  

### Database & Cloud  
- **Postgres (Neon DB)** – Serverless database  
- **Cloudinary** – Wireframe & image upload  
- **Firebase** – Authentication (Google) + Analytics  

### AI Integration  
- **OpenRouter API** – Access to AI models:  
  - Google **Gemini**  
  - Meta **LLaMA**  
  - **Deepseek**  

### Deployment  
- **Vercel** – Hosting and deployment

---
##  Challenges & Unique Aspects  
- **Real-time wireframe-to-code generation** powered by AI  
- **Multi-model AI support** using OpenRouter for flexibility & better outputs  
- **Seamless image handling** with Cloudinary integration linked to the database  
- **Robust schema management** via Drizzle ORM + Neon serverless Postgres  
   **Optimized live previews** using Sandpack for instant code + UI sync  
---

## 🎥 Demo  

https://github.com/user-attachments/assets/75116515-c085-4828-b58e-debca211a37c  

---

## ⚙️ Installation & Setup  

**Clone the repository**
   ```bash
   git clone https://github.com/DD-SITE/DD-Wireframes
   cd DD-Wireframes
```

**Install dependencies:**
   ```bash
npm install
# or
yarn install
```

**Create a .env.local file in the root folder and add your API key:**
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

OPENROUTER_AI_API_KEY=your_openrouter_api_key
NEXT_PUBLIC_NEON_DB_CONNECTION_STRING=your_neon_connection_string

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret


```

**Run locally:**
```bash
npm run dev
# or
yarn run dev
```
View the site at `http://localhost:3000` or the port specified in your setup.
