import { backendDir, dotnetCommand, ensureBackendReady, logStep, startLongRunningProcess, stopProcessTree, waitForExit } from "./shared.mjs";

await ensureBackendReady();
logStep("backend", "Starting TradeAI backend on http://localhost:5272");

const backendProcess = startLongRunningProcess({
  label: "backend",
  command: dotnetCommand(),
  args: ["run", "--project", "src/TradeAI.Api", "--launch-profile", "http"],
  cwd: backendDir
});

wireSignals(backendProcess);

const result = await waitForExit(backendProcess, "backend");
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
