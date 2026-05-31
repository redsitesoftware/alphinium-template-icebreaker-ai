# Icebreaker AI — Going Live Checklist

## Overview
AI-powered party/team game platform. Revenue via event packages + corporate HR tool licensing.

## Step 1: Real alphinium-ai Integration
1. Replace hardcoded question sets with live AI generation:
   ```js
   // POST /api/generate-questions
   // body: { theme, numPlayers, vibe, nsfw: false }
   ```
2. GPT-4 / Claude generates contextually appropriate questions
3. Players' names fed into prompts for personalised questions ("Dan, would you rather...")
4. Voice output: alphinium-ai text-to-speech reads questions aloud

## Step 2: Real Multiplayer Rooms
1. alphinium-games-multiplayer: WebSocket room management
2. Host creates room → share code → players join on their own devices
3. Voting: each player submits answer on their device
4. Results aggregate server-side → display on host screen

## Step 3: Game Mode Expansion
| Mode | Description |
|---|---|
| Would You Rather | Head-to-head A/B voting |
| Hot Takes | Rate controversial statements 1-10 |
| Two Truths One Lie | Group guessing game |
| Compatibility Quiz | Couples/friendship compatibility score |
| Team Trivia | AI-generated trivia by topic |
| Office Edition | Work-safe questions for corporate teams |

## Step 4: Corporate HR Market
- "Icebreaker AI for Teams" — Slack/Teams integration
- New employee onboarding games
- Remote team-building sessions
- HR/L&D pricing: $19/mo per team (up to 50 people)

## Step 5: Deploy
- Web: `icebreaker.alphinium.com`
- Shareable game link: `icebreaker.alphinium.com/join/ABC123`
- alphinium-ads on free tier (guests see ads, organisers don't)
