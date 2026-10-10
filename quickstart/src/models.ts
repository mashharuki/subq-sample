import OpenAI from "openai";

// OpenAIクライアントの初期化
const client = new OpenAI({
  apiKey: process.env.SUBQ_API_KEY,
  baseURL: "https://api.subq.ai/v1",
});

/**
 * AIモデルをリスト化するメソッド
 */
const main = async () => {
  // AIモデルをリスト化する
  const models = await client.models.list();

  console.log(models.data.map((model) => model.id));
}

main();