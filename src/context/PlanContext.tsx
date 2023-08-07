import { createContext, useContext, useState, ReactNode } from 'react';

interface PlanContextType {
  selectedPlanId: number | null;
  setSelectedPlanId: (id: number | null) => void;
}

const PlanContext = createContext<PlanContextType>({
  selectedPlanId: null,
  setSelectedPlanId: () => {},
});

export const usePlanContext = () => useContext(PlanContext);

interface PlanProviderProps {
  children: ReactNode;
}

export const PlanProvider: React.FC<PlanProviderProps> = ({ children }) => {
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);

  return (
    <PlanContext.Provider value={{ selectedPlanId, setSelectedPlanId }}>
      {children}
    </PlanContext.Provider>
  );
};
