import Header from "./_component/Header";
import { TabList } from "./_component/TabList";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen justify-center">
      <Header />
      <div className="flex flex-1 justify-between">
        <TabList />
      </div>
    </div>
  );
}
