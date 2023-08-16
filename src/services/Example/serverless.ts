import type { AWS } from "@serverless/typescript";

import {
  CreatePosition,
  DeletePosition,
  GetAllPositions,
  GetFilterPosition,
  GetPosition,
  UpdatePosition,
} from "./src/functions";

const serverlessConfiguration: AWS = {
  service: "aws-lambda-bg97-positions",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild", "serverless-offline"],
  provider: {
    name: "aws",
    runtime: "nodejs16.x",
    stage: "${self:provider.environment.STAGE}",
    // @ts-ignore
    region: "${self:provider.environment.REGION_AWS}", //DEV OHIO -- PROD us-east-1 VIRGINIA
    // @ts-ignore
    logRetentionInDays: 1,
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
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
  },
  configValidationMode: "error",
  functions: {
    CreatePosition,
    DeletePosition,
    GetAllPositions,
    GetFilterPosition,
    GetPosition,
    UpdatePosition,
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
  },
};

module.exports = serverlessConfiguration;
