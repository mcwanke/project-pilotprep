#!/usr/bin/env python3

import json
import sys

def compile_review(json_data, session_path):
    """Parse JSON review data and write formatted markdown to session folder."""

    try:
        review = json.loads(json_data)
    except json.JSONDecodeError as e:
        print(f"Error parsing JSON: {e}", file=sys.stderr)
        sys.exit(1)

    session_name = review.get('session', 'unknown')
    date = review.get('date', 'unknown')
    stack = review.get('stack', 'unknown')

    # Build markdown output
    lines = []

    # Header
    lines.append(f"# Review — {session_name}")
    lines.append(f"\nDate: {date}  |  Stack: {stack}")
    lines.append("\n---\n")

    # Scoring dimensions table
    lines.append("## Scoring")
    lines.append("\n| Dimension | Score | Feedback |")
    lines.append("|-----------|-------|----------|")

    scoring = review.get('scoring', {})
    for dimension in ['problem_decomposition', 'question_quality', 'ai_direction',
                      'scope_judgment', 'production_thinking', 'communication_clarity']:
        dim_data = scoring.get(dimension, {})
        score = dim_data.get('score', 0)
        max_score = dim_data.get('max', 10)
        feedback = dim_data.get('feedback', '')

        # Format dimension name for display
        display_name = dimension.replace('_', ' ').title()

        lines.append(f"| {display_name} | {score}/{max_score} | {feedback} |")

    # Overall score
    overall = scoring.get('overall', {})
    overall_score = overall.get('score', 0)
    overall_max = overall.get('max', 10)
    lines.append(f"\n**Overall: {overall_score}/{overall_max}**")

    lines.append("\n---\n")

    # Reviewer perspectives
    lines.append("## Reviewer Perspectives\n")

    perspectives = review.get('reviewer_perspectives', {})

    # VP Engineering
    vp_data = perspectives.get('vp_engineering', {})
    vp_feedback = vp_data.get('feedback', '')
    vp_hire = vp_data.get('would_hire', False)
    vp_verdict = "✓ Would Hire" if vp_hire else "✗ Would Not Hire"

    lines.append("### VP of Engineering")
    lines.append(f"\n{vp_verdict}\n")
    lines.append(f"{vp_feedback}\n")

    # Software Architect
    arch_data = perspectives.get('software_architect', {})
    arch_feedback = arch_data.get('feedback', '')
    arch_hire = arch_data.get('would_hire', False)
    arch_verdict = "✓ Would Hire" if arch_hire else "✗ Would Not Hire"

    lines.append("### Software Architect")
    lines.append(f"\n{arch_verdict}\n")
    lines.append(f"{arch_feedback}\n")

    lines.append("---\n")

    # Verdict
    lines.append("## Verdict\n")

    verdict = review.get('verdict', {})

    is_awesome = verdict.get('is_this_person_awesome', '')
    strongest_signal = verdict.get('strongest_signal', '')
    biggest_gap = verdict.get('biggest_gap', '')
    one_thing = verdict.get('one_thing_to_improve', '')

    lines.append(f"### Is This Person Awesome?\n")
    lines.append(f"{is_awesome}\n")

    lines.append(f"### Strongest Signal\n")
    lines.append(f"{strongest_signal}\n")

    lines.append(f"### Biggest Gap\n")
    lines.append(f"{biggest_gap}\n")

    lines.append(f"### One Thing to Improve Next Time\n")
    lines.append(f"{one_thing}\n")

    # Write output
    output_path = f"{session_path}/review.md"
    with open(output_path, 'w') as f:
        f.write('\n'.join(lines))

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: review_compiler.py <session_path>", file=sys.stderr)
        sys.exit(1)

    session_path = sys.argv[1]
    json_input = sys.stdin.read()

    compile_review(json_input, session_path)
