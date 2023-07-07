function requireEnv(name: string): string {
  if (process.env[name] === undefined) {
    throw new Error(`Environment variable ${name} is required`);
  }

    return process.env[name] as string;
}

export default requireEnv;