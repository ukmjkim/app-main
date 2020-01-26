const packageJson = require("./package.json");
const { resolve } = require('path');
const { writeFileSync } = require('fs');
const moment = require('moment');
const buildVersion = packageJson.version;
const builtDate = moment(new Date()).format('DD-MMM-YYYY HH:mm');

const buildInfo = {
  version: buildVersion,
  buildDateTime: builtDate
};

try {
  const file = resolve(__dirname, '.', 'src', 'environments', 'version.ts');
  writeFileSync(file,
    `// IMPORTANT: THIS FILE IS AUTO GENERATED! DO NOT MANUALLY EDIT OR CHECKIN!
export const dataTableBuildInfo = ${JSON.stringify(buildInfo, null, 4)};
`, { encoding: 'utf-8' });

    console.log('Build version set: ' + buildVersion);
    console.log('Build time set: ' + builtDate);
} catch (error) {
    console.error('Error occurred:', error);
}
