import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.SUBQ_API_KEY,
  baseURL: "https://api.subq.ai/v1",
});

const stream = await client.chat.completions.create({
  model: "subq-snap-preview",
  messages: [
    {
      role: "user",
      content: "What's NVDA trading at right now?"
    }
  ],
  tools: [
    {
      type: "function",
      function: {
        name: "get_stock_quote",
        description: "Retrieves the latest quote for a stock ticker.",
        parameters: {
          type: "object",
          properties: {
            symbol: {
              type: "string",
              description: "Ticker symbol, e.g. NVDA or MSFT"
            },
            currency: {
              type: [
                "string",
                "null"
              ],
              enum: [
                "USD",
                "EUR"
              ],
              description: "Quote currency. Defaults to USD when null."
            },
            include_extended_hours: {
              type: "boolean",
              description: "When true, include pre-market and after-hours price if available."
            }
          },
          required: [
            "symbol",
            "currency",
            "include_extended_hours"
          ],
          additionalProperties: false
        },
        strict: true
      }
    }
  ],
  stream: true
});

let fullText = "";

for await (const chunk of stream) {
  const delta = chunk.choices[0]?.delta?.content ?? "";
  fullText += delta;
  process.stdout.write(delta);
}

console.log();
console.log(fullText);