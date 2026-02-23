import './style.css'
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { generateText, streamText } from 'ai';

const openrouter = createOpenRouter({
  apiKey: import.meta.env.VITE_OPENROUTER_KEY
})

const app = document.querySelector('#app');

const form = document.querySelector('#form');
const btnSubmit = document.querySelector('#submit');
form.addEventListener('submit', async e => {
  e.preventDefault();

  const prompt = document.querySelector('#prompt').value;

  if (prompt.trim() === '') {
    alert("la consulta no puede estar vacía");
    return;
  }

  btnSubmit.disabled = true;

  const result = streamText({
    //  model: openrouter('deepseek/deepseek-r1-0528:free'),
    // model:openrouter('openai/gpt-oss-20b:free'),
     model: openrouter('google/gemma-3n-e2b-it:free'),
    //  model:openrouter('meta-llama/llama-3.2-3b-instruct:free'),
    prompt, 
    // sistem:'eres una jovencita',
    // system:"eres un experto en seducción"
  })
  while (app.firstChild) {
    app.removeChild(app.firstChild);
  }
  for await (const text of result.textStream) {
    app.append(text)

  }
  btnSubmit.disabled = false

})