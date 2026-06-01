import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

interface Invitation {
  id: string;
  name: string;
  email: string;
  date: string;
  sector: string;
}

// In-memory storage for RSVPs / Invitation passes (resets on server restart/cold start)
const invitations: Invitation[] = [
  {
    id: "REV-7741-2026",
    name: "Laetitia Vance",
    email: "laetitia@reverie.space",
    date: "2026-06-01",
    sector: "DREAM-LINE-A"
  },
  {
    id: "REV-9923-2026",
    name: "Aurelia Thorne",
    email: "aurelia@reverie.space",
    date: "2026-06-01",
    sector: "AURA-SECTOR"
  },
  {
    id: "REV-1049-2026",
    name: "Cassian Cole",
    email: "cassian@reverie.space",
    date: "2026-06-01",
    sector: "CELESTIAL-V"
  }
];

const app = express();
const PORT = 3000;

// JSON Body Parser middleware
app.use(express.json());

// API Route: Get all invitations / stats
app.get("/api/invitations", (req, res) => {
  res.json({
    success: true,
    count: invitations.length,
    data: invitations,
  });
});

// API Route: Register a new passage request
app.post("/api/invitations", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      success: false,
      error: "Name and email coordinate parameters are required."
    });
  }

  // Check if email already has a slot
  const existing = invitations.find(i => i.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(200).json({
      success: true,
      message: "Invitation coordinates already registered.",
      data: existing
    });
  }

  const sectors = ["DREAM-LINE-A", "CELESTIAL-V", "AURA-SECTOR", "NEBULA-IX", "COSMIC-SLATE"];
  const randomSector = sectors[Math.floor(Math.random() * sectors.length)];
  const ticketID = `REV-${Math.floor(1000 + Math.random() * 9000)}-${Date.now().toString().slice(-4)}`;

  const newInvite: Invitation = {
    id: ticketID,
    name,
    email,
    date: new Date().toISOString().split('T')[0],
    sector: randomSector
  };

  invitations.push(newInvite);

  res.status(201).json({
    success: true,
    message: "Passage coordinates aligned and registered successfully.",
    data: newInvite
  });
});

// API Route: Health Status
app.get("/api/health", (req, res) => {
  res.json({ status: "online", service: "Reverie Backend Protocol" });
});

// Create and export server start configuration
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Only start listening if not running as a Vercel Serverless environment
  if (!process.env.VERCEL) {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`[Reverie] Live on port ${PORT}`);
    });
  }
}

// Bootstrap local listeners
startServer();

// Export Express Application instance for Serverless frameworks (like Vercel)
export default app;
