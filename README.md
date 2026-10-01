# 🤖 PDF RAG Chatbot

> An intelligent chatbot that lets you upload any PDF and have a real conversation with it — powered by RAG (Retrieval-Augmented Generation), Pinecone Vector DB, and multiple switchable LLM models via OpenRouter.

![Next.js 16](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![NestJS](https://img.shields.io/badge/NestJS-Express-red?style=for-the-badge&logo=nestjs)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=for-the-badge&logo=tailwindcss)
![Pinecone](https://img.shields.io/badge/Pinecone-Vector_DB-green?style=for-the-badge)
![OpenRouter](https://img.shields.io/badge/OpenRouter-Multi--Model_AI-blue?style=for-the-badge)

<img width="946" height="410" alt="image" src="https://github.com/user-attachments/assets/9b0c21e5-9508-4cb8-a001-95792037d7a1" />

---

## ✨ Features

### 🧠 Contextual RAG Chatbot

- **Multi-turn Conversation Memory** — Recent chat history (last 6 messages) is sent with every query, so follow-ups like *"explain the second point"* just work
- **Source Citations** — Every answer shows sleek `Source: Chunk N` pills with hoverable text excerpts and relevance scores, streamed alongside the answer via SSE
- **Real-time Streaming** — Answers stream token by token like ChatGPT
- **Dynamic Model Switching** — Swap between free LLMs (Nemotron, Qwen, Auto Router) mid-conversation via a custom popover selector with performance badges (`Large`, `Most Powerful`, `RAG Specialist`, …)
- **Out-of-Scope Guardrails** — Queries unrelated to the uploaded PDF get a polite automatic fallback; answers stay strictly grounded in document context

### 📄 PDF Processing

- **Interactive Drag & Drop Zone** — Animated glowing dashed borders while dragging, pulsing upload icon
- **File Preview Badge** — Selected file shown with name and size before/during upload
- **Animated Progress Bar** — Gradient shimmer progress while the PDF is parsed, chunked, embedded, and indexed (up to 20MB)

### 🎨 Modern Glassmorphism UI

- **Premium Dark Theme** — Linear/Vercel-style `#090d16` canvas with ambient radial glows and a masked grid backdrop
- **Glass Surfaces** — `backdrop-blur` panels, gradient message bubbles, and glowing accents throughout
- **Plus Jakarta Sans Typography** — Loaded via `next/font`
- **Fully Responsive** — Collapsible glass sidebar with blur overlay on mobile; fluid layouts on tablet and desktop

---

## 🏗️ Architecture

```
User uploads PDF
       ↓
NestJS Backend receives file
       ↓
pdf-parse extracts text
       ↓
Text split into chunks (1000 tokens, 200 overlap)
       ↓
multilingual-e5-large embeds each chunk (1024-dim)
       ↓
Pinecone stores all vectors + chunk metadata (unique namespace per PDF)
       ↓
User asks a question (with recent conversation history)
       ↓
Question embedded → Pinecone similarity search (Top 4 chunks, score > 0.4)
       ↓
Source citations (chunk index, excerpt, score) pushed to client first
       ↓
History + Context + Question sent to selected LLM via OpenRouter
       ↓
Answer streams back to frontend in real-time (SSE)
```

<img width="624" height="433" alt="image" src="https://github.com/user-attachments/assets/a79df51d-dfab-434b-a414-990743f3222e" />

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Plus Jakarta Sans |
| **Backend** | NestJS on Node.js / Express, TypeScript |
| **AI Engine** | OpenRouter API — multi-model support (switchable at runtime) |
| **Vector Search / RAG** | Chunking & citation pipeline with dynamic context buffering (conversation memory) |
| **Embeddings** | multilingual-e5-large (Xenova/Transformers.js, 1024-dim) |
| **Vector DB** | Pinecone |
| **PDF Parsing** | pdf-parse |
| **Streaming** | Server-Sent Events (SSE) |

---

## 📁 Project Structure

```
pdf-rag-chatbot/
├── frontend/                   # Next.js 16 App
│   ├── app/
│   │   ├── page.tsx            # Home "/"
│   │   ├── upload/page.tsx     # Upload PDF "/upload"
│   │   └── chat/[namespace]/   # Chat "/chat/:id"
│   ├── components/
│   │   ├── chat/               # ChatWindow, MessageBubble, MessageInput, ModelSelector, TypingIndicator
│   │   ├── pdf/                # PDFUploader
│   │   └── ui/                 # Sidebar
│   └── hooks/                  # useChat (memory + citations), usePDFUpload, useModels
│
└── backend/                    # NestJS API
    └── src/
        ├── modules/
        │   ├── pdf/            # PDF upload & processing
        │   └── chat/           # RAG query, history & SSE streaming
        └── services/
            ├── langchain/      # RAG pipeline, embeddings & prompts
            ├── pinecone/       # Vector DB operations
            └── gemini/         # LLM integration (OpenRouter API)
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Pinecone account (free tier)
- OpenRouter account (free tier) — [openrouter.ai/keys](https://openrouter.ai/keys)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/razazaheer12/pdf-rag-chatbot.git
cd pdf-rag-chatbot
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Fill in your keys in `backend/.env`:

```env
PORT=5000
GEMINI_API_KEY=your_openrouter_api_key   # OpenRouter API key (sk-or-...)
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX_NAME=pdf-rag-index-v2
PINECONE_DIMENSION=1024
NODE_ENV=development
```

Start the backend (first boot downloads the embedding model, ~1 min):

```bash
npm run start:dev
```

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
```

Create `.env.local` in `frontend/`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Start the dev server:

```bash
npm run dev
```

### 4️⃣ Open in Browser

```
http://localhost:3000
```

---

## 🔄 How It Works

1. **Upload** — User drags & drops a PDF on `/upload`; progress streams in the preview banner
2. **Processing** — Backend parses, chunks, and embeds the PDF into Pinecone (metadata kept for citations)
3. **Chat** — User is redirected to `/chat/[namespace]`
4. **Model Selection** — User picks an LLM from the popover selector (switchable anytime, tagged Fast / Balanced / Large / Most Powerful)
5. **Query** — Frontend sends the question **plus the last 6 messages of history**; backend retrieves the top 4 relevant chunks
6. **Citations** — Matched chunk references are streamed to the UI first and rendered as `Source: Chunk N` pills under the answer
7. **Answer** — The selected LLM generates a context-aware answer (history included for follow-ups), streamed token by token via SSE

---

## 📸 Screenshots

> 🏠 Home Page

<img width="946" height="410" alt="image" src="https://github.com/user-attachments/assets/9b0c21e5-9508-4cb8-a001-95792037d7a1" />

> 📤 Upload Page

<img width="942" height="412" alt="image" src="https://github.com/user-attachments/assets/2fc11879-6ed9-463e-8388-7530d7a800d7" />

> 💬 Chat Page

<img width="952" height="413" alt="image" src="https://github.com/user-attachments/assets/2d73e7f9-0e5d-4b55-bedb-e6c6aab73c35" />

---

## ⚙️ Environment Variables

| Variable | Location | Description |
|----------|----------|-------------|
| `PORT` | backend `.env` | Backend server port (default: 5000) |
| `GEMINI_API_KEY` | backend `.env` | **OpenRouter API key** (used for all LLM calls) |
| `PINECONE_API_KEY` | backend `.env` | Pinecone database API key |
| `PINECONE_INDEX_NAME` | backend `.env` | Pinecone index name (1024-dim, cosine) |
| `PINECONE_DIMENSION` | backend `.env` | Embedding dimensions (1024) |
| `NODE_ENV` | backend `.env` | `development` / `production` |
| `NEXT_PUBLIC_API_URL` | frontend `.env.local` | Backend URL for the frontend |

---

## 🧠 RAG Pipeline Details

- **Chunk Size:** 1000 characters with 200 overlap
- **Embedding Model:** `multilingual-e5-large` (1024 dimensions)
- **Similarity Search:** Top-4 chunks retrieved per query
- **Similarity Threshold:** Score > 0.4 filtered
- **Conversation Memory:** Last 6 messages replayed to the LLM for follow-up understanding (dynamic context buffering)
- **Citations:** Chunk index, 160-char excerpt, and relevance score streamed as an SSE `sources` event before the answer tokens
- **LLM Models (switchable via UI):**
  - `nvidia/nemotron-3-super-120b-a12b:free` — Large (default)
  - `nvidia/nemotron-3-ultra-550b-a55b:free` — 🧠 Most Powerful
  - `qwen/qwen-3.8-27b:free` — 📚 RAG Specialist
  - `nvidia/nemotron-3.5-lightning:free` — ⚡ 1M Context
  - `openrouter/free` — 🌐 Auto Router (Always Online)
- **Streaming:** Server-Sent Events (SSE) for real-time token streaming

---

## 👨‍💻 Author

**Raza Zaheer**
- 🌐 Portfolio: [raza-zaheer-portfolio-web-developer.vercel.app](https://raza-zaheer-portfolio-web-developer.vercel.app)
- 💼 GitHub: [@razazaheer12](https://github.com/razazaheer12)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

> ⭐ If you found this project helpful, please give it a star on GitHub!
