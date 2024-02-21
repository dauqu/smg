import Header from "../components/header";
import SubHeader from "../components/sub-header";

export default function Page(params) {
  return (
    <div>
      <div className="fixed top-0 left-0 right-0 z-10">
        <Header />
        <SubHeader />
      </div>
      <div>
        Harsha Web 
      </div>
    </div>
  );
}
