// === Fake API Keys for Testing ===

const openai_api_key = "sk-1234567890abcdefghijklmnopqrstuv";
const hf_token = "hf_abcd1234efgh5678ijkl";
const groq_key = "gsk_0987lkjh6543mnbv";
const aws_secret_key = "AKIAIOSFODNN7EXAMPLE";
const google_key = "AIzaSyAABBCCDDEEFFGGHHIIJJKKLLMMNNOOPPQQ";
const stripe_key = "sk_live_abc1234567890xyzABC";
const github_token = "ghp_abcdefghijklmnopqrstuvwxyz123456";
const fake_key = "local_dev_key_test";
const another_key = "123456789";

// Multi-step assignments
const a = "hf_fake_token_value";
const token = a;

const tmp = "gsk_fakegroqvalue";
const groq_token = tmp;

// Google Gemini in request param
const gemini_key = "AIzaSyZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ";

// Literal 'keyword' variable
const keyword = "sk-abc123EXAMPLEKEYFOROPENAI";

// Generic but sensitive-looking variable name
const secret = "hf_fakehuggingfaceKEY999";

// Very ambiguous variable name, still should match by value
const access = "ghp_abcdEFGHijklMNOPqrstUVWXYZ123456";

// Keys inside an object
const auth = {
  key: "sk-abc987EXAMPLEKEY",
  backup_key: "hf_extraKEY_EXAMPLE123",
};

// Keys inside a list
const keys = ["sk-live-fakevalueEXAMPLE", "hf_anotherFakeKeyExample"];

// Keys in a class-like structure
const classKeys = {
  api_key: "sk-embeddedKEYEXAMPLE",
  hf: "hf_AnotherHiddenKeyExample",
};

// Key via join
const openai_key = "sk-abc123EXAMPLEKEY";

// Exporting all keys (optional)
export {
  openai_api_key,
  hf_token,
  groq_key,
  aws_secret_key,
  google_key,
  stripe_key,
  github_token,
  fake_key,
  another_key,
  token,
  groq_token,
  gemini_key,
  keyword,
  secret,
  access,
  auth,
  keys,
  classKeys,
  openai_key,
};
