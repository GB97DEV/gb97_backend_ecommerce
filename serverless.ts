import type { AWS } from "@serverless/typescript";

import {
  RegisterUsers,
  Login,
  ResetPassUsers,
  ResetPasswordConfirmUsers,
  ResetPasswordConfirmCode,
  GetUsers,
  DeleteUser,
  UpdateUsers,
  GetAllUsers,
} from "./src/functions/User";

const serverlessConfiguration: AWS = {
  service: "aws-lambda-bg97",
  frameworkVersion: "3",
  plugins: [
    "serverless-esbuild",
    "serverless-offline",
    //"serverless-domain-manager",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs16.x",
    stage: "${self:provider.environment.STAGE}",
    // @ts-ignore
    region: "${self:provider.environment.REGION_AWS}", //DEV OHIO -- PROD us-east-1 VIRGINIA
    // @ts-ignore
    logRetentionInDays: 1,
    //"${file(./serverlessEnv.js):logRetentionInDays.${self:provider.stage}}",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },

    // iamRoleStatements: [
    //   {
    //     Effect: "Allow",
    //     Action: ["lambda:InvokeFunction", "lambda:InvokeAsync"],
    //     Resource: ["arn:aws:lambda:${self:provider.region}:*:*"],
    //   },
    //   {
    //     Effect: "Allow",
    //     Action: ["cognito-identity:*"],
    //     Resource: "*",
    //   },
    //   {
    //     Effect: "Allow",
    //     Action: ["cognito-idp:*"],
    //     Resource: "*",
    //   },
    //   {
    //     Effect: "Allow",
    //     Action: ["cognito-identify:*"],
    //     Resource: {
    //       "Fn::Join": [
    //         "",
    //         [
    //           "arn:aws:cognito-idp:${self:provider.environment.COGNITO_REGION}:",
    //           { Ref: "AWS::AccountId" },
    //           ":userpool/",
    //           "${self:provider.environment.COGNITO_USER_POOL_ID}",
    //         ],
    //       ],
    //     },
    //   },
    // ],
    environment: {
      STAGE: "${opt:stage, 'dev'}",
      SERVICE: "${self:service}",
      MONGOURL:
        "${file(./serverlessEnv.js):databaseM.${self:provider.stage}.mongoURL}",
      REGION_AWS:
        "${file(./serverlessEnv.js):region.${self:provider.stage}.regionAws}",
    },

    // environment: {
    //   JWTSECRET:
    //     "${file(./serverlessEnv.js):jwtSecret.${self:provider.stage}}",
    //   STAGE: "${opt:stage, 'dev'}",
    //   AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
    //   NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    //   SERVICE: "${self:service}",
    //   DATABASE:
    //     "${file(./serverlessEnv.js):database.${self:provider.stage}.database}",
    //   USERNAME:
    //     "${file(./serverlessEnv.js):database.${self:provider.stage}.username}",
    //   PASSWORD:
    //     "${file(./serverlessEnv.js):database.${self:provider.stage}.password}",
    //   DIALECT:
    //     "${file(./serverlessEnv.js):database.${self:provider.stage}.dialect}",
    //   HOST: "${file(./serverlessEnv.js):database.${self:provider.stage}.host}",
    //   PORT: "${file(./serverlessEnv.js):database.${self:provider.stage}.port}",
    //   TIMEZONE:
    //     "${file(./serverlessEnv.js):database.${self:provider.stage}.timezone}",
    //   COGNITO_USER_POOL_ID:
    //     "${file(./serverlessEnv.js):cognito.${self:provider.stage}}",
    //   COGNITO_REGION:
    //     "${file(./serverlessEnv.js):region.${self:provider.stage}}",
    //   COGNITO_APP_CLIENT_ID:
    //     "${file(./serverlessEnv.js):cognitoAppClientId.${self:provider.stage}}",
    //   URL_BY_API_ID:
    //     "${file(./serverlessEnv.js):urlByApiId.${self:provider.stage}}",
    //   CERTIFICATION:
    //     "${file(./serverlessEnv.js):corsDns.${self:provider.stage}}",
    //   ARN_AUTHORIZER:
    //     "${file(./serverlessEnv.js):arnAuthorizer.${self:provider.stage}}",
    //},
  },
  configValidationMode: "error",
  // import the function via paths
  functions: {
    Login,
    RegisterUsers,
    ResetPasswordConfirmUsers,
    ResetPassUsers,
    ResetPasswordConfirmCode,
    GetUsers,
    DeleteUser,
    UpdateUsers,
    GetAllUsers
  },
  package: {
    individually: true,
    patterns: ["src/schema/**/*", "node_modules/pdfkit/js/data/**"],
  },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
    //   customDomain: {
    //     domainName:
    //       "${file(./serverlessEnv.js):dnsEnv.${self:provider.stage}}.rigel-m.com", // Example subdomain.domain.com
    //     basePath: "back-obo",
    //     certificateName: "*.rigel-m.com", // Example *.domain.com
    //     createRoute53Record: true,
    //     autoDomain: true,
    //   },
  },
};

module.exports = serverlessConfiguration;
