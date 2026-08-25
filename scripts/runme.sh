#!/bin/bash

# runme.sh - Interactive workflow guide for interview prep sessions

set -e

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

# Colors for output
BOLD='\033[1m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper to wait for any key
wait_for_key() {
    echo ""
    read -p "Press any key to return to main menu..." -n 1 -s
    echo ""
}

# Show main menu
show_main_menu() {
    clear
    echo -e "${BOLD}Interview Prep Workflow${NC}"
    echo ""
    echo "1. Copy skeleton template (create new session)"
    echo "2. Run testing session (30-45 minutes)"
    echo "3. Create and fill in session log"
    echo "4. Perform AI review of session"
    echo "q. Quit"
    echo ""
    read -p "Select option (1-4 or q): " choice
}

# Option 1: Create new session
handle_new_session() {
    clear
    echo -e "${BOLD}Available Templates${NC}"
    echo ""
    ls -1d templates/*/ 2>/dev/null | xargs -n1 basename | sort
    echo ""
    read -p "Enter template name: " template

    clear
    echo -e "${BOLD}Creating new session from $template template...${NC}"
    echo ""

    ./scripts/gen_session.sh "$template"

    echo ""
    wait_for_key
}

# Option 2: Session instructions
handle_session_instructions() {
    clear
    echo -e "${BOLD}How to Run Your Interview Session${NC}"
    echo ""
    echo "Follow these steps:"
    echo ""
    echo "1. ${GREEN}Open the session folder${NC}"
    echo "   Open the session folder in your code editor (the folder was printed above)"
    echo "   Open Claude Code in that folder"
    echo ""
    echo "2. ${GREEN}Set up the session context${NC}"
    echo "   Copy the interview prompt into: plan/session_context.md"
    echo "   Add any other context or clarifications to the same file"
    echo ""
    echo "3. ${GREEN}Take initial notes${NC}"
    echo "   Write your initial thoughts in: plan/scratch.md"
    echo "   What do you notice? What's unclear? What's your instinct?"
    echo ""
    echo "4. ${GREEN}Write your approach${NC}"
    echo "   Write your intended approach in: plan/plan.md"
    echo "   (This will help when building the WORKORDER)"
    echo ""
    echo "5. ${GREEN}Generate the WORKORDER${NC}"
    echo "   Ask Claude Code to generate plan/WORKORDER.md"
    echo "   Review it carefully, ask questions, make sure it's right"
    echo "   Approve it before proceeding"
    echo ""
    echo "6. ${GREEN}Build your solution${NC}"
    echo "   Implement the WORKORDER step by step"
    echo "   After each chunk, report what was done"
    echo "   Stay in scope, make tradeoffs if needed"
    echo ""
    echo "7. ${GREEN}End the session${NC}"
    echo "   When done (or time runs out), say: END SESSION"
    echo "   Claude Code will write memory/MEMORY.md automatically"
    echo ""

    wait_for_key
}

# Option 3: Create session log
handle_create_log() {
    clear
    echo -e "${BOLD}Recent Sessions${NC}"
    echo ""
    ls -1d sessions/prep_* 2>/dev/null | xargs -n1 basename | sort -r | head -5
    echo ""
    read -p "Enter session name: " session

    clear
    echo -e "${BOLD}Creating session log...${NC}"
    echo ""

    ./scripts/gen_session_log.sh "$session"

    clear
    echo -e "${BOLD}Session Log Created${NC}"
    echo ""
    echo "File: ${GREEN}sessions/$session/session_log.md${NC}"
    echo ""
    echo "Now fill in these sections:"
    echo ""
    echo "1. ${GREEN}How I Directed the AI${NC}"
    echo "   What questions did you actually ask the AI?"
    echo "   Where did it suggest something that didn't work and you pushed back?"
    echo "   Where did you stay in control vs. let it run ahead?"
    echo ""
    echo "2. ${GREEN}How the Session Went${NC}"
    echo "   Narrative of the 45-minute run. What did you complete vs. not finish?"
    echo "   Where did you gain ground, where did you lose time?"
    echo "   Where did the plan hold and where did it break?"
    echo ""
    echo "3. ${GREEN}What I Would Harden Before Production${NC}"
    echo "   What actually broke or surprised you during coding?"
    echo "   What's fragile or assumed in what you built?"
    echo "   What would you address before this went anywhere real?"
    echo ""
    echo "4. ${GREEN}What I Would Do Next${NC}"
    echo "   If you had more time, what would you build next? Be specific."
    echo ""
    echo "5. ${GREEN}Score Yourself${NC}"
    echo "   Answer the self-assessment questions honestly"
    echo ""
    echo "The reference sections (The Prompt, The WORKORDER, Claude Code Session Log)"
    echo "are pre-filled as references. Don't duplicate content—they point to the real files."
    echo ""

    wait_for_key
}

# Option 4: Run AI review
handle_run_review() {
    clear
    echo -e "${BOLD}Recent Sessions${NC}"
    echo ""
    ls -1d sessions/prep_* 2>/dev/null | xargs -n1 basename | sort -r | head -5
    echo ""
    read -p "Enter session name: " session

    clear
    echo -e "${BOLD}Running AI review...${NC}"
    echo "(This may take a moment)"
    echo ""

    ./scripts/gen_session_review.sh "$session"

    clear
    echo -e "${BOLD}AI Review Complete${NC}"
    echo ""
    echo "Review output:"
    echo "  ${GREEN}sessions/$session/review.md${NC}"
    echo ""
    echo "JSON response (for reference):"
    echo "  ${GREEN}sessions/$session/review.json${NC}"
    echo ""
    echo "Open review.md to see your detailed feedback across:"
    echo "  - Problem Decomposition"
    echo "  - Question Quality"
    echo "  - AI Direction"
    echo "  - Scope Judgment"
    echo "  - Production Thinking"
    echo "  - Communication Clarity"
    echo ""
    echo "Plus perspectives from VP of Engineering and Software Architect"
    echo ""

    wait_for_key
}

# Main loop
while true; do
    show_main_menu

    case "$choice" in
        1)
            handle_new_session
            ;;
        2)
            handle_session_instructions
            ;;
        3)
            handle_create_log
            ;;
        4)
            handle_run_review
            ;;
        q|Q)
            clear
            echo "Goodbye!"
            exit 0
            ;;
        *)
            clear
            echo "Invalid option. Please select 1-4 or q."
            sleep 1
            ;;
    esac
done
