import OpenAI from "openai";

// OpenAIクライアントの初期化
const client = new OpenAI({
  apiKey: process.env.SUBQ_API_KEY,
  baseURL: "https://api.subq.ai/v1",
});

/**
 * アウトプットの形を制御するメソッド
 */
const main = async () => {
  // AIモデルにリクエストを送信し、構造化されたJSONスキーマでの応答を取得する
  const response = await client.responses.create({
    model: "subq-preview",
    instructions: "Return Nobel Peace Prize laureates for only the year range in the user message. One array entry per laureate (shared prizes produce multiple entries with the same year). Set kind to 👤 for a person and 🏛️ for an organization or institution. Use ISO 3166-1 alpha-2 country codes. Keep each motivation to one sentence.",
    input: "List Nobel Peace Prize winners from 2022 through 2024.",
    text: {
      format: {
        type: "json_schema",
        name: "nobel_peace_laureates",
        strict: true,
        schema: {
          type: "object",
          properties: {
            laureates: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  year: {
                    type: "integer"
                  },
                  name: {
                    type: "string"
                  },
                  kind: {
                    type: "string",
                    enum: [
                      "👤",
                      "🏛️"
                    ],
                    description: "👤 for a person; 🏛️ for an organization or institution"
                  },
                  country_code: {
                    type: "string",
                    description: "ISO 3166-1 alpha-2"
                  },
                  motivation: {
                    type: "string",
                    description: "One-sentence citation summary"
                  }
                },
                required: [
                  "year",
                  "name",
                  "kind",
                  "country_code",
                  "motivation"
                ],
                additionalProperties: false
              }
            }
          },
          required: [
            "laureates"
          ],
          additionalProperties: false
        }
      }
    }
  });

  console.log(response.output[0].content[0].text);
}

main();