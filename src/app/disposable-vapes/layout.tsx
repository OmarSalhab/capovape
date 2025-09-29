import Breadcrumb from "@/components/Breadcrumb";

export default function DisposableLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Breadcrumb />
      {children}
    </>
  );
}
