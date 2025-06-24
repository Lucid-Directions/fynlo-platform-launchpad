
import { Hero } from "@/components/Hero";
import { MarketOpportunity } from "@/components/MarketOpportunity";
import { ProductShowcase } from "@/components/ProductShowcase";
import { BusinessSolutions } from "@/components/BusinessSolutions";
import { PlatformBusinessModel } from "@/components/PlatformBusinessModel";
import { TechnologyOverview } from "@/components/TechnologyOverview";
import { ProductDemo } from "@/components/ProductDemo";
import { ClientSuccess } from "@/components/ClientSuccess";
import { IndustryPartnerships } from "@/components/IndustryPartnerships";
import { InvestmentPricing } from "@/components/InvestmentPricing";
import { Implementation } from "@/components/Implementation";
import { SecurityCompliance } from "@/components/SecurityCompliance";
import { GettingStarted } from "@/components/GettingStarted";
import { ResourceCenter } from "@/components/ResourceCenter";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <MarketOpportunity />
      <ProductShowcase />
      <BusinessSolutions />
      <PlatformBusinessModel />
      <TechnologyOverview />
      <ProductDemo />
      <ClientSuccess />
      <IndustryPartnerships />
      <InvestmentPricing />
      <Implementation />
      <SecurityCompliance />
      <GettingStarted />
      <ResourceCenter />
    </div>
  );
};

export default Index;
