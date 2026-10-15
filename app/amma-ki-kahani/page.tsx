import type { Metadata } from "next";
import { chapters } from "@/content/story";
import { StoryHero } from "@/components/story/StoryHero";
import { ThreePaths } from "@/components/story/ThreePaths";
import { StoryChapter } from "@/components/story/StoryChapter";
import { YearProgress } from "@/components/story/YearProgress";
import { FamilyTree } from "@/components/story/FamilyTree";
import { Finale } from "@/components/story/Finale";
import { BandhaniDivider } from "@/components/motion/Dividers";

export const metadata: Metadata = {
  title: "Amma ki Kahani",
  description: "20 years, one kadhai and the whole Mittal family — the story behind Amma's ladoos, told in seven chapters with music and rhymes.",
};

export default function StoryPage() {
  return (
    <>
      <StoryHero />
      <ThreePaths />
      <BandhaniDivider />
      {chapters.map((c) => (
        <StoryChapter key={c.id} chapter={c} />
      ))}
      <YearProgress />
      <FamilyTree />
      <Finale />
    </>
  );
}
