# Review — prep_001_python

Date: 2026-08-25  |  Stack: python

---

## Scoring

| Dimension | Score | Feedback |
|-----------|-------|----------|
| Problem Decomposition | 8/10 | Clear restatement with explicit assumptions and well-scoped in/out boundaries. Decided permit_type validation logic upfront. Main gap: risks section marked 'None — ready to execute' when production concerns should have been surfaced during planning, not retrospectively. This reflects incomplete hazard analysis at decomposition time. |
| Question Quality | 8/10 | Asked good clarifying questions on case number generation, error display format, and form submission approach. Questions guided design decisions before committing to code. Could have pressed harder on downstream system shape (query pattern, re-fetch requirements) given the dead-end into DB noted later, but reasonable for scope. |
| Ai Direction | 7/10 | Candidate stopped AI from implementing prematurely—good leadership instinct. However, accepted AI's dropdown suggestion over the freeform text requirement specified in the prompt. Candidate rationalized it ('removes possibility of errors'), showing judgment but not enforcement of spec. The deviation is minor and pragmatic, but a stronger director would have either pushed back or explicitly logged it as a tradeoff in the workorder. |
| Scope Judgment | 8/10 | Made deliberate scope tradeoffs (email, uploads, multi-user, CSRF all excluded). Stayed within boundaries and completed a working subset in 45 minutes. Planning phase ran longer than expected, which ate some implementation time—prioritization could be sharper next time (noted: 'probably not read as much of the code to save time'). |
| Production Thinking | 6/10 | Major gap: risks were not surfaced during planning. The workorder confidently states 'Risks & Open Questions: None — ready to execute,' but the session log later identifies SQL injection, validation gaps, missing debug logging, and undefined downstream integration. These are critical production concerns that should have been in the hazard analysis upfront. Candidate shows good retrospective thinking but weak prospective rigor. |
| Communication Clarity | 8/10 | Workorder is well-structured and unambiguous. Session log is honest and readable, including self-critique ('felt like this goes against instructions'). Shows clear thinking trail. Slightly thin on the AI direction narrative—could have documented the dropdown pushback moment more explicitly as a leadership lesson. |

**Overall: 8/10**

---

## Reviewer Perspectives

### VP of Engineering

✓ Would Hire

Solid fundamentals. This person can take ambiguous requirements, ask clarifying questions, structure a plan, and stay in control of an AI tool. Completed deliverable on time. Gap is production thinking—should have been more paranoid upfront about validation and injection risks, and more assertive enforcing spec constraints. This is learnable with a strong tech lead mentor. Would add to a team.

### Software Architect

✓ Would Hire

Architecture decisions are sound—schema is normalized, endpoint scope is tight, logging is two-table (permits + attempts) not monolithic. The case number choice (auto-increment ID, CASE-{id:04d}) is pragmatic. Scope boundary work is excellent. Concern: the dropdown vs. freeform deviation suggests candidate may accept AI suggestions even when they conflict with requirements, rather than insist on spec. In a high-stakes architecture role, we need people who push back. But this candidate shows strong thinking—they'll grow.

---

## Verdict

### Is This Person Awesome?

Strong engineer, not exceptional. Demonstrates clear thinking, good decomposition, scope discipline, and the ability to stay in control of a tool. Does not yet demonstrate the production paranoia and spec enforcement that separates very-good from exceptional.

### Strongest Signal

Problem decomposition and scope management. Candidate wrote a WORKORDER with clear boundaries, explicit assumptions, and prioritized scope that got built in time. This is teachable structure—suggests someone who will scale well.

### Biggest Gap

Production thinking during planning phase, not retrospective. Marked 'no risks' in the workorder when SQL injection, validation, and integration unknowns should have been obvious flags. This is the most critical gap for a leadership hire—leaders must surface hazards early.

### One Thing to Improve Next Time

Be more assertive about requirement enforcement when AI suggests deviations. Candidate is reasonable and pragmatic (acknowledged the dropdown trade), but a strong leader owns the spec. Push back harder, or if you accept a change, document it as a deliberate tradeoff in the workorder with rationale. Don't let it slip through as an accident.
