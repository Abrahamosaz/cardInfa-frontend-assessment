import Content from "@/components/Content";
import SideBar from "@/components/sidebar/SideBar";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex w-full h-screen overflow-hidden">
      <SideBar />
      <Content>{children}</Content>
    </div>
  );
}
