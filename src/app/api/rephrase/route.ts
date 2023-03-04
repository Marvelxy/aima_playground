export async function GET(request: Request) {
  const { Configuration, OpenAIApi } = require("openai");

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
  });
  const openai = new OpenAIApi(configuration);
  const original_text = 'Benjamin Franklin FRS FRSA FRSE was an American polymath who was active as a writer, scientist, inventor, statesman, diplomat, printer, publisher, forger and political philosopher.';
  const rephrase = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Rephrase this text: " + original_text,
    temperature: 0.3,
    max_tokens: 100,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return new Response(
    JSON.stringify({
      original_text: original_text,
      rephrased_text: rephrase.data.choices[0].text,
    }),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    }
  )
}
