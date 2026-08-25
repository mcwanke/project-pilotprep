#!/bin/bash

# gen_session_log.sh - Compile a session log from session artifacts

if [ $# -eq 0 ]; then
    echo "Usage: ./scripts/gen_session_log.sh <session_name>"
    echo "Example: ./scripts/gen_session_log.sh prep_001_python"
    exit 1
fi

SESSION_NAME=$1
SESSION_PATH="sessions/$SESSION_NAME"

# Validate session folder exists
if [ ! -d "$SESSION_PATH" ]; then
    echo "Error: Session folder '$SESSION_PATH' not found"
    exit 1
fi

# Check required files exist
REQUIRED_FILES=(
    "plan/plan.md"
    "plan/WORKORDER.md"
    "memory/MEMORY.md"
)

for file in "${REQUIRED_FILES[@]}"; do
    if [ ! -f "$SESSION_PATH/$file" ]; then
        echo "Error: Required file not found: $SESSION_PATH/$file"
        exit 1
    fi
done

# Check template exists
if [ ! -f "docs/TEMPLATE_session_log.md" ]; then
    echo "Error: Template not found: docs/TEMPLATE_session_log.md"
    exit 1
fi

# Extract session number and stack from folder name
SESSION_PARTS=(${SESSION_NAME//_/ })
SESSION_NUM="${SESSION_PARTS[1]}"
STACK="${SESSION_PARTS[2]}"

# Get date - try to extract from MEMORY.md, fallback to today
SESSION_DATE=$(grep -m1 "^Date:" "$SESSION_PATH/memory/MEMORY.md" 2>/dev/null | sed 's/Date: //' || date +%Y-%m-%d)

# Start building the session log
OUTPUT="# Session Log — $SESSION_NAME — $SESSION_DATE

## The Prompt
See plan/session_context.md

---

## The WORKORDER
See plan/WORKORDER.md

---

## How I Directed the AI

What questions did you actually ask the AI? Where did it suggest something
that didn't work and you pushed back? Where did you stay in control vs.
let it run ahead? This should reflect the prompt/response pairs in the
Claude Code session log.

---

## How the Session Went

Narrative of the full 45-minute practice run. What did you complete vs.
what didn't you finish? Where did you gain ground, where did you lose time?
Where did the plan hold and where did it break? How did you direct Claude
Code — did you stay in control or did it run ahead of you?

---

## Claude Code Session Log
See memory/MEMORY.md

---

## What I Would Harden Before Production

What actually broke or surprised you during coding? What's fragile or
assumed in what you built? What would you address before this went
anywhere real?

---

## What I Would Do Next
[If you had more time, what would you build next? Be specific.]

---

## Score Yourself
- Did you finish a working subset in 45 minutes? Y/N
- Did you stay in scope? Y/N
- Did you direct Claude Code well or let it run?
- What would you do differently next time?
"

# Write output
echo "$OUTPUT" > "$SESSION_PATH/session_log.md"

echo "Created session log: $SESSION_PATH/session_log.md"
