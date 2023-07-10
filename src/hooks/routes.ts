import { useRouter } from 'next/navigation';

export function useLinkCallback(path: string): () => void {
  const router = useRouter();

  return () => router.push(path);
}
