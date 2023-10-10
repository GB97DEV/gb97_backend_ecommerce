import type { AWS } from "@serverless/typescript";

import {
  GetAllTag,
  GetFilterTag,
  GetTag,
  CreateTag,
  DeleteTag,
  UpdateTag,
} from "./src/functions";

const serverlessConfiguration: AWS = {
  service: "msrv-pv-tag",
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
    GetAllTag,
    GetFilterTag,
    GetTag,
    CreateTag,
    DeleteTag,
    UpdateTag,
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
