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
} from "./../../services/User/src/fuctions";

const serverlessConfiguration: AWS = {
  service: "microserv-ecommerce-bg97",
  frameworkVersion: "3",
  plugins: [
    "serverless-esbuild",
    "serverless-offline",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs16.x",
    stage: "${self:provider.environment.STAGE}",
    // @ts-ignore
    region: "${self:provider.environment.REGION_AWS}",
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
    Login,
    RegisterUsers,
    ResetPasswordConfirmUsers,
    ResetPassUsers,
    ResetPasswordConfirmCode,
    GetUsers,
    DeleteUser,
    UpdateUsers, 
    GetAllUsers,
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
