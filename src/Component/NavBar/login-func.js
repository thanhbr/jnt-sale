export async function signIn(cb) {
  await setTimeout(cb, 100) // fake async
}
export function signOut(cb) {
  setTimeout(cb, 100)
}
