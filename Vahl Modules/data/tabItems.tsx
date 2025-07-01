import type { TabItem } from "../components/TabBar/types"
import { Home, FileText, MessageCircle, Users, BookOpen } from "lucide-react-native"

export const tabItems: TabItem[] = [
  {
    id: "home",
    icon: <Home size={24} color="#001e70" />,
    label: "HOME",
    route: "/(main)/home",
  },
  {
    id: "reference",
    icon: <FileText size={24} color="#001e70" />,
    label: "REFERENCE",
    route: "/(main)/reference",
  },
  {
    id: "chat",
    icon: <MessageCircle size={24} color="#001e70" />,
    label: "CHAT",
    route: "/(main)/chat",
  },
  {
    id: "contact",
    icon: <Users size={24} color="#001e70" />,
    label: "CONTACT",
    route: "/(main)/contact",
  },
  {
    id: "docs",
    icon: <BookOpen size={24} color="#001e70" />,
    label: "DOCS",
    route: "/(main)/docs",
  },
]
