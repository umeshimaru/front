import { Header } from "./common/components/layouts/Header/Header";
import { Home } from "./top-page/Home";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Home />
      </main>
    </>
  );
}
