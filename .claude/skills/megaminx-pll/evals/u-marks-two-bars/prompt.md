---
tags: [skill-creator]
max_turns: 30
timeout_seconds: 900
allowed_tools: [Read, Glob, Grep, Skill, Write, Edit, Bash]
---

Uの図を作ります。判断基準は、U1+とU1-は隣り合う2つのバー、U2+とU2-は離れた2つのバーです。リポジトリのファイルは書き換えず、pllMarks に足す内容(U1+・U1-・U2+・U2-)を marks.ts というファイルに書き出してください。
