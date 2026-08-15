import Anthropic from "@anthropic-ai/sdk";
import { aiPrompt } from "./prompt";



const anthropic = new Anthropic({
    apiKey: import.meta.env.VITE_CLAUDE_API_KEY,
    dangerouslyAllowBrowser: true
})


export async function generateOutput(userInput) {
    const message = await anthropic.messages.create({
        model: 'claude-opus-5',
        max_tokens: 1024,
        messages: [
            {
                role: 'user',
                content: aiPrompt(userInput)
            }
        ]
    })

    return message.content[0].text;
}