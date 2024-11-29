import SearchHeader from "@/components/SearchHeader";
import "./../globals.css";
import SearchHeaderOptions from "@/components/SearchHeaderOptions";

export default function SearchLayout({ children }) {
  return (
    <div>
      <SearchHeader />
      <SearchHeaderOptions/>
      {children}
      {/* Footer */}
    </div>
  );
}