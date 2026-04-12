import { ensureFrontendReady, frontendDir, logStep, npmCommand, startLongRunningProcess, stopProcessTree, waitForExit } from "./shared.mjs";

await ensureFrontendReady();
logStep("frontend", "Starting TradeAI frontend on http://localhost:3000");

const frontendProcess = startLongRunningProcess({
  label: "frontend",
  command: npmCommand(),
  args: ["run", "dev"],
  cwd: frontendDir
});

wireSignals(frontendProcess);

const result = await waitForExit(frontendProcess, "frontend");
process.exitCode = result.code;

function wireSignals(child) {
  let stopping = false;

  async function stop() {
    if (stopping) {
      return;
    }

    stopping = true;
    await stopProcessTree(child);
  }

  process.on("SIGINT", stop);
  process.on("SIGTERM", stop);
}
