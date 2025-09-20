#!/usr/bin/env node

import { readFileSync, writeFileSync } from "fs";
import { execSync } from "child_process";
import { resolve } from "path";

const CLIENT_FILE_PATH = resolve("src/client.ts");

// Original lines to replace
const ORIGINAL_IMPORT_LINE = 'import type { BlogAppType } from "@api";';
const ORIGINAL_CLIENT_LINE =
  "type Client = ReturnType<typeof hc<BlogAppType>>;";

// Replacement lines
const REPLACEMENT_IMPORT_LINE = "type BlogAppType = any;";
const REPLACEMENT_CLIENT_LINE = "type Client = any;";

function replaceLines(): { importReplaced: boolean; clientReplaced: boolean } {
  try {
    console.log("📝 Replacing type definitions...");
    let content = readFileSync(CLIENT_FILE_PATH, "utf8");
    let importReplaced = false;
    let clientReplaced = false;

    // Replace import line
    if (content.includes(ORIGINAL_IMPORT_LINE)) {
      content = content.replace(ORIGINAL_IMPORT_LINE, REPLACEMENT_IMPORT_LINE);
      importReplaced = true;
      console.log("✅ Import line replaced with type AppType = any");
    } else {
      console.log("⚠️  Original import line not found in client.ts");
    }

    // Replace client type line
    if (content.includes(ORIGINAL_CLIENT_LINE)) {
      content = content.replace(ORIGINAL_CLIENT_LINE, REPLACEMENT_CLIENT_LINE);
      clientReplaced = true;
      console.log("✅ Client type line replaced with type Client = any");
    } else {
      console.log("⚠️  Original client type line not found in client.ts");
    }

    if (importReplaced || clientReplaced) {
      writeFileSync(CLIENT_FILE_PATH, content, "utf8");
      console.log("✅ File updated successfully");
    }

    return { importReplaced, clientReplaced };
  } catch (error) {
    console.error("❌ Error replacing lines:", error);
    process.exit(1);
  }
}

function revertLines(replacements: {
  importReplaced: boolean;
  clientReplaced: boolean;
}): void {
  try {
    console.log("🔄 Reverting type definitions...");
    let content = readFileSync(CLIENT_FILE_PATH, "utf8");
    let reverted = false;

    // Revert import line
    if (
      replacements.importReplaced &&
      content.includes(REPLACEMENT_IMPORT_LINE)
    ) {
      content = content.replace(REPLACEMENT_IMPORT_LINE, ORIGINAL_IMPORT_LINE);
      console.log("✅ Import line reverted");
      reverted = true;
    }

    // Revert client type line
    if (
      replacements.clientReplaced &&
      content.includes(REPLACEMENT_CLIENT_LINE)
    ) {
      content = content.replace(REPLACEMENT_CLIENT_LINE, ORIGINAL_CLIENT_LINE);
      console.log("✅ Client type line reverted");
      reverted = true;
    }

    if (reverted) {
      writeFileSync(CLIENT_FILE_PATH, content, "utf8");
      console.log("✅ File reverted successfully");
    }
  } catch (error) {
    console.error("❌ Error reverting lines:", error);
  }
}

function runBuild(): void {
  try {
    console.log("🔨 Running build...");
    execSync("npm run build:only", { stdio: "inherit" });
    console.log("✅ Build completed successfully");
  } catch (error) {
    console.error("❌ Build failed:", error);
    throw error;
  }
}

async function main(): Promise<void> {
  console.log("🚀 Starting prebuild process...\n");

  let replacements = { importReplaced: false, clientReplaced: false };

  try {
    // Step 1: Replace the problematic lines
    replacements = replaceLines();

    // Step 2: Run the build
    runBuild();

    console.log("\n🎉 Prebuild process completed successfully!");
  } catch (error) {
    console.error("\n❌ Prebuild process failed:", error);
    process.exit(1);
  } finally {
    // Step 3: Always revert the changes (whether build succeeded or failed)
    console.log("\n🔄 Cleaning up...");
    revertLines(replacements);
  }
}

// Handle process interruption (Ctrl+C)
process.on("SIGINT", async () => {
  console.log("\n⚠️  Process interrupted. Reverting changes...");
  // Note: We can't track replacements here, so we'll attempt to revert both
  const fallbackReplacements = { importReplaced: true, clientReplaced: true };
  revertLines(fallbackReplacements);
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("\n⚠️  Process terminated. Reverting changes...");
  // Note: We can't track replacements here, so we'll attempt to revert both
  const fallbackReplacements = { importReplaced: true, clientReplaced: true };
  revertLines(fallbackReplacements);
  process.exit(0);
});

if (require.main === module) {
  main();
}
