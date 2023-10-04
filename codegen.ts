import type { CodegenConfig } from "@graphql-codegen/cli";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

const config: CodegenConfig = {
  schema: `${process.env.NEXT_PUBLIC_URL_SERVER_GRAPHQL}/graphql`,
  documents: ["./src/graphql/**/*.graphql"],
  generates: {
    "./src/graphql/generated/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
    },
  },
};

export default config;
