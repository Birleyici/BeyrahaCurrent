import { useNewProductStore } from "~/store/newProduct.js";
import { useProductState } from "~/store//front/product";
import { useAttrsAndVarsState } from "~/store/attrsAndVariations";

export function useStateIndex() { 

    return {
        useNewProductStore,
        useAttrsAndVarsState,
        useProductState
    }
}