import { spawn } from "node:child_process";
import { createInterface } from "node:readline";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const repoRoot = dirname(__dirname);
export const frontendDir = join(repoRoot, "frontend");
export const backendDir = join(repoRoot, "backend");

export function npmCommand() {
  return process.platform === "win32" ? "npm.cmd" : "npm";
}

export function dotnetCommand() {
  return process.platform === "win32" ? "dotnet.exe" : "dotnet";
}

export async function ensureFrontendReady() {
  logStep("setup", "Ensuring frontend dependencies are installed...");
  await runCommand({
    label: "setup",
    command: npmCommand(),
    args: ["install", "--no-audit", "--no-fund"],
    cwd: frontendDir
  });
}

export async function ensureBackendReady() {
  logStep("setup", "Restoring backend local tools...");
  await runCommand({
    label: "setup",
    command: dotnetCommand(),
    args: ["tool", "restore"],
    cwd: backendDir
  });

  logStep("setup", "Applying backend database migrations...");

  try {
    await runCommand({
      label: "setup",
      command: dotnetCommand(),
      args: ["dotnet-ef", "database", "update", "--project", "src/TradeAI.Infrastructure"],
      cwd: backendDir
    });
  } catch (error) {
    throw new Error(
      "Backend database setup failed. Make sure PostgreSQL is running on localhost:5432 and the local credentials match backend/src/TradeAI.Api/appsettings*.json.",
      { cause: error }
    );
  }
}

export function startLongRunningProcess({ label, command, args, cwd }) {
  const launch = resolveLaunch(command, args);

  const child = spawn(launch.command, launch.args, {
    cwd,
    env: process.env,
    stdio: ["inherit", "pipe", "pipe"]
  });

  pipeOutput(child.stdout, label);
  pipeOutput(child.stderr, label);

  child.on("error", (error) => {
    console.error(`[${label}] Failed to start: ${formatSpawnError(command, error)}`);
  });

  return child;
}

export function waitForExit(child, label) {
  return new Promise((resolve) => {
    child.on("exit", (code, signal) => {
      resolve({
        label,
        code: code ?? (signal ? 1 : 0),
        signal
      });
    });
  });
}

export async function stopProcessTree(child) {
  if (!child?.pid) {
    return;
  }

  if (process.platform === "win32") {
    await new Promise((resolve) => {
      const killer = spawn("taskkill", ["/pid", String(child.pid), "/t", "/f"], {
        stdio: "ignore"
      });

      killer.on("error", () => resolve());
      killer.on("exit", () => resolve());
    });

    return;
  }

  child.kill("SIGTERM");
}

export async function runCommand({ label, command, args, cwd }) {
  const child = startLongRunningProcess({ label, command, args, cwd });
  const result = await waitForExit(child, label);

  if (result.code !== 0) {
    throw new Error(`[${label}] ${command} ${args.join(" ")} exited with code ${result.code}.`);
  }
}

export function logStep(label, message) {
  console.log(`[${label}] ${message}`);
}

function pipeOutput(stream, label) {
  const reader = createInterface({ input: stream });

  reader.on("line", (line) => {
    console.log(`[${label}] ${line}`);
  });
}

function formatSpawnError(command, error) {
  if (error?.code === "ENOENT") {
    return `Command not found: ${command}`;
  }

  return error?.message ?? "Unknown process error";
}

function resolveLaunch(command, args) {
  if (process.platform === "win32" && command.toLowerCase().endsWith(".cmd")) {
    return {
      command: "cmd.exe",
      args: ["/d", "/s", "/c", toCmdInvocation(command, args)]
    };
  }

  return { command, args };
}

function toCmdInvocation(command, args) {
  return [command, ...args].map(quoteForCmd).join(" ");
}

function quoteForCmd(value) {
  if (!value.includes(" ") && !value.includes('"')) {
    return value;
  }

  return `"${value.replace(/"/g, '""')}"`;
}
