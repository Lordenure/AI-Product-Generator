import { ensureBackendReady, ensureFrontendReady, logStep } from "./shared.mjs";

await ensureFrontendReady();
await ensureBackendReady();

logStep("setup", "TradeAI is ready for local development.");
