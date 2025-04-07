import { Header } from "./common/components/layouts/Header/header";
import { Home } from "./top-page/home";

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
