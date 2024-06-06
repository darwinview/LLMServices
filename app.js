const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 9002;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");

const OPENAI_URL = "https://talentintelligence.openai.azure.com/";
const OPENAI_KEY = "a3611284de804ee6a395fd7e2827ec18";
const model = "gpt4";

const client = new OpenAIClient(
    OPENAI_URL,
    new AzureKeyCredential(OPENAI_KEY)
);

// Route for LLM action
app.post('/llm', (req, res) => {

    // Get data from request body
    const messages = (req.body);

    const temperature = 1;

    async function getChatCompletion() {
        try {

            const result = await client.getChatCompletions(
                model,
                messages,
                {
                    maxTokens: 4000,
                    temperature: temperature,
                    stop: null,
                    top_p: 0.95,
                    frequency_penalty: 0,
                    presence_penalty: 0
                }
            );

            const assistantMessage = result.choices[0].message.content;
            console.log(assistantMessage);

            res.json(assistantMessage)

        } catch (error) {
            res.json(error);
        }
    }

    getChatCompletion();
    
});

app.listen(port, () => {
    console.log('server running at https://localhost:' + port);
});

 
