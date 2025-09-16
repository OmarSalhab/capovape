import Compliance from "@/components/Compliance";
import Breadcrumb from "@/components/Breadcrumb";

export default function BrandLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Compliance />
			<Breadcrumb />
			{children}
		</>
	);
}
