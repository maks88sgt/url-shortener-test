import { CreateShortUrl } from '../components/CreateShortUrl';
import { DeleteShortUrl } from '../components/DeleteShortUrl';

export default function Dashboard() {
  return (
    <main className="space-y-10">
      <CreateShortUrl />
      <DeleteShortUrl />
    </main>
  );
}
