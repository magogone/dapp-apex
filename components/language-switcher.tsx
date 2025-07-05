"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "zh" : "en");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLanguage}
      className="rounded-full bg-white shadow-sm"
      title={language === "en" ? "Switch to Chinese" : "切换到英文"}
    >
      <Globe className="h-5 w-5 text-gray-600" />
    </Button>
  );
}
