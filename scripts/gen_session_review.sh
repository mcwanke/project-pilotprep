#!/bin/bash

# gen_session_review.sh - Run AI review on a completed session

if [ $# -eq 0 ]; then
    echo "Usage: ./scripts/gen_session_review.sh <session_name>"
    echo "Example: ./scripts/gen_session_review.sh prep_001_python"
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
    "plan/WORKORDER.md"
    "session_log.md"
    "memory/MEMORY.md"
)

for file in "${REQUIRED_FILES[@]}"; do
    if [ ! -f "$SESSION_PATH/$file" ]; then
        echo "Error: Required file not found: $SESSION_PATH/$file"
        exit 1
    fi
done

# Check template exists
if [ ! -f "docs/PROMPT_session_review.md" ]; then
    echo "Error: Template not found: docs/PROMPT_session_review.md"
    exit 1
fi

# Read artifacts
WORKORDER=$(cat "$SESSION_PATH/plan/WORKORDER.md")
SESSION_LOG=$(cat "$SESSION_PATH/session_log.md")
MEMORY=$(cat "$SESSION_PATH/memory/MEMORY.md")

# Extract prompt from session log (between "## The Prompt" and the next "---")
PROMPT=$(sed -n '/^## The Prompt$/,/^---$/p' "$SESSION_PATH/session_log.md" | sed '1d;$d')

# Build JSON schema
SCHEMA='{
  "session": "'$SESSION_NAME'",
  "date": "'$(date +%Y-%m-%d)'",
  "stack": "'${SESSION_NAME##*_}'",
  "scoring": {
    "problem_decomposition": { "score": 0, "max": 10, "feedback": "" },
    "question_quality": { "score": 0, "max": 10, "feedback": "" },
    "ai_direction": { "score": 0, "max": 10, "feedback": "" },
    "scope_judgment": { "score": 0, "max": 10, "feedback": "" },
    "production_thinking": { "score": 0, "max": 10, "feedback": "" },
    "communication_clarity": { "score": 0, "max": 10, "feedback": "" },
    "overall": { "score": 0, "max": 10 }
  },
  "reviewer_perspectives": {
    "vp_engineering": { "feedback": "", "would_hire": true },
    "software_architect": { "feedback": "", "would_hire": true }
  },
  "verdict": {
    "is_this_person_awesome": "",
    "strongest_signal": "",
    "biggest_gap": "",
    "one_thing_to_improve": ""
  }
}'

# Read review prompt template
TEMPLATE=$(cat "docs/PROMPT_session_review.md")

# Substitute placeholders in template
REVIEW_PROMPT="${TEMPLATE//{prompt}/$PROMPT}"
REVIEW_PROMPT="${REVIEW_PROMPT//{workorder}/$WORKORDER}"
REVIEW_PROMPT="${REVIEW_PROMPT//{session_log}/$SESSION_LOG}"
REVIEW_PROMPT="${REVIEW_PROMPT//{memory}/$MEMORY}"
REVIEW_PROMPT="${REVIEW_PROMPT//{schema}/$SCHEMA}"

# Call claude -p with the assembled prompt
RAW_RESPONSE=$(echo "$REVIEW_PROMPT" | claude -p)

# Extract JSON from markdown code fencing if present
JSON_RESPONSE=$(echo "$RAW_RESPONSE" | sed -n '/^```json$/,/^```$/p' | sed '1d;$d' || echo "$RAW_RESPONSE")

# Save JSON response for troubleshooting
echo "$JSON_RESPONSE" > "$SESSION_PATH/review.json"

# Call review_compiler.py to format the review
echo "$JSON_RESPONSE" | python3 scripts/review_compiler.py "$SESSION_PATH"

echo "Generated review: $SESSION_PATH/review.md"
echo "JSON saved for troubleshooting: $SESSION_PATH/review.json"
