import Header from "../components/layout/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main role="main" className="pt-16">
        {children}
      </main>
    </>
  );
}
