import { PackDetailScreen } from "@/features/studio/PackDetailScreen";

type StudioPackPageProps = {
  params: Promise<{ id: string }>;
};

export default async function StudioPackPage({ params }: StudioPackPageProps) {
  const { id } = await params;

  return <PackDetailScreen locale="en" packId={id} />;
}
