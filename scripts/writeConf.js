const fs = require("fs")
const { promisify } = require('util')
const writeFile = promisify(fs.writeFile)
const readFile = promisify(fs.readFile)

const writeConf = async () => {
  const { CMS_REPO, CMS_BRANCH, CMS_DOMAIN } = process.env

  if (CMS_REPO && CMS_BRANCH && CMS_DOMAIN) {
    const config = await readFile('./admin/config.yml', 'utf8')
    let replacedConfig = config
      .replace('${CMS_REPO}', CMS_REPO)
      .replace('${CMS_BRANCH}', CMS_BRANCH)
      .replace('${CMS_DOMAIN}', CMS_DOMAIN)
    await writeFile('./admin/config.yml', replacedConfig)
    console.info("Configuration replaced")
  } else {
    console.info("The configuration was not replaced")
  }
}

writeConf()
