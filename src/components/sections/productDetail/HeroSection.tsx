import ComingSoon from "@/components/molecules/common/ComingSoon";
import { useTranslation } from "react-i18next";

export default function HeroSection() {
  const { t } = useTranslation("common");
  return <ComingSoon title={t("comingSoon.productDetail")} />;
}
