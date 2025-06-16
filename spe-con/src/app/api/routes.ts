// export const ROUTES = {
//   HOME: '/',
//   LOGIN: '/login',
//   SIGNUP: '/signup',
//   PROFILE: (userId?: string) => userId ? `/users/${userId}` : '/users/[userId]',
//   PRACTICE_MENU: '/practice-menu',
// };

// // 良くない(再利用性が悪く、変更箇所が増えて保守性が悪い)
// const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signup`)
// // 良い(再利用性が高く変更箇所が１ヶ所ですむ)
// const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ROUTES.SIGNUP`)
