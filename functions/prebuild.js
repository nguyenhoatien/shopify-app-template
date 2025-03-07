const fs = require('fs');
const toml = require('toml');

const filePath = '../shopify.app.toml';
const envPath = '../.env';

const tomlString = fs.readFileSync(filePath, 'utf-8');
const parsedConfig = toml.parse(tomlString);
const envString = fs.readFileSync(envPath, 'utf-8');
const envVariables = {};
const lines = envString.trim().split('\n');

lines.forEach(line => {
    const [key, value] = line.split('=');
    if (key && value !== undefined) {
        envVariables[key.trim()] = value.trim();
    }
});

envVariables.SHOPIFY_APP_URL = new URL(parsedConfig.application_url).hostname;

fs.writeFileSync(`shopify.app.json`, JSON.stringify(envVariables, null, 2));