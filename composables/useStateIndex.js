import { useNewProductStore } from "~/store/newProduct.js";
import { useAttrsAndVarsState } from "~/store/attrsAndVariations";

export function useStateIndex() { 

    return {
        useNewProductStore,
        useAttrsAndVarsState
    }
}