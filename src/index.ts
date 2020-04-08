import { Client, Expr, query as fauna } from 'faunadb';
import { WithRef } from './types';

export function createClient(secret: string) {
  return new Client({ secret });
}

export function createCaller(client: Client) {
  return async function call<T>(
    expression: Expr
  ): Promise<[Error | null, T | null]> {
    let [error, response]: [Error | null, T | null] = [null, null];
    try {
      response = await client.query<T>(expression);
    } catch (_error) {
      error = _error;
    }
    return [error, response];
  };
}

export function getIdFromRef(item: any) {
  return item.ref?.value?.id ?? item.ref['@ref']?.id;
}

export function payloadWithId<T>(item: WithRef<T>) {
  return {
    id: getIdFromRef(item),
    ...item.data,
  };
}

export { fauna as f };

export * from './collection';
export * from './indexes';
export * from './types';
export * from './user';
