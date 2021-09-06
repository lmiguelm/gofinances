export const USER_COLLECTION = '@gofinances:user';

export function TRANSACTIONS_COLLECTION(userId: string) {
  return `@gofinances:transactions_user:${userId}`;
}
