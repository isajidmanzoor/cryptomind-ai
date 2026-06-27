import fs from "node:fs";
import path from "node:path";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const envPath = path.join(process.cwd(), ".env.local");

const keys = [
  {
    name: "GROQ_API_KEY",
    label: "Groq AI analysis key",
    required: true,
    secret: true,
  },
  {
    name: "PIPELINE_SECRET",
    label: "Private password for POST /api/pipeline",
    required: true,
    secret: true,
    generate: () => cryptoRandom(32),
  },
  {
    name: "NEXT_PUBLIC_SUPABASE_URL",
    label: "Supabase project URL",
    required: true,
  },
  {
    name: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    label: "Supabase anon public key",
    required: true,
  },
  {
    name: "SUPABASE_SERVICE_ROLE_KEY",
    label: "Supabase service role key for article publishing",
    required: true,
    secret: true,
  },
  {
    name: "NEXT_PUBLIC_ADSENSE_CLIENT_ID",
    label: "Google AdSense client ID",
    required: false,
  },
  {
    name: "NEXT_PUBLIC_ADSENSE_SLOT_ID",
    label: "Google AdSense ad slot ID",
    required: false,
  },
  {
    name: "NEXT_PUBLIC_CRYPTO_ADS_ZONE_ID",
    label: "Crypto ads network zone ID",
    required: false,
  },
  {
    name: "NEXT_PUBLIC_CRYPTO_ADS_EMBED_HTML",
    label: "Full crypto ads HTML code, if your ad network requires the exact snippet",
    required: false,
  },
  {
    name: "NEXT_PUBLIC_AFFILIATE_URL",
    label: "Affiliate URL",
    required: false,
    defaultValue: "https://www.binance.com/",
  },
];

const rl = readline.createInterface({ input, output });

const existing = readEnv(envPath);
const next = { ...existing };

console.log("\nCryptoMind AI env setup");
console.log("Press Enter to keep/skip a value. Secrets are saved only to .env.local.\n");

for (const key of keys) {
  const current = next[key.name];
  const status = current ? `current: ${mask(current)}` : "missing";
  const required = key.required ? "required" : "optional";
  const generated = key.generate ? key.generate() : undefined;
  const suggestion = generated || key.defaultValue || "";

  console.log(`${key.name} (${required}) - ${key.label}`);
  console.log(`Status: ${status}`);

  if (generated) {
    const useGenerated = await ask(`Use generated value ${mask(generated)}? [Y/n]: `);

    if (useGenerated.toLowerCase() !== "n") {
      next[key.name] = generated;
      console.log("Saved.\n");
      continue;
    }
  }

  const prompt = suggestion
    ? `Paste value or press Enter for ${suggestion}: `
    : "Paste value or press Enter to skip/keep: ";
  const value = await askValue(prompt, Boolean(key.secret));

  if (value) {
    next[key.name] = value;
    console.log("Saved.\n");
    continue;
  }

  if (!current && suggestion) {
    next[key.name] = suggestion;
    console.log("Default saved.\n");
    continue;
  }

  console.log(current ? "Kept existing value.\n" : "Skipped.\n");
}

writeEnv(envPath, next);
rl.close();

const missingRequired = keys
  .filter((key) => key.required && !next[key.name])
  .map((key) => key.name);

console.log(`Updated ${envPath}`);

if (missingRequired.length > 0) {
  console.log(`Missing required keys: ${missingRequired.join(", ")}`);
  process.exitCode = 1;
} else {
  console.log("Required keys are present. Restart the dev server after changes.");
}

function ask(question) {
  return rl.question(question).then((answer) => answer.trim());
}

async function askValue(question, secret) {
  if (!secret || !input.isTTY) {
    return ask(question);
  }

  rl.pause();
  output.write(question);

  const answer = await readHiddenLine();
  rl.resume();

  return answer.trim();
}

function readHiddenLine() {
  return new Promise((resolve) => {
    const chars = [];
    const onData = (chunk) => {
      const value = chunk.toString("utf8");

      for (const char of value) {
        if (char === "\n" || char === "\r" || char === "\u0004") {
          input.setRawMode(false);
          input.off("data", onData);
          output.write("\n");
          resolve(chars.join(""));
          return;
        }

        if (char === "\u0003") {
          input.setRawMode(false);
          input.off("data", onData);
          output.write("\n");
          process.exit(130);
        }

        if (char === "\u007f" || char === "\b") {
          chars.pop();
          continue;
        }

        chars.push(char);
      }
    };

    input.setRawMode(true);
    input.resume();
    input.on("data", onData);
  });
}

function readEnv(filePath) {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  return fs
    .readFileSync(filePath, "utf8")
    .split(/\r?\n/)
    .reduce((values, line) => {
      const trimmed = line.trim();

      if (!trimmed || trimmed.startsWith("#")) {
        return values;
      }

      const separator = trimmed.indexOf("=");

      if (separator === -1) {
        return values;
      }

      values[trimmed.slice(0, separator)] = trimmed.slice(separator + 1);

      return values;
    }, {});
}

function writeEnv(filePath, values) {
  const lines = keys.map((key) => `${key.name}=${values[key.name] || ""}`);
  fs.writeFileSync(filePath, `${lines.join("\n")}\n`);
}

function mask(value) {
  if (value.length <= 8) {
    return "********";
  }

  return `${value.slice(0, 4)}...${value.slice(-4)}`;
}

function cryptoRandom(length) {
  const alphabet =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const bytes = crypto.getRandomValues(new Uint8Array(length));

  return Array.from(bytes, (byte) => alphabet[byte % alphabet.length]).join("");
}
