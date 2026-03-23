# M'kango Golfview Hotel - AI Concierge Architecture & Features

This document provides a comprehensive breakdown of the M'kango Golfview Hotel AI Concierge chatbot, explaining how it operates under the hood, its architectural components, and its available features.

## Table of Contents
1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Core Logic & Flow](#core-logic--flow)
4. [Features](#features)
5. [Data & Knowledge Management](#data--knowledge-management)
6. [Models & Providers](#models--providers)

---

## Overview
The AI Concierge is a full-stack, intelligent chatbot designed to assist hotel guests with their stays, answer inquiries, direct bookings, and escalate complex support needs to human staff. It is integrated seamlessly into the Next.js frontend and powered by Vercel's AI SDK on the backend, with persistent conversations managed via Payload CMS.

---

## Architecture

The chatbot follows a modern frontend-to-API pattern utilizing the Vercel AI SDK and Payload CMS for persistent storage.

### 1. Frontend: The Chat Panel
- Component: `components/ai/chat-panel.tsx`
- Implementation: It's a React Client Component that renders the chat interface. It manages local state for messages, loading indicators, and user inputs. 
- Capabilities: 
  - Submits messages to the backend API (`/api/ai/concierge`).
  - Capable of rendering special Markdown links (e.g., specific buttons or links provided by the AI).
  - Dynamically displays "Shortcuts" (preset quick questions) for a seamless user start.
  - Maintains `isEscalated` state to show users that the hotel team has been notified.

### 2. Backend: The API Route
- Component: `app/api/ai/concierge/route.ts`
- Implementation: An AI-SDK integrated Next.js API Route exposing a `POST` handler.
- Responsibilities: 
  - Extracts the `conversationId` and user `message`.
  - Interfaces with the local Payload CMS connection.
  - Generates responses leveraging the configured language models.
  - Evaluates messages against structured **escalation rules**.

### 3. Database: Payload CMS
- Conversations Collection: Tracks active sessions, user details, and status (`AI_ACTIVE` vs. `PENDING_HUMAN`).
- Messages Collection: Stores both guest queries and AI responses, allowing context retrieval for the ongoing conversation up to the last 20 messages.

---

## Core Logic & Flow

1. **Initialization:** User opens the widget (`ChatPanel`), and a preset AI welcome message is shown. 
2. **Message Submission:** User sends a query. If there's no active `conversationId`, a new conversation thread is created in Payload with status `AI_ACTIVE`.
3. **Database Logging:** The user's query is saved to the `messages` collection linked to the conversation thread.
4. **Context Assembly:** The API route retrieves the past 20 messages for that `conversationId` to provide multi-turn conversation memory.
5. **Escalation Detection:** The incoming message is parsed against a predefined list of high-priority keywords (e.g., "wedding", "complaint", "invoice"). See [Features](#features) for detail.
6. **Prompt Assembly & AI Generation:** The system prompt, the escalated condition (if true), the `hotelKnowledge`, and `hotelFaqs` are all passed alongside the message context to the language model.
7. **Response Logging & Delivery:** The generated string is logged to Payload CMS as an `ai` message and finally returned to the frontend.

---

## Features

### 1. Booking Redirection
The AI is strictly conditioned NOT to invent prices, perform manual bookings, or guess availability. When a user explicitly mentions a booking, quotation, or checking prices for specific dates, the AI delivers a direct Markdown link (`[Book Online](/checkout)`) funneling the user seamlessly into the standard conversion flow.

### 2. Smart Escalation (Hybrid Handoff)
The chatbot identifies complex, high-value, or sensitive interactions using predefined triggers (e.g., conferences, airport transfers, complaints). 
- When an escalation occurs, the AI modifies its prompt to enter a **hybrid handoff pattern**. 
- It acknowledges that a human is needed and adds the exact confirmation string `✔ Message sent to hotel team`.
- At a database level, the conversation's state switches to `PENDING_HUMAN` and is marked as `unreadForStaff`.
- Crucially, the AI remains active and explicitly tells the user it can continue to answer basic, non-sensitive questions while waiting for the team. 

### 3. Shortcut Buttons
For new threads, the UI provides out-of-the-box shortcut buttons based on common queries like "What are the room rates?", "Is breakfast included?", and "Do you have a gym?".

### 4. Zero-Hallucination Guardrails
Through the carefully designed system prompt (`lib/ai/concierge-system-prompt.ts`), the concierge operates within strict boundaries:
- It only uses the explicit JSON payload of hotel facts.
- It actively declines tasks like guessing unconfirmed check-in times.
- It uses specific Zambian-context billing rules (e.g., indicating the presence of Tourism Levies without estimating total charges).

---

## Data & Knowledge Management

The chatbot relies heavily on locally maintained, structured data sources which it consumes directly into its context window.

- **System Prompt (`lib/ai/concierge-system-prompt.ts`):** Governs persona, limits, handoff directions, and links to CMS state.
- **Hotel Facts (`data/hotel-knowledge.ts`):** Core variables dictating hotel name, location, facilities, and contact methods.
- **Hotel FAQs (`data/hotel-faqs.ts`):** Prescribed answers to frequently asked questions ensuring accurate, pre-approved marketing positioning.
- **Escalation Triggers (`lib/ai/escalation-rules.ts`):** Specific arrays of keywords that force the API to handle the message as a priority staff ticket.

---

## Models & Providers

The application leverages the Vercel AI SDK to abstract provider operations (`@ai-sdk/groq` and `@ai-sdk/openai`). 

- **Primary Engine:** Uses Groq's high-throughput `llama-3.1-8b-instant` for ultra-fast conversational latency (the default provider).
- **Fallback Engine:** Configured to optionally fallback to OpenAI's `gpt-4o-mini` ensuring high availability if the primary provider hits rate limits or downtime.
- Configuration is centralized in `lib/ai/model-config.ts` relying on environment variables.
