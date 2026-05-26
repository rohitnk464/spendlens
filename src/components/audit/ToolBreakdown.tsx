import { ToolAuditResult } from "@/types";
import { getToolDisplayName, getToolEmoji } from "@/lib/pricing-data";
import { formatCurrency } from "@/lib/utils";
import { ArrowRight, CheckCircle2, AlertCircle, ArrowDownCircle, ExternalLink } from "lucide-react";

export default function ToolBreakdown({ tools }: { tools: ToolAuditResult[] }) {
  const getIcon = (recommendation: string) => {
    switch (recommendation) {
      case "keep": return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "downgrade": return <ArrowDownCircle className="w-5 h-5 text-amber-500" />;
      case "switch": return <ArrowRight className="w-5 h-5 text-blue-500" />;
      case "optimize": return <AlertCircle className="w-5 h-5 text-purple-500" />;
      default: return <AlertCircle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getLabel = (recommendation: string) => {
    switch (recommendation) {
      case "keep": return "Optimal";
      case "downgrade": return "Downgrade Plan";
      case "switch": return "Switch Tool";
      case "optimize": return "Optimize Usage";
      default: return recommendation;
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold mb-6">Detailed Tool Breakdown</h3>
      
      <div className="grid grid-cols-1 gap-4">
        {tools.map((result, idx) => {
          const isOptimal = result.recommendation === "keep";
          
          return (
            <div 
              key={idx} 
              className={`p-5 sm:p-6 rounded-2xl border transition-all duration-300 ${
                isOptimal 
                  ? "bg-secondary/10 border-border/30 opacity-70" 
                  : "glass border-primary/20 shadow-lg hover:shadow-primary/10 hover:-translate-y-1 hover:border-primary/40"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{getToolEmoji(result.tool)}</div>
                  <div>
                    <h4 className="font-semibold text-lg">{getToolDisplayName(result.tool)}</h4>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="capitalize">{result.currentPlan}</span>
                      <span>·</span>
                      <span className="font-medium">{formatCurrency(result.currentMonthlyCost)}/mo</span>
                    </div>
                  </div>
                </div>
                
                <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap self-start sm:self-auto shadow-sm ${
                  isOptimal ? "bg-secondary/50 text-muted-foreground" : "bg-primary/10 text-primary border border-primary/20"
                }`}>
                  {getIcon(result.recommendation)}
                  {getLabel(result.recommendation)}
                </div>
              </div>

              {!isOptimal && (
                <div className="mt-4 p-4 rounded-xl bg-secondary/30 border border-border/50">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-3">
                    <div className="flex-1">
                      <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">
                        Recommended Action
                      </div>
                      <div className="flex items-center gap-2 font-medium">
                        {result.alternativeTool && result.alternativeTool !== result.tool ? (
                          <>
                            <span className="line-through text-muted-foreground">{getToolDisplayName(result.tool)}</span>
                            <ArrowRight className="w-4 h-4 text-muted-foreground" />
                            <span className="text-primary">{getToolDisplayName(result.alternativeTool as import("@/types").AITool)}</span>
                            {result.recommendedPlan && <span className="text-muted-foreground">({result.recommendedPlan})</span>}
                          </>
                        ) : (
                          <>
                            <span className="line-through text-muted-foreground">{result.currentPlan}</span>
                            <ArrowRight className="w-4 h-4 text-muted-foreground" />
                            <span className="text-primary">{result.recommendedPlan || "Optimize"}</span>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-left sm:text-right">
                      <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">
                        New Cost
                      </div>
                      <div className="font-bold text-green-500">
                        {formatCurrency(result.newMonthlyCost)}/mo
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-muted-foreground leading-relaxed pt-3 border-t border-border/50">
                    <span className="font-semibold text-foreground mr-1">Reasoning:</span>
                    {result.reasoning}
                  </div>

                  {/* Action button for optimize/switch/downgrade */}
                  <div className="pt-3">
                    {result.recommendation === "optimize" ? (
                      <a
                        href="https://credex.rocks"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-all hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5 active:translate-y-0"
                      >
                        Optimize via Credex Credits
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : result.recommendation === "switch" || result.recommendation === "downgrade" ? (
                      <a
                        href="https://credex.rocks"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary text-sm font-semibold border border-primary/20 hover:border-primary/40 transition-all hover:-translate-y-0.5 active:translate-y-0"
                      >
                        Save more with Credex Credits
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : null}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
