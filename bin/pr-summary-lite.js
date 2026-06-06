#!/usr/bin/env node
import { execFileSync } from "node:child_process";
if (process.argv.includes("--help")) { console.log("Usage: pr-summary-lite [base-ref]"); process.exit(0); }
const base = process.argv[2] || "HEAD~1";
const git = a => execFileSync("git", a, { encoding:"utf8" }).trim();
let files="", stat="";
try { files = git(["diff", "--name-only", base]); stat = git(["diff", "--stat", base]); } catch { files = git(["show", "--name-only", "--format="]); stat = git(["show", "--stat", "--format="]); }
const list = files.split(/\r?\n/).filter(Boolean);
console.log("# PR Summary\n");
console.log("## Changed Files");
console.log(list.map(f=>"- "+f).join("\n") || "No files detected.");
console.log("\n## Diff Stat\n```text\n"+(stat||"No stat available.")+"\n```");
console.log("\n## Suggested Checks");
console.log("- Run tests touching changed modules.\n- Review public API or config changes.\n- Confirm documentation matches behavior.");
