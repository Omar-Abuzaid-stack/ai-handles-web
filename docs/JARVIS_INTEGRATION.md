# Jarvis Command Center — AI Handle Integration

This document explains how to connect the AI Handle website (`https://aihandle.cloud`) to the Jarvis Command Center agent system.

## Overview

The AI Handle website exposes a machine-readable knowledge endpoint and a sync webhook. Jarvis agents can use these endpoints to stay up to date with the latest public information about AI Handle's services, agents, team, and contact details.

## How It Works

1. When public content is published on the AI Handle website, a new knowledge version is generated.
2. Jarvis can periodically check for new versions using the public-knowledge endpoint.
3. For secure sync, Jarvis can call the jarvis-sync endpoint with an API token.

## API Endpoints

### Public Knowledge Feed (No Auth Required)

```
GET https://aihandle.cloud/api/public-knowledge
```

Returns a JSON object containing all approved public information:
- Brand name, tagline, domain
- Founder and sales manager details
- Services and descriptions
- AI agent roles and responsibilities
- Supported industries
- Integration partners
- Public page URLs

### Jarvis Sync Endpoint (Token Required)

```
POST https://aihandle.cloud/api/jarvis-sync
Authorization: Bearer <JARVIS_API_TOKEN>
```

Returns the same knowledge payload as the public-knowledge endpoint, authenticated.

```
GET https://aihandle.cloud/api/jarvis-sync
```

Returns service metadata and current knowledge version without authentication.

## Environment Variables

Add these to your Jarvis Command Center configuration:

```env
AI_HANDLE_KNOWLEDGE_URL=https://aihandle.cloud/api/public-knowledge
AI_HANDLE_SYNC_URL=https://aihandle.cloud/api/jarvis-sync
AI_HANDLE_API_TOKEN=<shared-secret-token>
AI_HANDLE_WEBSITE=https://aihandle.cloud
```

## Adding AI Handle Knowledge to Jarvis Agents

1. **Website Knowledge**: Add `https://aihandle.cloud` as a known website. Jarvis agents should reference this URL when discussing AI Handle.

2. **Agent Knowledge**: Add the following key facts to Jarvis's shared knowledge:

   - AI Handle is a UAE-based AI agency serving the Gulf and globally
   - Founder: Omar Mohamed (AIHandle.cloud@gmail.com, +971 50 803 3084)
   - Sales Manager: Mohamed Rayan (mrayhan2005m@gmail.com, +971 54 553 0754)
   - Services: AI Agents, Automations, Premium Websites, AI Voice, Growth Systems
   - Website: https://aihandle.cloud

3. **Outreach Agent**: Update the outreach-agent guidance so that relevant prospects may be directed to `https://aihandle.cloud`. Do not force the link into irrelevant messages. Preserve existing outreach pacing and approval controls.

## Automated Sync

For continuous sync, you can set up a scheduled task in Jarvis:

1. Periodically (e.g., daily) call `GET /api/jarvis-sync` to check the current version
2. Compare with the stored version
3. If newer, call `POST /api/jarvis-sync` with the API token to fetch the full knowledge payload
4. Update Jarvis's internal knowledge store with the new data

## Security Notes

- The public-knowledge endpoint contains only approved public information
- No private admin data, API keys, or internal system details are exposed
- The jarvis-sync endpoint requires a Bearer token for POST requests
- All tokens and secrets must be stored server-side only
- Never commit real tokens to version control

## Testing the Connection

To verify the integration is working:

1. Test the public-knowledge endpoint:
   ```bash
   curl https://aihandle.cloud/api/public-knowledge
   ```

2. Test the sync endpoint:
   ```bash
   curl -H "Authorization: Bearer <token>" \
        -X POST https://aihandle.cloud/api/jarvis-sync
   ```

3. Verify the response includes the `version` and `updatedAt` fields

## Support

For integration support, contact Omar Mohamed:
- Email: AIHandle.cloud@gmail.com
- Phone: +971 50 803 3084
- Website: https://aihandle.cloud/contact
