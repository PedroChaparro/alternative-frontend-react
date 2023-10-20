import { NavigationParams } from "@/types/enums";
import { ReactNode, createContext, useState } from "react";
import { useSearchParams } from "react-router-dom";

type NavigationParamsState = {
  [key in NavigationParams]: {
    history: string[];
  };
};

interface NavigationParamsContext {
  navigationParamsState: NavigationParamsState;
  pushToHistory: (navigationParam: NavigationParams, param: string) => void;
  popFromHistory: (navigationParam: NavigationParams) => void;
}

const defaultValues: NavigationParamsContext = {
  navigationParamsState: {
    [NavigationParams.DIRECTORY]: {
      history: []
    },
    [NavigationParams.MOVE_FILE]: {
      history: []
    }
  },
  pushToHistory: () => {},
  popFromHistory: () => {}
};

export const FoldersNavigationContext = createContext(defaultValues);

export const FoldersNavigationProviders = ({
  children
}: {
  children: ReactNode;
}) => {
  const [params, setParams] = useSearchParams();
  const [navigationParamsState, setNavigationParamsState] =
    useState<NavigationParamsState>(defaultValues.navigationParamsState);

  const pushToHistory = (navigationParam: NavigationParams, param: string) => {
    // Save the current value
    const currentParamValue = params.get(navigationParam) || "";
    setNavigationParamsState((prevState) => ({
      ...prevState,
      [navigationParam]: {
        history: [...prevState[navigationParam].history, currentParamValue]
      }
    }));

    // Set the new value
    params.set(navigationParam, param);
    setParams(params);
  };

  const popFromHistory = (navigationParam: NavigationParams) => {
    // Get the previous value (if any)
    const previousParamValue =
      navigationParamsState[navigationParam].history.pop();

    // Set the new value
    if (previousParamValue) {
      params.set(navigationParam, previousParamValue);
    } else {
      params.delete(navigationParam);
    }

    setParams(params);
    setNavigationParamsState((prevState) => ({
      ...prevState,
      [navigationParam]: {
        history: prevState[navigationParam].history.slice(0, -1)
      }
    }));
  };

  return (
    <FoldersNavigationContext.Provider
      value={{ navigationParamsState, pushToHistory, popFromHistory }}
    >
      {children}
    </FoldersNavigationContext.Provider>
  );
};
