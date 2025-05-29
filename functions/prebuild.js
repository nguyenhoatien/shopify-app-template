const fs = require('fs');
const toml = require('toml');

const envPath = '../.env';
const appPath = '../shopify.app.toml';
const prodAppPath = '../shopify.app.prod.toml';

const envVariables = (() => {
  const envString = fs.readFileSync(envPath, 'utf-8');
  const lines = envString.trim().split('\n');
  const output = {};

  lines.forEach(line => {
    const [key, value] = line.split('=');
    if (value !== undefined) {
      output[key.trim()] = value.trim();
    }
  });

  return output;
})();

const appConfig = (() => {
  const tomlString = fs.readFileSync(appPath, 'utf-8');
  const prodTomlString = fs.readFileSync(prodAppPath, 'utf-8');
  const parsedConfig = toml.parse(tomlString);
  const prodParsedConfig = toml.parse(prodTomlString);
  if (parsedConfig.client_id === envVariables['SHOPIFY_API_KEY']) {
    return parsedConfig;
  } else if (prodParsedConfig.client_id === envVariables['SHOPIFY_API_KEY']) {
    return prodParsedConfig;
  } else {
    throw new Error('SHOPIFY_API_KEY does not match any app configuration');
  }
})();

envVariables.SHOPIFY_APP_URL = new URL(appConfig.application_url).hostname;
envVariables.SMTP_USER = 'tiennguyen@meowcart.net';
envVariables.SMTP_PASSWORD = 'lgfg duvl ykdn lgki';

fs.writeFileSync(`shopify.app.json`, JSON.stringify(envVariables, null, 2));