export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Nötr bir arka plan rengi ile temiz bir çerçeve sunuyoruz.
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {children}
    </div>
  );
}
