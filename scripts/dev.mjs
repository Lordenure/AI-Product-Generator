import {
  backendDir,
  dotnetCommand,
  ensureBackendReady,
  ensureFrontendReady,
  frontendDir,
  logStep,
  npmCommand,
  startLongRunningProcess,
  stopProcessTree,
  waitForExit
} from "./shared.mjs";

await ensureFrontendReady();
await ensureBackendReady();

logStep("dev", "Starting frontend and backend together...");

const backendProcess = startLongRunningProcess({
  label: "backend",
  command: dotnetCommand(),
  args: ["run", "--project", "src/TradeAI.Api", "--launch-profile", "http"],
  cwd: backendDir
});

const frontendProcess = startLongRunningProcess({
  label: "frontend",
  command: npmCommand(),
  args: ["run", "dev"],
  cwd: frontendDir
});

const processes = [
  { label: "backend", child: backendProcess },
  { label: "frontend", child: frontendProcess }
];

let shuttingDown = false;

process.on("SIGINT", () => void shutdown("Stopped by user.", 0));
process.on("SIGTERM", () => void shutdown("Stopped by signal.", 0));

const firstExit = await Promise.race(processes.map(({ label, child }) => waitForExit(child, label)));

if (!shuttingDown) {
  const message =
    firstExit.code === 0
      ? `${firstExit.label} stopped. Shutting down the other process.`
      : `${firstExit.label} exited with code ${firstExit.code}. Shutting down the other process.`;

  await shutdown(message, firstExit.code);
}

async function shutdown(message, exitCode) {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;
  logStep("dev", message);

  await Promise.all(processes.map(({ child }) => stopProcessTree(child)));
  process.exitCode = exitCode;
}
