import { ProfileScreen } from "@/features/profile/ProfileScreen";

type RussianProfilePageProps = {
  params: Promise<{ id: string }>;
};

export default async function RussianProfilePage({ params }: RussianProfilePageProps) {
  const { id } = await params;

  return <ProfileScreen locale="ru" profileId={id} />;
}
