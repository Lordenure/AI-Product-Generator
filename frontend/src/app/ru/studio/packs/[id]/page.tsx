import { PackDetailScreen } from "@/features/studio/PackDetailScreen";

type RussianStudioPackPageProps = {
  params: Promise<{ id: string }>;
};

export default async function RussianStudioPackPage({ params }: RussianStudioPackPageProps) {
  const { id } = await params;

  return <PackDetailScreen locale="ru" packId={id} />;
}
