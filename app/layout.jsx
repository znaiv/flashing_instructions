import "./globals.css";

export const metadata = {
  title: "Flashing Guide | sunny / mojito",
  description: "Flashing guide for Redmi Note 10 sunny/mojito.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
