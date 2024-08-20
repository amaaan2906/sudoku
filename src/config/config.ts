import dotenvExtended from 'dotenv-extended'
import dotenvParseVariables from 'dotenv-parse-variables'

const env = dotenvExtended.load({
  path: `src/config/.env.${process.env.APP_ENV}`,
  defaults: 'src/config/.env.defaults',
  schema: 'src/config/.env.schema',
  includeProcessEnv: true,
  silent: false,
  errorOnMissing: true,
  errorOnExtra: true,
})

const parsed_env = dotenvParseVariables(env)

interface Config {}

const config: Config = {}

export default config
