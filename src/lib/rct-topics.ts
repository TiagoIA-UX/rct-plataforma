import { loadPrivateMjs } from "@/lib/load-private";

type TopicsPrivate = {
  pickNextBlogTopic: () => { tema: string; referencia?: string; categoria: string };
  resetSerieIndex: () => void;
};

/** Delega à série confidencial em private/lib/rct-topics.mjs */
export function pickNextBlogTopic(): { tema: string; referencia?: string; categoria: string } {
  const mod = loadPrivateMjs<TopicsPrivate>("rct-topics");
  if (!mod?.pickNextBlogTopic) {
    return { tema: "RCT — conteúdo em configuração local", categoria: "epigenetica" };
  }
  return mod.pickNextBlogTopic();
}

export function resetSerieIndex() {
  const mod = loadPrivateMjs<TopicsPrivate>("rct-topics");
  mod?.resetSerieIndex?.();
}
