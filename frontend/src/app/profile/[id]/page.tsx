import { ProfileScreen } from "@/features/profile/ProfileScreen";

type ProfilePageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { id } = await params;

  return <ProfileScreen locale="en" profileId={id} />;
}
