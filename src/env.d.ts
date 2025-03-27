declare namespace NodeJS {
  interface ProcessEnv {
    ACCESS_TOKEN_EXPIRES_IN: string; // Đảm bảo nó là string
  }
}
