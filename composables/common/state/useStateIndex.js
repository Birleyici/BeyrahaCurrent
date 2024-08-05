import { useProductState } from "~/store/frontend/product";
import { useCartState } from "~/store/frontend/cart";
import { useAttrsAndVarsState } from "~/store/attrsAndVariations";
import { useCategoryState } from "~/store/common/category";
import { useVariationsFrontState } from "~/store/frontend/variations";
import { useAttributeState } from "~/store/common/attributes";
import { useVariationState } from "~/store/common/variations";
import { useOrderState } from "~/store/frontend/order"

export function useStateIndex() {

    return {
        useAttrsAndVarsState,
        useProductState,
        useCategoryState,
        useCartState,
        useVariationsFrontState,
        useAttributeState,
        useVariationState,
        useOrderState
    }
}