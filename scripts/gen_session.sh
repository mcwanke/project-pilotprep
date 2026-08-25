#!/bin/bash

# gen_session.sh - Create a new practice session by copying a template

# Create sessions/ if it doesn't exist
mkdir -p sessions

# Get valid stack types from templates/ directory
VALID_STACKS=($(ls -1d templates/*/ 2>/dev/null | xargs -n1 basename))

# Validate input
if [ $# -eq 0 ]; then
    echo "Usage: ./scripts/gen_session.sh [stack]"
    echo "Valid stacks: ${VALID_STACKS[@]}"
    exit 1
fi

STACK=$1

# Validate stack type
if [[ ! " ${VALID_STACKS[@]} " =~ " ${STACK} " ]]; then
    echo "Error: Invalid stack '$STACK'"
    echo "Valid stacks: ${VALID_STACKS[@]}"
    exit 1
fi

# Validate template exists
if [ ! -d "templates/$STACK" ]; then
    echo "Error: Template 'templates/$STACK' not found"
    exit 1
fi

# Count existing sessions and determine next number
NEXT_NUM=$(ls -1d sessions/prep_* 2>/dev/null | wc -l)
NEXT_NUM=$((NEXT_NUM + 1))

# Ensure uniqueness for this stack
while [ -d "sessions/prep_$(printf "%03d" $NEXT_NUM)_$STACK" ]; do
    ((NEXT_NUM++))
done

# Create session folder name and copy template
SESSION_NAME="prep_$(printf "%03d" $NEXT_NUM)_$STACK"
SESSION_PATH="sessions/$SESSION_NAME"

cp -r "templates/$STACK" "$SESSION_PATH"

echo "Created new session: $SESSION_PATH"
