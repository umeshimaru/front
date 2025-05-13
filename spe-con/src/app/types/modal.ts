export type AuthMode = "login" | "signup" | "forgot-password"

export const AUTH_MODAL_CONFIG = {
  login: {
    title: "ログイン",
    description: "アカウントにログインしてください",
  },
  signup: {
    title: "アカウント登録",
    description: "新しいアカウントを作成してください",
  },
  "forgot-password": {
    title: "パスワードをリセット",
    description: "パスワードリセット用のリンクをお送りします",
  },
}
