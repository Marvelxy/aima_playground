import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

export async function POST(request: Request, res:Response) {
  const headersList = headers();
  const referer = headersList.get('referer');

  const result = await request.json();

  if (!result.text_to_rephrase) {
    return NextResponse.json(
      {
        error: 'Text to rephrase not found.'
      },
      {
        status: 400,
        headers: {
          'content-type': 'application/json',
        },
      }
    )
  }

  const { Configuration, OpenAIApi } = require("openai");

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
  });
  const openai = new OpenAIApi(configuration);
  // const original_text = 'Benjamin Franklin FRS FRSA FRSE was an American polymath who was active as a writer, scientist, inventor, statesman, diplomat, printer, publisher, forger and political philosopher.';
  const original_text = result.text_to_rephrase;
  const rephrase = await openai.createCompletion({
    model: "text-davinci-003",
    // prompt: "Rephrase this text: " + original_text,
    prompt: "Rephrase professional: " + original_text,
    temperature: 0.3,
    max_tokens: 100,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return NextResponse.json(
    {
      referer: referer,
      original_text: original_text,
      rephrased_text: rephrase.data,
    },
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    }
  )
}
