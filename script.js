const form = document.querySelector('form');
const templateSelect = document.querySelector('#template');
const topTextInput = document.querySelector('#top-text');
const bottomTextInput = document.querySelector('#bottom-text');
const result = document.querySelector('#result');
import { env } from './env.js'

fetch('https://api.imgflip.com/get_memes')
    .then(response => response.json())
    .then(data => {
    const templates = data.data.memes;
    templates.forEach(template => {
        const option = document.createElement('option');
        option.value = template.id;
        option.text = template.name;
        templateSelect.appendChild(option);
    });
    });

form.addEventListener('submit', event => {
    event.preventDefault();
    const templateId = templateSelect.value;
    const topText = topTextInput.value;
    const bottomText = bottomTextInput.value;
    fetch(`https://api.imgflip.com/caption_image?template_id=${templateId}&username=USERNAME&password=PASSWORD&text0=${encodeURIComponent(topText)}&text1=${encodeURIComponent(bottomText)}`)
        .then(response => response.json())
        .then(data => {
        const imageUrl = data.data.url;
        const memeImage = document.createElement('img');
        memeImage.src = imageUrl;
        result.appendChild(memeImage);
        })
        .catch(error => {
        console.error(error);
        });
});