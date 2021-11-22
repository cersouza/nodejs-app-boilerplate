export default class Helpers {
  static isTestingEnvironment() {
    const env = process.env.NODE_ENV;
    return !!env && ['dev', 'stg', 'prd'].includes(env);
  }
}
